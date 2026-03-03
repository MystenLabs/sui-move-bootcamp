#!/bin/bash

# Module 2 - Blockchain Fundamentals
# Simplified publish script for educational purposes
#
# Usage: ./publish.sh
#
# This script:
# 1. Publishes the Move package to the current Sui network
# 2. Generates ../client/.env with NETWORK and PACKAGE_ADDRESS

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

# Generate .env file
log_info "Generating $ENV_FILE..."

cat > "$ENV_FILE" <<EOF
# Network Configuration
# Options: devnet, testnet, mainnet
NETWORK=$NETWORK

# Your wallet's secret recovery phrase (12 or 24 words)
# WARNING: Never commit this file with real credentials!
ADMIN_PHRASE="your twelve word recovery phrase goes here"

# After deploying the contract, add the package address here
PACKAGE_ADDRESS=$PACKAGE_ADDRESS

# After creating a queue, add the queue object ID here
QUEUE_ID=0x...
EOF

log_success "Generated $ENV_FILE"

# Set restrictive permissions
chmod 600 "$ENV_FILE"

# Summary
echo ""
log_success "=== Deployment Complete ==="
echo ""
log_info "Network:         $NETWORK"
log_info "Admin:           $ADMIN_ADDRESS"
log_info "Package Address: $PACKAGE_ADDRESS"
echo ""
log_warning "IMPORTANT: Edit ../client/.env and add your ADMIN_PHRASE"
echo ""
log_info "Next steps:"
log_info "  1. cd ../client"
log_info "  2. Edit .env and add your ADMIN_PHRASE"
log_info "  3. pnpm install"
log_info "  4. pnpm create-queue    # This will set the QUEUE_ID"
log_info "  5. pnpm add-action sit"
