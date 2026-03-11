/// # Robot Tunnel: On-Chain Authentication for Robot Control
///
/// This module creates a SECURE COMMUNICATION CHANNEL between a user and a robot.
/// Think of it as a "cryptographic handshake" that lives on the blockchain.
///
/// ## The Big Idea: State Channels for Robots
///
/// Normally, every robot command would need a blockchain transaction:
///   User → Blockchain → Robot (slow! ~5 seconds per command)
///
/// With a tunnel (state channel):
///   1. OPEN tunnel on-chain (one transaction)
///   2. Send unlimited commands off-chain (fast! ~50ms each)
///   3. CLOSE tunnel on-chain (one transaction)
///
/// The blockchain only stores the "agreement" - not every command!
///
/// ## Why This Matters
///
/// 1. SPEED: Real-time control (milliseconds, not seconds)
/// 2. COST: Pay gas only for open/close, not every command
/// 3. SECURITY: Both parties deposit funds as collateral
/// 4. TRUST: Cheaters lose their deposit
///
/// ## How It Works
///
/// ```
/// ┌─────────────────────────────────────────────────────────────────┐
/// │                    TUNNEL LIFECYCLE                             │
/// │                                                                 │
/// │   1. CREATE TUNNEL (on-chain)                                   │
/// │      - User deposits collateral                                 │
/// │      - Operator deposits collateral                             │
/// │      - Both register Ed25519 public keys                        │
/// │      - Tunnel is now ACTIVE                                     │
/// │                                                                 │
/// │   2. USE TUNNEL (off-chain)                                     │
/// │      - Commands signed by user's private key                    │
/// │      - Server verifies signature                                │
/// │      - Robot executes command                                   │
/// │      - No blockchain involved!                                  │
/// │                                                                 │
/// │   3. CLOSE TUNNEL (on-chain)                                    │
/// │      - Both parties sign final state                            │
/// │      - Deposits returned                                        │
/// │      - Tunnel destroyed                                         │
/// │                                                                 │
/// │   OR: DISPUTE (on-chain)                                        │
/// │      - If someone cheats, submit proof                          │
/// │      - Cheater loses deposit                                    │
/// │      - Honest party compensated                                 │
/// └─────────────────────────────────────────────────────────────────┘
/// ```
module robot_tunnel::tunnel;

use sui::balance::Balance;
use sui::coin::{Self, Coin};
use sui::ed25519;
use sui::event;
use sui::sui::SUI;

// ============================================
// ERROR CODES
// ============================================

/// Signature verification failed
const EInvalidSignature: u64 = 0;
/// Deposit amount is invalid
const EInvalidDeposit: u64 = 1;
/// Tunnel is not active
const ENotActive: u64 = 2;
/// Only tunnel participants can call this
const ENotAuthorized: u64 = 3;
/// Public key must be 32 bytes (Ed25519)
const EInvalidPublicKey: u64 = 4;

// ============================================
// DATA STRUCTURES
// ============================================

/// A secure communication tunnel between user and robot operator.
///
/// This is a SHARED OBJECT so both parties can interact with it.
///
/// Think of it like a secure phone line:
/// - Both parties put down a deposit (ensures good behavior)
/// - Both have registered keys (proves identity)
/// - Both can close it cooperatively (get deposits back)
///
/// Note: No `store` ability - tunnels must be shared, not transferred as owned objects.
/// This prevents the scenario where someone transfers a tunnel and later tries to share it.
public struct Tunnel has key {
    id: UID,
    /// User's Sui address (for authorization and refunds)
    user_address: address,
    /// User's security deposit (SUI)
    user_deposit: Balance<SUI>,
    /// User's Ed25519 public key (32 bytes)
    /// This is the key that will sign off-chain commands
    user_public_key: vector<u8>,
    /// Operator's Sui address (for authorization and refunds)
    operator_address: address,
    /// Operator's security deposit (SUI)
    operator_deposit: Balance<SUI>,
    /// Operator's Ed25519 public key (32 bytes)
    operator_public_key: vector<u8>,
    /// Current state sequence number
    /// Increments with each state update (prevents replay attacks)
    sequence_number: u64,
    /// Is the tunnel active?
    is_active: bool,
    /// Penalty amount for misbehavior
    penalty_amount: u64,
}

// ============================================
// EVENTS
// ============================================

/// Emitted when a tunnel is created
public struct TunnelCreated has copy, drop {
    tunnel_id: ID,
    user_address: address,
    operator_address: address,
    user_public_key: vector<u8>,
    operator_public_key: vector<u8>,
    user_deposit: u64,
    operator_deposit: u64,
}

/// Emitted when a tunnel is closed
public struct TunnelClosed has copy, drop {
    tunnel_id: ID,
    final_sequence: u64,
    user_refund: u64,
    operator_refund: u64,
}

// ============================================
// CREATE TUNNEL
// ============================================

/// Create a new secure tunnel for robot control.
///
/// ## Parameters
/// - `user_address`: User's Sui address for authorization and refunds
/// - `operator_address`: Operator's Sui address for authorization and refunds
/// - `user_deposit`: User's SUI collateral
/// - `operator_deposit`: Operator's SUI collateral
/// - `user_public_key`: User's Ed25519 public key (32 bytes)
/// - `operator_public_key`: Operator's Ed25519 public key (32 bytes)
/// - `penalty_amount`: Amount to penalize cheaters
///
/// ## Example Flow
/// ```
/// 1. User wants to control robot
/// 2. User and Operator agree on deposit amounts
/// 3. This function creates the tunnel
/// 4. Now they can communicate off-chain securely!
/// ```
fun create_tunnel_internal(
    user_address: address,
    operator_address: address,
    user_deposit: Coin<SUI>,
    operator_deposit: Coin<SUI>,
    user_public_key: vector<u8>,
    operator_public_key: vector<u8>,
    penalty_amount: u64,
    ctx: &mut TxContext,
): Tunnel {
    // Validate public keys are 32 bytes (Ed25519)
    assert!(user_public_key.length() == 32, EInvalidPublicKey);
    assert!(operator_public_key.length() == 32, EInvalidPublicKey);

    // Convert coins to balances
    let user_balance = coin::into_balance(user_deposit);
    let operator_balance = coin::into_balance(operator_deposit);

    // Validate deposits cover penalty
    assert!(user_balance.value() >= penalty_amount, EInvalidDeposit);
    assert!(operator_balance.value() >= penalty_amount, EInvalidDeposit);

    let tunnel = Tunnel {
        id: object::new(ctx),
        user_address,
        user_deposit: user_balance,
        user_public_key,
        operator_address,
        operator_deposit: operator_balance,
        operator_public_key,
        sequence_number: 0,
        is_active: true,
        penalty_amount,
    };

    // Emit event for indexing
    event::emit(TunnelCreated {
        tunnel_id: object::id(&tunnel),
        user_address: tunnel.user_address,
        operator_address: tunnel.operator_address,
        user_public_key: tunnel.user_public_key,
        operator_public_key: tunnel.operator_public_key,
        user_deposit: tunnel.user_deposit.value(),
        operator_deposit: tunnel.operator_deposit.value(),
    });

    tunnel
}

/// Function to create and share a tunnel.
///
/// Creates a new tunnel and immediately shares it so both parties can interact.
public fun create_and_share_tunnel(
    user_address: address,
    operator_address: address,
    user_deposit: Coin<SUI>,
    operator_deposit: Coin<SUI>,
    user_public_key: vector<u8>,
    operator_public_key: vector<u8>,
    penalty_amount: u64,
    ctx: &mut TxContext,
) {
    let tunnel = create_tunnel_internal(
        user_address,
        operator_address,
        user_deposit,
        operator_deposit,
        user_public_key,
        operator_public_key,
        penalty_amount,
        ctx,
    );
    transfer::share_object(tunnel);
}

// ============================================
// VERIFY SIGNATURE
// ============================================

/// Verify an Ed25519 signature from either party.
///
/// This is the CORE of authentication:
/// - The message is signed with a private key
/// - We verify using the corresponding public key
/// - If valid, we know the message came from the key owner
///
/// ## Parameters
/// - `tunnel`: The tunnel (contains public keys)
/// - `is_user`: true = verify user's sig, false = verify operator's sig
/// - `signature`: 64-byte Ed25519 signature
/// - `message`: The data that was signed
public fun verify_signature(
    tunnel: &Tunnel,
    is_user: bool,
    signature: &vector<u8>,
    message: &vector<u8>,
): bool {
    let public_key = if (is_user) {
        &tunnel.user_public_key
    } else {
        &tunnel.operator_public_key
    };

    ed25519::ed25519_verify(signature, public_key, message)
}

/// Verify and abort if invalid
public fun verify_signature_or_abort(
    tunnel: &Tunnel,
    is_user: bool,
    signature: &vector<u8>,
    message: &vector<u8>,
) {
    assert!(verify_signature(tunnel, is_user, signature, message), EInvalidSignature);
}

// ============================================
// CLOSE TUNNEL (COOPERATIVE)
// ============================================

/// Close the tunnel cooperatively with both parties' agreement.
///
/// This is the HAPPY PATH:
/// - Both parties sign the final state
/// - Deposits are returned according to agreement
/// - Tunnel is destroyed
///
/// ## Parameters
/// - `tunnel`: The tunnel to close
/// - `user_final_balance`: How much user gets back
/// - `operator_final_balance`: How much operator gets back
/// - `user_signature`: User's signature on the settlement
/// - `operator_signature`: Operator's signature on the settlement
///
/// ## The Settlement Message Format
/// ```
/// settlement = tunnel_id || sequence_number || user_balance || operator_balance
/// ```
/// Both parties sign this same message to agree on final state.
public fun close_tunnel_cooperative(
    tunnel: Tunnel,
    user_final_balance: u64,
    operator_final_balance: u64,
    user_signature: vector<u8>,
    operator_signature: vector<u8>,
    ctx: &mut TxContext,
): (Coin<SUI>, Coin<SUI>, address, address) {
    assert!(tunnel.is_active, ENotActive);

    // Build settlement message
    let settlement_msg = build_settlement_message(
        object::id(&tunnel),
        tunnel.sequence_number,
        user_final_balance,
        operator_final_balance,
    );

    // Verify both signatures
    verify_signature_or_abort(&tunnel, true, &user_signature, &settlement_msg);
    verify_signature_or_abort(&tunnel, false, &operator_signature, &settlement_msg);

    // Validate balances match deposits
    let total_deposit = tunnel.user_deposit.value() + tunnel.operator_deposit.value();
    assert!(user_final_balance + operator_final_balance == total_deposit, EInvalidDeposit);

    // Emit close event
    event::emit(TunnelClosed {
        tunnel_id: object::id(&tunnel),
        final_sequence: tunnel.sequence_number,
        user_refund: user_final_balance,
        operator_refund: operator_final_balance,
    });

    // Destroy tunnel and distribute funds
    let Tunnel {
        id,
        user_address,
        mut user_deposit,
        user_public_key: _,
        operator_address,
        operator_deposit,
        operator_public_key: _,
        sequence_number: _,
        is_active: _,
        penalty_amount: _,
    } = tunnel;

    id.delete();

    // Merge deposits and split according to agreement
    user_deposit.join(operator_deposit);

    let user_coin = coin::from_balance(user_deposit.split(user_final_balance), ctx);
    let operator_coin = coin::from_balance(user_deposit, ctx);

    (user_coin, operator_coin, user_address, operator_address)
}

/// Function for cooperative close.
/// Transfers refunds to the user and operator addresses stored in the tunnel.
public fun close_cooperative(
    tunnel: Tunnel,
    user_final_balance: u64,
    operator_final_balance: u64,
    user_signature: vector<u8>,
    operator_signature: vector<u8>,
    ctx: &mut TxContext,
) {
    let (user_coin, operator_coin, user_addr, operator_addr) = close_tunnel_cooperative(
        tunnel,
        user_final_balance,
        operator_final_balance,
        user_signature,
        operator_signature,
        ctx,
    );

    // Transfer coins to respective parties
    transfer::public_transfer(user_coin, user_addr);
    transfer::public_transfer(operator_coin, operator_addr);
}

// ============================================
// DISPUTE RESOLUTION
// ============================================

/// Punish a party for misbehavior.
///
/// This is used when someone cheats or becomes unresponsive.
/// The honest party can claim the penalty amount from the other party.
///
/// ## Authorization
/// - To claim from user: caller must be the operator
/// - To claim from operator: caller must be the user
///
/// ## When to Use
/// - Operator does not execute valid commands
/// - User tries to double-spend
/// - Either party goes offline
///
/// ## Note
/// In a full implementation, this would require proof submission
/// and a challenge period. Simplified here for education.
public fun claim_penalty(
    tunnel: &mut Tunnel,
    is_claiming_from_user: bool,
    ctx: &mut TxContext,
): Coin<SUI> {
    assert!(tunnel.is_active, ENotActive);

    // Verify authorization: only the counterparty can claim penalty
    let sender = ctx.sender();
    if (is_claiming_from_user) {
        // Operator claims from user
        assert!(sender == tunnel.operator_address, ENotAuthorized);
    } else {
        // User claims from operator
        assert!(sender == tunnel.user_address, ENotAuthorized);
    };

    // Extract penalty from the offending party
    let penalty = if (is_claiming_from_user) {
        tunnel.user_deposit.split(tunnel.penalty_amount)
    } else {
        tunnel.operator_deposit.split(tunnel.penalty_amount)
    };

    tunnel.is_active = false;

    coin::from_balance(penalty, ctx)
}

/// Withdraw remaining deposit after a dispute has been resolved.
///
/// After `claim_penalty` deactivates the tunnel, this function allows
/// each participant to withdraw their remaining deposit balance.
///
/// ## Authorization
/// - User can withdraw user_deposit remainder
/// - Operator can withdraw operator_deposit remainder
///
/// Returns `none` if the caller's deposit is already empty.
public fun withdraw_after_dispute(tunnel: &mut Tunnel, ctx: &mut TxContext): Option<Coin<SUI>> {
    // Only callable on deactivated tunnels (after claim_penalty)
    assert!(!tunnel.is_active, ENotActive);

    let sender = ctx.sender();
    assert!(sender == tunnel.user_address || sender == tunnel.operator_address, ENotAuthorized);

    let balance = if (sender == tunnel.user_address) {
        &mut tunnel.user_deposit
    } else {
        &mut tunnel.operator_deposit
    };

    if (balance.value() == 0) {
        option::none()
    } else {
        let remaining = balance.withdraw_all();
        option::some(coin::from_balance(remaining, ctx))
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/// Build the settlement message that both parties sign
fun build_settlement_message(
    tunnel_id: ID,
    sequence: u64,
    user_balance: u64,
    operator_balance: u64,
): vector<u8> {
    let mut msg = vector::empty<u8>();

    // Add tunnel ID (32 bytes)
    let id_bytes = object::id_to_bytes(&tunnel_id);
    vector::append(&mut msg, id_bytes);

    // Add sequence number (8 bytes, big-endian)
    append_u64(&mut msg, sequence);

    // Add balances (8 bytes each)
    append_u64(&mut msg, user_balance);
    append_u64(&mut msg, operator_balance);

    msg
}

/// Append u64 as big-endian bytes
fun append_u64(data: &mut vector<u8>, value: u64) {
    let mut i = 8;
    while (i > 0) {
        i = i - 1;
        let byte = ((value >> (i * 8)) & 0xFF as u8);
        vector::push_back(data, byte);
    };
}

// ============================================
// STATE UPDATE FUNCTIONS
// ============================================

/// Increment the sequence number.
///
/// This is called when both parties agree on a new off-chain state.
/// The sequence number prevents replay attacks by ensuring each
/// state update is unique.
///
/// ## Authorization
/// Only the user or operator can update the sequence number.
public fun increment_sequence(tunnel: &mut Tunnel, ctx: &TxContext) {
    assert!(tunnel.is_active, ENotActive);

    // Verify caller is a tunnel participant
    let sender = ctx.sender();
    assert!(sender == tunnel.user_address || sender == tunnel.operator_address, ENotAuthorized);

    tunnel.sequence_number = tunnel.sequence_number + 1;
}

// ============================================
// VIEW FUNCTIONS
// ============================================

/// Get tunnel ID
public fun id(tunnel: &Tunnel): ID {
    object::id(tunnel)
}

/// Check if tunnel is active
public fun is_active(tunnel: &Tunnel): bool {
    tunnel.is_active
}

/// Get current sequence number
public fun sequence_number(tunnel: &Tunnel): u64 {
    tunnel.sequence_number
}

/// Get user's public key
public fun user_public_key(tunnel: &Tunnel): vector<u8> {
    tunnel.user_public_key
}

/// Get operator's public key
public fun operator_public_key(tunnel: &Tunnel): vector<u8> {
    tunnel.operator_public_key
}

/// Get deposit amounts
public fun get_deposits(tunnel: &Tunnel): (u64, u64) {
    (tunnel.user_deposit.value(), tunnel.operator_deposit.value())
}

/// Get user's address
public fun user_address(tunnel: &Tunnel): address {
    tunnel.user_address
}

/// Get operator's address
public fun operator_address(tunnel: &Tunnel): address {
    tunnel.operator_address
}

/// Get penalty amount
public fun penalty_amount(tunnel: &Tunnel): u64 {
    tunnel.penalty_amount
}
