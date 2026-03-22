#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
MOVE_DIR="${SCRIPT_DIR}/../move"

echo "Building R11 Move package..."
cd "${MOVE_DIR}"
sui move build

cat <<'EOF'

R11 package built successfully.

To publish manually:
  sui client publish --gas-budget 100000000

Record the package ID and shared object IDs in:
  R11/server/.env
  R11/client/.env
  R11/dapp/.env
EOF
