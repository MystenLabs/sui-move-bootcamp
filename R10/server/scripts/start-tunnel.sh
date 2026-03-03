#!/bin/bash
#
# Start Cloudflare Tunnel
#
# Creates a secure public URL for the local WebSocket server.
# No Cloudflare account required (uses quick tunnel mode).
#
# Usage: ./start-tunnel.sh [port]
#
# The generated URL will look like:
#   https://something-random-words.trycloudflare.com
#
# Clients can then connect via WebSocket:
#   wss://something-random-words.trycloudflare.com
#

set -e

# Default port
PORT=${1:-8080}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
  echo -e "${RED}Error: cloudflared is not installed${NC}"
  echo "Run: ./install-cloudflared.sh"
  exit 1
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Starting Cloudflare Tunnel${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Local server: ${GREEN}http://localhost:${PORT}${NC}"
echo ""
echo -e "${YELLOW}  Generating public URL...${NC}"
echo ""

# Start tunnel
# The --url flag creates a "quick tunnel" that:
# - Requires no authentication
# - Generates a random public URL
# - Automatically handles HTTPS/WSS
cloudflared tunnel --url http://localhost:$PORT

# Note: cloudflared will print the public URL to stderr
# Example: https://cavity-bright-apache-visiting.trycloudflare.com
