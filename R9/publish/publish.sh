#!/bin/bash

# Module 9 - Multiplayer Robot Queue
# Publish script for the multiplayer queue contract
#
# Usage: ./publish.sh [queue_name]
#
# This script:
# 1. Publishes the Move package to the current Sui network
# 2. Extracts PACKAGE_ADDRESS
# 3. Creates a MultiplayerQueue and extracts QUEUE_ID
# 4. Generates .env files for client, server, and dapp

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

# Queue name (default or from argument)
QUEUE_NAME="${1:-My Robot Queue}"

# Verify we're in the publish directory
if [[ ! -f "../move/Move.toml" ]]; then
    log_error "Please run this script from the publish directory"
    log_error "Usage: cd publish && ./publish.sh [queue_name]"
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

# Get admin address
ADMIN_ADDRESS=$(sui client active-address 2>/dev/null || echo "")
if [[ -z "$ADMIN_ADDRESS" ]]; then
    log_error "Could not get active address. Please run: sui client active-address"
    exit 1
fi
log_info "Admin address: $ADMIN_ADDRESS"

# Backup existing .env files if they exist
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

backup_env() {
    local file=$1
    if [[ -f "$file" ]]; then
        cp "$file" "${file}.backup.${TIMESTAMP}"
        log_info "Backed up existing $(basename $file) to $(basename $file).backup.${TIMESTAMP}"
    fi
}

backup_env "../client/.env"
backup_env "../server/.env"
backup_env "../dapp/.env"

# Publish the Move package
log_info "Publishing Move package..."
PUBLISH_OUTPUT=$(sui client publish --gas-budget 100000000 --json ../move 2>&1) || true

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
PACKAGE_ADDRESS=$(echo "$JSON_OUTPUT" | jq -r '.objectChanges[] | select(.type == "published") | .packageId' 2>/dev/null || echo "")
if [[ -z "$PACKAGE_ADDRESS" || "$PACKAGE_ADDRESS" == "null" ]]; then
    log_error "Could not extract package address"
    exit 1
fi
log_success "Package published: $PACKAGE_ADDRESS"

# Create a MultiplayerQueue
log_info "Creating MultiplayerQueue '$QUEUE_NAME'..."
QUEUE_OUTPUT=$(sui client call \
    --package "$PACKAGE_ADDRESS" \
    --module multiplayer_queue \
    --function create_queue \
    --args "\"$QUEUE_NAME\"" \
    --gas-budget 10000000 \
    --json 2>&1) || true

# Save queue creation output for debugging
echo "$QUEUE_OUTPUT" > .create_queue.res.json

# Extract JSON from queue creation output
QUEUE_JSON=$(echo "$QUEUE_OUTPUT" | sed -n '/^{/,$p')

# Check if queue creation was successful
QUEUE_STATUS=$(echo "$QUEUE_JSON" | jq -r '.effects.status.status // empty' 2>/dev/null || echo "")
if [[ "$QUEUE_STATUS" != "success" ]]; then
    log_error "Queue creation failed!"
    log_error "Check .create_queue.res.json for details"
    exit 1
fi

# Extract MultiplayerQueue ID (shared object)
QUEUE_ID=$(echo "$QUEUE_JSON" | jq -r '.objectChanges[] | select(.type == "created" and .objectType != null and (.objectType | contains("MultiplayerQueue"))) | .objectId' 2>/dev/null || echo "")
if [[ -z "$QUEUE_ID" || "$QUEUE_ID" == "null" ]]; then
    log_error "Could not extract MultiplayerQueue ID"
    exit 1
fi
log_success "MultiplayerQueue created: $QUEUE_ID"

# Generate client/.env file
log_info "Generating ../client/.env..."
cat > "../client/.env" <<EOF
# Network: testnet, devnet, or mainnet
NETWORK=$NETWORK

# Package address (from sui client publish)
PACKAGE_ADDRESS=$PACKAGE_ADDRESS

# Queue ID (shared object)
QUEUE_ID=$QUEUE_ID

# Your wallet's mnemonic phrase (12 or 24 words)
# WARNING: Never commit this file with real credentials!
USER_PHRASE="word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"

# Or use private key instead:
# USER_PRIVATE_KEY=suiprivkey1...

# Optional: Custom RPC URL
# SUI_RPC_URL=https://fullnode.testnet.sui.io
EOF
chmod 600 "../client/.env"
log_success "Generated ../client/.env"

# Generate server/.env file
log_info "Generating ../server/.env..."
cat > "../server/.env" <<EOF
# Network: testnet, devnet, or mainnet
NETWORK=$NETWORK

# Package address (from sui client publish)
PACKAGE_ADDRESS=$PACKAGE_ADDRESS

# Queue ID (shared object)
QUEUE_ID=$QUEUE_ID

# WebSocket server configuration
WEBSOCKET_PORT=8080
POLL_INTERVAL_MS=2000

# Optional: Custom GraphQL URL
# SUI_GRAPHQL_URL=https://graphql.testnet.sui.io/graphql
EOF
chmod 600 "../server/.env"
log_success "Generated ../server/.env"

# Generate dapp/.env file
log_info "Generating ../dapp/.env..."
cat > "../dapp/.env" <<EOF
# Package address (from sui client publish)
VITE_PACKAGE_ID=$PACKAGE_ADDRESS

# Queue ID (shared object)
VITE_QUEUE_ID=$QUEUE_ID
EOF
chmod 600 "../dapp/.env"
log_success "Generated ../dapp/.env"

# Summary
echo ""
log_success "=== Deployment Complete ==="
echo ""
log_info "Network:           $NETWORK"
log_info "Admin:             $ADMIN_ADDRESS"
log_info "Package Address:   $PACKAGE_ADDRESS"
log_info "Queue ID:          $QUEUE_ID"
log_info "Queue Name:        $QUEUE_NAME"
echo ""
log_warning "IMPORTANT: Edit ../client/.env and add your USER_PHRASE or USER_PRIVATE_KEY"
echo ""
log_info "Next steps:"
log_info "  Option A - Run the dApp (recommended):"
log_info "    1. cd ../dapp"
log_info "    2. pnpm install && pnpm dev"
log_info "    3. Open http://localhost:5173 and connect your wallet"
echo ""
log_info "  Option B - Use the CLI client:"
log_info "    1. cd ../client"
log_info "    2. Edit .env and add your USER_PHRASE"
log_info "    3. pnpm install"
log_info "    4. pnpm queue-action wave    # Queue an action"
log_info "    5. pnpm check-status         # View queue status"
echo ""
log_info "  Start the WebSocket server for real-time updates:"
log_info "    1. cd ../server"
log_info "    2. pnpm install && pnpm dev"
echo ""
