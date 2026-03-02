#!/bin/bash
# ============================================
# Install cloudflared
# ============================================
# This script detects your OS and installs cloudflared
# cloudflared is Cloudflare's tunnel client

set -e

echo "=========================================="
echo "Installing cloudflared"
echo "=========================================="
echo

# Detect OS
OS="$(uname -s)"
ARCH="$(uname -m)"

echo "Detected: $OS ($ARCH)"
echo

case "$OS" in
    Darwin)
        # macOS
        if command -v brew &> /dev/null; then
            echo "Installing via Homebrew..."
            brew install cloudflared
        else
            echo "Homebrew not found. Please install Homebrew first:"
            echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            exit 1
        fi
        ;;
    Linux)
        # Linux
        if command -v apt-get &> /dev/null; then
            # Debian/Ubuntu
            echo "Installing via apt..."
            curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
            sudo dpkg -i cloudflared.deb
            rm cloudflared.deb
        elif command -v yum &> /dev/null; then
            # RHEL/CentOS
            echo "Installing via yum..."
            curl -L --output cloudflared.rpm https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.rpm
            sudo yum install -y cloudflared.rpm
            rm cloudflared.rpm
        else
            echo "Package manager not detected. Installing binary directly..."
            curl -L --output cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
            chmod +x cloudflared
            sudo mv cloudflared /usr/local/bin/
        fi
        ;;
    *)
        echo "Unsupported OS: $OS"
        echo "Please install cloudflared manually:"
        echo "  https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"
        exit 1
        ;;
esac

echo
echo "=========================================="
echo "Installation complete!"
echo "=========================================="
echo
echo "Verify installation:"
cloudflared --version
echo
echo "You can now use: ./start-tunnel.sh"
