/// Time-lock Seal access policy: data can only be decrypted after a given timestamp.
/// The identity `id` encodes a u64 timestamp (ms) via BCS.
module seal_demo::timelock_seal;

use sui::bcs;
use sui::clock::Clock;

const ENoAccess: u64 = 0;

/// Key servers call this via dry-run.
/// `id` = bcs::to_bytes(&unlock_timestamp_ms)
entry fun seal_approve(id: vector<u8>, c: &Clock) {
    let mut prepared = bcs::new(id);
    let unlock_time = prepared.peel_u64();
    let leftover = prepared.into_remainder_bytes();
    assert!(leftover.length() == 0 && c.timestamp_ms() >= unlock_time, ENoAccess);
}
