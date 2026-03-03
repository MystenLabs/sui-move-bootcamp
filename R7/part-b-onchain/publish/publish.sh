#!/bin/bash

# Module 7 - Part B: On-Chain Authentication
# Publish script for the robot_tunnel contract
#
# Usage: ./publish.sh
#
# This script:
# 1. Publishes the Move package to the current Sui network
# 2. Generates ../client/.env with network and package configuration

set -euo pipefail

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m'

log_info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error()   { echo -e "${RED}[ERROR]${NC} $1" >&2; }

# Verify we're in the publish directory
if [[ ! -f "../move/Move.toml" ]]; then
    log_error "Please run this script from the publish directory"
    log_error "Usage: cd publish && ./publish.sh"
    exit 1
fi

# Check required dependencies
for dep in sui jq; do
    if ! command -v "$dep" &> /dev/null; then
        log_error "Missing dependency: $dep"
        exit 1
    fi
done

# Get current network from sui client
NETWORK=$(sui client active-env 2>/dev/null || echo "unknown")
if [[ "$NETWORK" == "unknown" ]]; then
    log_error "Could not detect Sui network. Please run: sui client switch --env <network>"
    exit 1
fi
log_info "Current network: $NETWORK"

# Get active address
ACTIVE_ADDRESS=$(sui client active-address 2>/dev/null || echo "")
if [[ -z "$ACTIVE_ADDRESS" ]]; then
    log_error "Could not get active address. Please run: sui client active-address"
    exit 1
fi
log_info "Active address: $ACTIVE_ADDRESS"

# Backup existing .env file if it exists
ENV_FILE="../client/.env"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

if [[ -f "$ENV_FILE" ]]; then
    BACKUP_FILE="../client/.env.backup.${TIMESTAMP}"
    cp "$ENV_FILE" "$BACKUP_FILE"
    log_info "Backed up existing .env to .env.backup.${TIMESTAMP}"
fi

# Publish the Move package
log_info "Publishing Move package..."
PUBLISH_OUTPUT=$(sui client publish --skip-fetch-latest-git-deps --json ../move 2>&1)

# Save output for debugging
echo "$PUBLISH_OUTPUT" > .publish.res.json

# Extract JSON (skip any non-JSON output)
JSON_OUTPUT=$(echo "$PUBLISH_OUTPUT" | sed -n '/^{/,$p')

# Check if publish was successful
STATUS=$(echo "$JSON_OUTPUT" | jq -r '.effects.status.status // empty' 2>/dev/null || echo "")
if [[ "$STATUS" != "success" ]]; then
    log_error "Publish failed!"
    log_error "Check .publish.res.json for details"
    exit 1
fi

# Extract package address
PACKAGE_ID=$(echo "$JSON_OUTPUT" | jq -r '.objectChanges[] | select(.type == "published") | .packageId' 2>/dev/null || echo "")
if [[ -z "$PACKAGE_ID" || "$PACKAGE_ID" == "null" ]]; then
    log_error "Could not extract package address"
    exit 1
fi
log_success "Package published: $PACKAGE_ID"

# Generate .env file
log_info "Generating $ENV_FILE..."

cat > "$ENV_FILE" <<EOF
# ============================================
# SUI NETWORK CONFIGURATION
# ============================================

# Network to connect to (testnet, devnet, mainnet)
SUI_NETWORK=$NETWORK

# Deployed contract package ID (after publishing)
PACKAGE_ID=$PACKAGE_ID

# ============================================
# WALLET KEYS (for blockchain transactions)
# ============================================

# User's Sui wallet private key (for signing transactions)
# Format: suiprivkey1... (bech32 encoded)
USER_PRIVATE_KEY=

# Operator's Sui wallet private key
# Format: suiprivkey1... (bech32 encoded)
OPERATOR_PRIVATE_KEY=

# ============================================
# ED25519 KEYS (for command signing)
# ============================================

# These are SEPARATE from wallet keys!
# They're used to sign off-chain commands.

# User's Ed25519 private key (64 hex chars)
USER_ED25519_PRIVATE_KEY=

# Operator's Ed25519 private key (64 hex chars)
OPERATOR_ED25519_PRIVATE_KEY=

# ============================================
# TUNNEL CONFIGURATION
# ============================================

# Tunnel ID (after creation with: pnpm create-tunnel)
TUNNEL_ID=0x...

# Final balances for closing (in MIST, 1 SUI = 1e9 MIST)
USER_FINAL_BALANCE=100000000
OPERATOR_FINAL_BALANCE=100000000
EOF

log_success "Generated $ENV_FILE"

# Set restrictive permissions
chmod 600 "$ENV_FILE"

# Summary
echo ""
log_success "=== Deployment Complete ==="
echo ""
log_info "Network:    $NETWORK"
log_info "Package ID: $PACKAGE_ID"
echo ""
log_warning "IMPORTANT: Edit ../client/.env and configure the following:"
echo ""
echo "  1. Wallet Keys (for blockchain transactions):"
echo "     - USER_PRIVATE_KEY"
echo "     - OPERATOR_PRIVATE_KEY"
echo ""
echo "  2. Ed25519 Keys (for off-chain command signing):"
echo "     - USER_ED25519_PRIVATE_KEY"
echo "     - OPERATOR_ED25519_PRIVATE_KEY"
echo ""
log_info "Next steps:"
log_info "  1. cd ../client"
log_info "  2. Edit .env with your keys"
log_info "  3. pnpm install"
log_info "  4. pnpm create-tunnel    # Creates a tunnel (sets TUNNEL_ID)"
log_info "  5. pnpm close-tunnel     # Closes the tunnel"
log_info "  6. pnpm demo             # Run the full demo"
echo ""
