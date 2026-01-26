#!/bin/bash

# 1. Define variables
BINARY_NAME="gosh-linux"
# You will replace this URL once your Cloud Storage/S3 is live
DOWNLOAD_URL="https://github.com/denisha-madhura/Gosh/releases/download/v1.0.0/gosh-linux"
INSTALL_PATH="/usr/local/bin/gosh"

echo "------------------------------------------"
echo "Installing Gosh Shell (Linux MVP)..."
echo "------------------------------------------"

# 2. Check if the user is actually on Linux
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo "❌ Error: This installer currently only supports Linux."
    echo "macOS support is coming soon!"
    exit 1
fi

# 3. Download the binary
echo "Downloading binary from $DOWNLOAD_URL..."
curl -L "$DOWNLOAD_URL" -o "$BINARY_NAME"

# 4. Make it executable
chmod +x "$BINARY_NAME"

# 5. Move to System Path (requires sudo)
echo "Moving binary to $INSTALL_PATH (may require password)..."
sudo mv "$BINARY_NAME" "$INSTALL_PATH"

# 6. Final verification
if [ -f "$INSTALL_PATH" ]; then
    echo "------------------------------------------"
    echo "✅ Success! Gosh has been installed."
    echo "Type 'gosh' to start your new shell."
    echo "------------------------------------------"
else
    echo "❌ Installation failed. Please check your permissions."
fi