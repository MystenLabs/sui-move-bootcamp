#!/bin/bash

# R10 - Full Platform (Robot Rental Platform)
# Publish script for the robot rental platform contracts
#
# Usage: ./publish.sh [robot_name]
#
# This script:
# 1. Publishes the Move package to the current Sui network
# 2. Extracts PACKAGE_ADDRESS and FAUCET_ID (from init())
# 3. Creates a RobotRegistry and extracts REGISTRY_ID
# 4. Creates a RobotPet and extracts ROBOT_PET_ID
# 5. Generates Ed25519 operator keypair and registers robot in registry
# 6. Generates .env files for client, server, and dapp

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

# Robot pet name (default or from argument)
ROBOT_NAME="${1:-Bittle-1}"

# Verify we're in the publish directory
if [[ ! -f "../move/Move.toml" ]]; then
    log_error "Please run this script from the publish directory"
    log_error "Usage: cd publish && ./publish.sh [robot_name]"
    exit 1
fi

# Check required dependencies
for dep in sui jq; do
    if ! command -v "$dep" &> /dev/null; then
        log_error "Missing dependency: $dep"
        exit 1
    fi
done

# Verify Move.toml has [environments] (required by Sui CLI v1.64+)
if ! grep -q '^\[environments\]' ../move/Move.toml 2>/dev/null; then
    log_error "Move.toml is missing [environments] section (required by Sui CLI v1.64+)"
    log_error "Add the following to ../move/Move.toml:"
    log_error "  [environments]"
    log_error "  devnet = \"01accae1\""
    exit 1
fi

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

# Clean previous build artifacts for a fresh deploy
for artifact in "../move/Move.lock" "../move/Published.toml"; do
    if [[ -f "$artifact" ]]; then
        rm "$artifact"
        log_info "Removed stale $(basename $artifact)"
    fi
done
if [[ -d "../move/build" ]]; then
    rm -rf "../move/build"
    log_info "Removed stale build/ directory"
fi

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

# Extract Faucet ID (created by treat::init during publish)
FAUCET_ID=$(echo "$JSON_OUTPUT" | jq -r '.objectChanges[] | select(.type == "created" and .objectType != null and (.objectType | contains("Faucet"))) | .objectId' 2>/dev/null || echo "")
if [[ -z "$FAUCET_ID" || "$FAUCET_ID" == "null" ]]; then
    log_warning "Could not extract Faucet ID from publish output"
    FAUCET_ID=""
else
    log_success "Faucet created: $FAUCET_ID"
fi

# Create a RobotRegistry
log_info "Creating RobotRegistry..."
REGISTRY_OUTPUT=$(sui client call \
    --package "$PACKAGE_ADDRESS" \
    --module robot_registry \
    --function create_registry \
    --gas-budget 10000000 \
    --json 2>&1) || true

# Save registry creation output for debugging
echo "$REGISTRY_OUTPUT" > .create_registry.res.json

# Extract JSON from registry creation output
REGISTRY_JSON=$(echo "$REGISTRY_OUTPUT" | sed -n '/^{/,$p')

# Check if registry creation was successful
REGISTRY_STATUS=$(echo "$REGISTRY_JSON" | jq -r '.effects.status.status // empty' 2>/dev/null || echo "")
if [[ "$REGISTRY_STATUS" != "success" ]]; then
    log_error "Registry creation failed!"
    log_error "Check .create_registry.res.json for details"
    exit 1
fi

# Extract RobotRegistry ID (shared object)
REGISTRY_ID=$(echo "$REGISTRY_JSON" | jq -r '.objectChanges[] | select(.type == "created" and .objectType != null and (.objectType | contains("RobotRegistry"))) | .objectId' 2>/dev/null || echo "")
if [[ -z "$REGISTRY_ID" || "$REGISTRY_ID" == "null" ]]; then
    log_error "Could not extract RobotRegistry ID"
    exit 1
fi
log_success "RobotRegistry created: $REGISTRY_ID"

# Create a RobotPet
log_info "Creating RobotPet '$ROBOT_NAME'..."
ROBOT_OUTPUT=$(sui client call \
    --package "$PACKAGE_ADDRESS" \
    --module robot_pet \
    --function create_robot \
    --args "\"$ROBOT_NAME\"" \
    --gas-budget 10000000 \
    --json 2>&1) || true

# Save robot creation output for debugging
echo "$ROBOT_OUTPUT" > .create_robot.res.json

# Extract JSON from robot creation output
ROBOT_JSON=$(echo "$ROBOT_OUTPUT" | sed -n '/^{/,$p')

# Check if robot creation was successful
ROBOT_STATUS=$(echo "$ROBOT_JSON" | jq -r '.effects.status.status // empty' 2>/dev/null || echo "")
if [[ "$ROBOT_STATUS" != "success" ]]; then
    log_error "RobotPet creation failed!"
    log_error "Check .create_robot.res.json for details"
    exit 1
fi

# Extract RobotPet ID (shared object)
ROBOT_PET_ID=$(echo "$ROBOT_JSON" | jq -r '.objectChanges[] | select(.type == "created" and .objectType != null and (.objectType | contains("RobotPet"))) | .objectId' 2>/dev/null || echo "")
if [[ -z "$ROBOT_PET_ID" || "$ROBOT_PET_ID" == "null" ]]; then
    log_error "Could not extract RobotPet ID"
    exit 1
fi
log_success "RobotPet created: $ROBOT_PET_ID"

# Generate Ed25519 operator keypair for robot registration
log_info "Generating Ed25519 operator keypair..."
KEYPAIR_JSON=$(node -e "
const { webcrypto } = require('crypto');
(async () => {
  const kp = await webcrypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']);
  const pub = new Uint8Array(await webcrypto.subtle.exportKey('raw', kp.publicKey));
  const pkcs8 = new Uint8Array(await webcrypto.subtle.exportKey('pkcs8', kp.privateKey));
  const priv = pkcs8.slice(-32);
  const toHex = b => [...b].map(x => x.toString(16).padStart(2,'0')).join('');
  const cliArray = '[' + [...pub].join(',') + ']';
  console.log(JSON.stringify({pub: toHex(pub), priv: toHex(priv), cliArray}));
})().catch(e => { console.error(e); process.exit(1); });
")

OPERATOR_PUB_KEY_HEX=$(echo "$KEYPAIR_JSON" | jq -r '.pub')
OPERATOR_PRIV_KEY_HEX=$(echo "$KEYPAIR_JSON" | jq -r '.priv')
OPERATOR_PUB_KEY_ARRAY=$(echo "$KEYPAIR_JSON" | jq -r '.cliArray')

if [[ -z "$OPERATOR_PUB_KEY_HEX" || "$OPERATOR_PUB_KEY_HEX" == "null" ]]; then
    log_error "Failed to generate Ed25519 keypair"
    exit 1
fi
log_success "Operator keypair generated"

# Register the robot in the registry
log_info "Registering robot '$ROBOT_NAME' in registry..."
REGISTER_OUTPUT=$(sui client call \
    --package "$PACKAGE_ADDRESS" \
    --module robot_registry \
    --function register_robot \
    --args \
        "$REGISTRY_ID" \
        "\"$ROBOT_NAME\"" \
        "\"A friendly robot dog\"" \
        "\"Petoi Bittle X\"" \
        "$OPERATOR_PUB_KEY_ARRAY" \
        "2" \
        "0x6" \
    --gas-budget 10000000 \
    --json 2>&1) || true

# Save registration output for debugging
echo "$REGISTER_OUTPUT" > .register_robot.res.json

# Extract JSON from registration output
REGISTER_JSON=$(echo "$REGISTER_OUTPUT" | sed -n '/^{/,$p')

# Check if registration was successful
REGISTER_STATUS=$(echo "$REGISTER_JSON" | jq -r '.effects.status.status // empty' 2>/dev/null || echo "")
if [[ "$REGISTER_STATUS" != "success" ]]; then
    log_error "Robot registration failed!"
    log_error "Check .register_robot.res.json for details"
    exit 1
fi
log_success "Robot '$ROBOT_NAME' registered in registry"

# Generate client/.env file
log_info "Generating ../client/.env..."
mkdir -p "../client"
cat > "../client/.env" <<EOF
# Network: testnet, devnet, or mainnet
NETWORK=$NETWORK

# Package address (from sui client publish)
PACKAGE_ADDRESS=$PACKAGE_ADDRESS

# Faucet ID (shared object - created during publish)
FAUCET_ID=$FAUCET_ID

# Robot Pet ID (shared object)
ROBOT_PET_ID=$ROBOT_PET_ID

# Robot Registry ID (shared object)
REGISTRY_ID=$REGISTRY_ID

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
mkdir -p "../server"
cat > "../server/.env" <<EOF
# Robot Rental WebSocket Server Configuration
# ============================================

# Network: testnet, devnet, or mainnet
NETWORK=$NETWORK

# Package address (from sui client publish)
PACKAGE_ADDRESS=$PACKAGE_ADDRESS

# Faucet ID (shared object)
FAUCET_ID=$FAUCET_ID

# Robot Pet ID (shared object)
ROBOT_PET_ID=$ROBOT_PET_ID

# Robot Registry ID (shared object)
REGISTRY_ID=$REGISTRY_ID

# ============================================
# SERVER CONFIGURATION
# ============================================

# WebSocket server port
WEBSOCKET_PORT=8080

# Client ping interval (milliseconds)
PING_INTERVAL_MS=30000

# Session check interval (milliseconds)
SESSION_CHECK_INTERVAL_MS=60000

# Client timeout (milliseconds)
CLIENT_TIMEOUT_MS=120000

# ============================================
# ROBOT CONNECTION
# ============================================

# Set to true to run without physical robot (for testing)
SIMULATE_ROBOT=true

# Serial port for physical robot
# SERIAL_PORT=/dev/cu.usbmodem14101
# SERIAL_BAUD_RATE=115200

# ============================================
# OPERATOR KEYS (generated by publish.sh)
# ============================================

# Ed25519 keypair for signing robot commands
OPERATOR_COMMAND_PUBLIC_KEY=$OPERATOR_PUB_KEY_HEX
OPERATOR_COMMAND_PRIVATE_KEY=$OPERATOR_PRIV_KEY_HEX

# ============================================
# DEBUGGING
# ============================================

DEBUG=true

# Optional: Custom RPC URL
# SUI_RPC_URL=https://fullnode.testnet.sui.io
EOF
chmod 600 "../server/.env"
log_success "Generated ../server/.env"

# Generate dapp/.env file
log_info "Generating ../dapp/.env..."
mkdir -p "../dapp"
cat > "../dapp/.env" <<EOF
# Package address (from sui client publish)
VITE_PACKAGE_ID=$PACKAGE_ADDRESS

# Faucet ID (shared object - created during publish)
VITE_FAUCET_ID=$FAUCET_ID

# Robot Pet ID (shared object)
VITE_ROBOT_PET_ID=$ROBOT_PET_ID

# Robot Registry ID (shared object)
VITE_REGISTRY_ID=$REGISTRY_ID

# WebSocket server URL for real-time robot control
VITE_WS_URL=ws://localhost:8080
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
log_info "Faucet ID:         $FAUCET_ID"
log_info "Registry ID:       $REGISTRY_ID"
log_info "Robot Pet ID:      $ROBOT_PET_ID"
log_info "Robot Name:        $ROBOT_NAME (registered in registry)"
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
log_info "    4. pnpm request-treats      # Get TREAT tokens from faucet"
log_info "    5. pnpm feed-robot wave     # Queue a robot action"
echo ""
log_info "  Start the WebSocket server for Mode 2 (rental):"
log_info "    1. cd ../server"
log_info "    2. pnpm install && pnpm start"
echo ""
