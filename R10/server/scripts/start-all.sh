#!/bin/bash
#
# Start Server + Tunnel
#
# Convenience script that starts both the WebSocket server
# and a Cloudflare tunnel in one command.
#
# Usage: ./start-all.sh [port]
#
# This script:
# 1. Starts the WebSocket server
# 2. Waits for it to be ready
# 3. Starts a Cloudflare tunnel
# 4. Handles cleanup on exit
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

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SERVER_DIR="$(dirname "$SCRIPT_DIR")"

# PIDs for cleanup
SERVER_PID=""
TUNNEL_PID=""

# Cleanup function
cleanup() {
  echo ""
  echo -e "${YELLOW}Shutting down...${NC}"

  if [ -n "$TUNNEL_PID" ]; then
    kill $TUNNEL_PID 2>/dev/null || true
  fi

  if [ -n "$SERVER_PID" ]; then
    kill $SERVER_PID 2>/dev/null || true
  fi

  echo -e "${GREEN}Done${NC}"
  exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Check dependencies
if ! command -v cloudflared &> /dev/null; then
  echo -e "${RED}Error: cloudflared is not installed${NC}"
  echo "Run: ./install-cloudflared.sh"
  exit 1
fi

if ! command -v node &> /dev/null; then
  echo -e "${RED}Error: Node.js is not installed${NC}"
  exit 1
fi

# Check if server is built
if [ ! -f "$SERVER_DIR/dist/server.js" ]; then
  echo -e "${YELLOW}Building server...${NC}"
  cd "$SERVER_DIR"
  pnpm install
  pnpm build
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Robot Rental Server + Tunnel${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Start server
echo -e "${GREEN}Starting WebSocket server on port $PORT...${NC}"
cd "$SERVER_DIR"
WEBSOCKET_PORT=$PORT node dist/server.js &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
sleep 3

# Check server is running
if ! kill -0 $SERVER_PID 2>/dev/null; then
  echo -e "${RED}Server failed to start${NC}"
  exit 1
fi

echo -e "${GREEN}Server started (PID: $SERVER_PID)${NC}"
echo ""

# Start tunnel
echo -e "${GREEN}Starting Cloudflare tunnel...${NC}"
echo ""
cloudflared tunnel --url http://localhost:$PORT &
TUNNEL_PID=$!

# Wait for tunnel (it will print the URL)
wait $TUNNEL_PID
