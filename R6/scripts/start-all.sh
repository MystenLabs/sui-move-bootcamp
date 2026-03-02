#!/bin/bash
# ============================================
# Start Everything (Server + Tunnel)
# ============================================
# This script starts the robot server AND the tunnel
# in a single command for convenience

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MODULE_DIR="$(dirname "$SCRIPT_DIR")"
SERVER_DIR="$MODULE_DIR/../Module5\ -\ WebSocket\ +\ Serial/server"

PORT=${1:-8080}

echo "=========================================="
echo "ROBOT CONTROL: SERVER + TUNNEL"
echo "=========================================="
echo

# Check if Module5 server exists
if [ ! -d "$SERVER_DIR" ]; then
    echo "Error: Module5 server not found at $SERVER_DIR"
    echo "Please complete Module 5 first!"
    exit 1
fi

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "Error: cloudflared not installed"
    echo "Run: ./install-cloudflared.sh"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo
    echo "Shutting down..."
    kill $SERVER_PID 2>/dev/null || true
    kill $TUNNEL_PID 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM

echo "Step 1: Starting robot server on port $PORT..."
echo

# Start the server in background
cd "$SERVER_DIR"
PORT=$PORT pnpm start &
SERVER_PID=$!

# Wait for server to start
sleep 3

echo
echo "Step 2: Starting Cloudflare tunnel..."
echo

# Start tunnel in background, capture output
cloudflared tunnel --url http://localhost:$PORT 2>&1 &
TUNNEL_PID=$!

echo
echo "=========================================="
echo "Both services running!"
echo "=========================================="
echo
echo "Local:    http://localhost:$PORT"
echo "Tunnel:   (see cloudflared output above)"
echo
echo "Press Ctrl+C to stop everything"
echo

# Wait for either process to exit
wait
