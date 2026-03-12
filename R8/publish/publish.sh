#!/bin/bash

# Module 8 - Tokenomics
# Publish script for COOKIE token, faucet, and robot pet contracts
#
# Usage: ./publish.sh
#
# This script:
# 1. Publishes the Move package to the current Sui network
# 2. Extracts PACKAGE_ADDRESS, MINT_CAP_ID, FAUCET_MANAGER_ID
# 3. Creates a RobotPet and extracts ROBOT_ID
# 4. Generates ../client/.env with all values

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

# Get admin address
ADMIN_ADDRESS=$(sui client active-address 2>/dev/null || echo "")
if [[ -z "$ADMIN_ADDRESS" ]]; then
    log_error "Could not get active address. Please run: sui client active-address"
    exit 1
fi
log_info "Admin address: $ADMIN_ADDRESS"

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
PACKAGE_ADDRESS=$(echo "$JSON_OUTPUT" | jq -r '.objectChanges[] | select(.type == "published") | .packageId' 2>/dev/null || echo "")
if [[ -z "$PACKAGE_ADDRESS" || "$PACKAGE_ADDRESS" == "null" ]]; then
    log_error "Could not extract package address"
    exit 1
fi
log_success "Package published: $PACKAGE_ADDRESS"

# Extract MintCap ID (shared object from cookie::init)
MINT_CAP_ID=$(echo "$JSON_OUTPUT" | jq -r '.objectChanges[] | select(.type == "created" and .objectType != null and (.objectType | contains("MintCap"))) | .objectId' 2>/dev/null || echo "")
if [[ -z "$MINT_CAP_ID" || "$MINT_CAP_ID" == "null" ]]; then
    log_error "Could not extract MintCap ID"
    exit 1
fi
log_success "MintCap created: $MINT_CAP_ID"

# Extract FaucetManager ID (shared object from faucet::init)
FAUCET_MANAGER_ID=$(echo "$JSON_OUTPUT" | jq -r '.objectChanges[] | select(.type == "created" and .objectType != null and (.objectType | contains("FaucetManager"))) | .objectId' 2>/dev/null || echo "")
if [[ -z "$FAUCET_MANAGER_ID" || "$FAUCET_MANAGER_ID" == "null" ]]; then
    log_error "Could not extract FaucetManager ID"
    exit 1
fi
log_success "FaucetManager created: $FAUCET_MANAGER_ID"

# Create a RobotPet
log_info "Creating RobotPet..."
ROBOT_OUTPUT=$(sui client call \
    --package "$PACKAGE_ADDRESS" \
    --module robot_pet \
    --function create_robot \
    --args '"Cookie Monster"' \
    --gas-budget 10000000 \
    --json 2>&1)

# Save robot creation output for debugging
echo "$ROBOT_OUTPUT" > .create_robot.res.json

# Extract JSON from robot creation output
ROBOT_JSON=$(echo "$ROBOT_OUTPUT" | sed -n '/^{/,$p')

# Check if robot creation was successful
ROBOT_STATUS=$(echo "$ROBOT_JSON" | jq -r '.effects.status.status // empty' 2>/dev/null || echo "")
if [[ "$ROBOT_STATUS" != "success" ]]; then
    log_error "Robot creation failed!"
    log_error "Check .create_robot.res.json for details"
    exit 1
fi

# Extract RobotPet ID
ROBOT_ID=$(echo "$ROBOT_JSON" | jq -r '.objectChanges[] | select(.type == "created" and .objectType != null and (.objectType | contains("RobotPet"))) | .objectId' 2>/dev/null || echo "")
if [[ -z "$ROBOT_ID" || "$ROBOT_ID" == "null" ]]; then
    log_error "Could not extract RobotPet ID"
    exit 1
fi
log_success "RobotPet created: $ROBOT_ID"

# Generate .env file
log_info "Generating $ENV_FILE..."

cat > "$ENV_FILE" <<EOF
# Network: testnet, devnet, or mainnet
NETWORK=$NETWORK

# Package address (from sui client publish)
PACKAGE_ADDRESS=$PACKAGE_ADDRESS

# Shared object IDs (from publish output)
MINT_CAP_ID=$MINT_CAP_ID
FAUCET_MANAGER_ID=$FAUCET_MANAGER_ID
ROBOT_ID=$ROBOT_ID

# Your wallet's mnemonic phrase (12 or 24 words)
# WARNING: Never commit this file with real credentials!
USER_PHRASE="word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"

# Or use private key instead:
# USER_PRIVATE_KEY=suiprivkey1...
EOF

log_success "Generated $ENV_FILE"

# Set restrictive permissions
chmod 600 "$ENV_FILE"

# Summary
echo ""
log_success "=== Deployment Complete ==="
echo ""
log_info "Network:           $NETWORK"
log_info "Admin:             $ADMIN_ADDRESS"
log_info "Package Address:   $PACKAGE_ADDRESS"
log_info "MintCap ID:        $MINT_CAP_ID"
log_info "FaucetManager ID:  $FAUCET_MANAGER_ID"
log_info "RobotPet ID:       $ROBOT_ID"
echo ""
log_warning "IMPORTANT: Edit ../client/.env and add your USER_PHRASE or USER_PRIVATE_KEY"
echo ""
log_info "Next steps:"
log_info "  1. cd ../client"
log_info "  2. Edit .env and add your USER_PHRASE"
log_info "  3. pnpm install"
log_info "  4. pnpm request-cookies    # Get COOKIE tokens from faucet"
log_info "  5. pnpm feed-robot wave    # Queue an action"
log_info "  6. pnpm read-queue         # View pending actions"
