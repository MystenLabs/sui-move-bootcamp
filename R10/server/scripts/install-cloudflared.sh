#!/bin/bash
#
# Install Cloudflared Tunnel Client
#
# This script installs cloudflared for your platform.
# Cloudflared creates secure tunnels to expose local services to the internet.
#
# Usage: ./install-cloudflared.sh
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "Installing cloudflared..."

# Detect OS
OS=$(uname -s)

case "$OS" in
  Darwin)
    echo "Detected macOS"
    if command -v brew &> /dev/null; then
      brew install cloudflared
    else
      echo -e "${YELLOW}Homebrew not found. Installing via direct download...${NC}"
      curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz | tar xz
      sudo mv cloudflared /usr/local/bin/
    fi
    ;;

  Linux)
    echo "Detected Linux"
    if command -v apt-get &> /dev/null; then
      # Debian/Ubuntu
      echo "Using apt package manager"
      curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o /tmp/cloudflared.deb
      sudo dpkg -i /tmp/cloudflared.deb
      rm /tmp/cloudflared.deb
    elif command -v yum &> /dev/null; then
      # RHEL/CentOS
      echo "Using yum package manager"
      curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.rpm -o /tmp/cloudflared.rpm
      sudo yum localinstall -y /tmp/cloudflared.rpm
      rm /tmp/cloudflared.rpm
    else
      # Fallback: direct binary download
      echo "Downloading binary directly"
      curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
      chmod +x /tmp/cloudflared
      sudo mv /tmp/cloudflared /usr/local/bin/
    fi
    ;;

  *)
    echo -e "${RED}Unsupported OS: $OS${NC}"
    echo "Please install cloudflared manually from:"
    echo "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"
    exit 1
    ;;
esac

# Verify installation
if command -v cloudflared &> /dev/null; then
  VERSION=$(cloudflared --version 2>&1 | head -1)
  echo ""
  echo -e "${GREEN}✓ cloudflared installed successfully${NC}"
  echo "  $VERSION"
  echo ""
  echo "To start a tunnel:"
  echo "  ./start-tunnel.sh"
else
  echo -e "${RED}✗ Installation failed${NC}"
  exit 1
fi
