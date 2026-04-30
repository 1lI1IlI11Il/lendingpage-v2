#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
BACKEND_DIR=$(cd -- "$SCRIPT_DIR/.." && pwd)
VENDOR_DIR="$BACKEND_DIR/vendor"
TARGET_DIR="$VENDOR_DIR/Kronos"

mkdir -p "$VENDOR_DIR"

if [ -d "$TARGET_DIR/.git" ]; then
  echo "Kronos vendor repository already exists at $TARGET_DIR"
  exit 0
fi

git clone "https://github.com/shiyu-coder/Kronos.git" "$TARGET_DIR"
