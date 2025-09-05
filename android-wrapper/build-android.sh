#!/bin/bash

# Build script för Android TWA (Trusted Web Activity)

echo "🚀 Bygger Zhoplist för Google Play Store..."

# Installera Bubblewrap om det inte redan är installerat
if ! command -v bubblewrap &> /dev/null; then
    echo "📦 Installerar Bubblewrap CLI..."
    npm i -g @bubblewrap/cli
fi

# Steg 1: Initiera projektet från manifest
echo "📝 Initierar Android-projekt från PWA manifest..."
bubblewrap init --manifest="https://zhoplist.com/manifest.json" \
    --name="Zhoplist" \
    --packageId="com.zhoplist.app" \
    --startUrl="https://zhoplist.com" \
    --iconUrl="https://zhoplist.com/icon-512.svg" \
    --maskableIconUrl="https://zhoplist.com/icon-512.svg" \
    --themeColor="#10b981" \
    --navigationColor="#0f172a" \
    --backgroundColor="#0f172a"

# Steg 2: Generera keystore (första gången)
if [ ! -f "android.keystore" ]; then
    echo "🔐 Genererar signing key..."
    keytool -genkeypair -v \
        -keystore android.keystore \
        -alias android \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass zhoplist123 \
        -keypass zhoplist123 \
        -dname "CN=Zhoplist,OU=Development,O=Zhoplist,L=Stockholm,ST=Stockholm,C=SE"
    
    echo "⚠️  VIKTIGT: Spara android.keystore säkert! Du behöver den för alla framtida uppdateringar."
fi

# Steg 3: Bygga APK/AAB
echo "🔨 Bygger Android App Bundle (.aab)..."
bubblewrap build \
    --skipPwaValidation \
    --signingKeyPath="./android.keystore" \
    --signingKeyAlias="android"

# Steg 4: Verifiera bygget
if [ -f "app-release-bundle.aab" ]; then
    echo "✅ Build lyckades!"
    echo "📦 Filer skapade:"
    echo "   - app-release-bundle.aab (för Google Play Store)"
    echo "   - app-release.apk (för direkt installation)"
    echo ""
    echo "📱 Nästa steg:"
    echo "1. Skapa konto på Google Play Console ($25)"
    echo "2. Ladda upp app-release-bundle.aab"
    echo "3. Fyll i app-information och screenshots"
    echo "4. Publicera till Internal Testing först"
    echo ""
    echo "🔑 SHA-256 fingerprint för assetlinks.json:"
    keytool -list -v -keystore android.keystore -alias android -storepass zhoplist123 | grep SHA256
else
    echo "❌ Build misslyckades. Kontrollera felmeddelanden ovan."
fi