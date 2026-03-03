#!/bin/bash
# ============================================
# Start Cloudflare Tunnel
# ============================================
# This script creates a tunnel to your local server
# No account required! (Quick Tunnel mode)

set -e

# Default port (same as Module 5)
PORT=${1:-8080}

echo "=========================================="
echo "CLOUDFLARE TUNNEL"
echo "=========================================="
echo
echo "Exposing localhost:$PORT to the internet..."
echo
echo "IMPORTANT: Copy the URL that appears below!"
echo "It will look like: https://xxxx-xxxx-xxxx.trycloudflare.com"
echo
echo "Share this URL with anyone to control your robot!"
echo
echo "Press Ctrl+C to stop the tunnel"
echo "=========================================="
echo

# Start the tunnel
# --url: The local server to expose
# Quick Tunnel: No account needed, generates random URL
cloudflared tunnel --url http://localhost:$PORT
