# Icon Management

## Available Icons

### Main Icon Files
- `frontend/public/icon.svg` - Vector SVG (recommended, scalable)
- `frontend/public/icon.png` - PNG 512x512 (fallback)
- `frontend/public/favicon.svg` - Favicon for browsers

### Android Icons
All Android icons have been generated in the required densities:
- `mipmap-mdpi/` - 48dp
- `mipmap-hdpi/` - 72dp
- `mipmap-xhdpi/` - 96dp
- `mipmap-xxhdpi/` - 144dp
- `mipmap-xxxhdpi/` - 192dp

Plus adaptive icons:
- `drawable/ic_launcher_background.xml`
- `drawable/ic_launcher_foreground.xml`

## Design Details

**Concept**: Shopping bag with green checkmark
**Colors**:
- Background: Dark blue gradient (#001122 → #1e3a8a)
- Bag: White with light grey handles
- Checkmark: Green gradient (#22c55e → #16a34a)

## Generating Additional PNG Sizes

### Using ImageMagick (if installed):
```bash
./scripts/convert-svg-to-png.sh
```

### Using Node.js Canvas (requires canvas package):
```bash
npm install canvas
node scripts/generate-png-icon.js
```

### Manual conversion:
Use any SVG to PNG converter online or desktop app to convert `frontend/public/icon.svg` to desired sizes.

## Files Updated
- ✅ `frontend/public/icon.svg` - Main icon
- ✅ `frontend/public/icon.png` - PNG version
- ✅ `frontend/public/favicon.svg` - Browser favicon
- ✅ `frontend/public/manifest.json` - Web app manifest
- ✅ `frontend/index.html` - HTML meta tags
- ✅ All Android icon files updated

## Usage in Code
The app now uses the new icon across all platforms:
- Web: SVG preferred, PNG fallback
- Android: Vector drawables + adaptive icons
- PWA: Manifest icons updated