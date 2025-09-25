#!/bin/bash

echo "🎨 Converting SVG icon to PNG formats..."

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Please install ImageMagick or use the Node.js script instead."
    echo "Install ImageMagick: https://imagemagick.org/script/download.php"
    exit 1
fi

# Use magick if available, otherwise convert
if command -v magick &> /dev/null; then
    CONVERT_CMD="magick"
else
    CONVERT_CMD="convert"
fi

# Create PNG versions in different sizes
echo "📦 Generating PNG icons..."

# Main icon (512x512)
$CONVERT_CMD frontend/public/icon.svg -resize 512x512 frontend/public/icon.png
echo "✅ icon.png (512x512)"

# Common sizes
$CONVERT_CMD frontend/public/icon.svg -resize 16x16 frontend/public/icon-16.png
echo "✅ icon-16.png"

$CONVERT_CMD frontend/public/icon.svg -resize 32x32 frontend/public/icon-32.png
echo "✅ icon-32.png"

$CONVERT_CMD frontend/public/icon.svg -resize 64x64 frontend/public/icon-64.png
echo "✅ icon-64.png"

$CONVERT_CMD frontend/public/icon.svg -resize 128x128 frontend/public/icon-128.png
echo "✅ icon-128.png"

$CONVERT_CMD frontend/public/icon.svg -resize 192x192 frontend/public/icon-192.png
echo "✅ icon-192.png"

$CONVERT_CMD frontend/public/icon.svg -resize 256x256 frontend/public/icon-256.png
echo "✅ icon-256.png"

# Favicon sizes
$CONVERT_CMD frontend/public/icon.svg -resize 16x16 frontend/public/favicon-16.png
$CONVERT_CMD frontend/public/icon.svg -resize 32x32 frontend/public/favicon-32.png

echo "🎉 All PNG icons generated successfully!"
echo ""
echo "Generated files:"
echo "- frontend/public/icon.png (512x512)"
echo "- frontend/public/icon-{16,32,64,128,192,256}.png"
echo "- frontend/public/favicon-{16,32}.png"