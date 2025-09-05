# 📱 AdMob Setup Guide för Zhoplist

## ✅ Dina AdMob Credentials

Din AdMob är konfigurerad och redo!

### App Information
- **App ID**: `ca-app-pub-6748269812398218~1968418017`
- **Package Name**: `com.zhoplist.app`

### Ad Units
- **Banner**: `ca-app-pub-6748269812398218/5769714618`
- **Interstitial**: `ca-app-pub-6748269812398218/1146290931`  
- **Rewarded**: `ca-app-pub-6748269812398218/1830469601`

## 🔧 Test vs Produktion

### Utveckling (Test Mode)
```javascript
// I koden: USE_TEST_ADS: false är redan satt för produktion
// Men du kan aktivera test-läge om nödvändigt:
import { setAdTestMode } from './utils/adManager';
setAdTestMode(true);  // Använder Googles test-ads
```

### Produktion (Live Mode)
```javascript
// Koden är redan konfigurerad för produktion
USE_TEST_ADS: false  // ✅ Redan satt för dina riktiga ads
```

## 📋 Implementation Checklist

### ✅ Redan gjort:
- [x] AdMob konto skapat
- [x] App registrerad i AdMob  
- [x] 3 Ad Units skapade
- [x] IDs uppdaterade i kod
- [x] Smart timing implementerat
- [x] Non-intrusive placement

### 🔄 Nästa steg:

#### 1. Lägg till Capacitor AdMob Plugin
```bash
cd frontend
npm install @capacitor-community/admob
npx cap sync
```

#### 2. Android Permissions
Lägg till i `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- AdMob App ID -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-6748269812398218~1968418017"/>
```

#### 3. Test Device ID (Optional)
Hitta ditt test device ID:
```bash
adb logcat | grep "Test device ID"
```

Lägg till i kod:
```javascript
testDeviceIdentifiers: ['DIN_TEST_DEVICE_ID_HÄR']
```

## 💰 Förväntade Intäkter

Med dina riktiga AdMob IDs:

### Svenska marknaden (CPM $0.80-2.50)
```
10,000 månadsaktiva användare:
- Banner ads: ~8,000 kr/månad
- Interstitial ads: ~5,000 kr/månad  
- Rewarded videos: ~3,000 kr/månad
- Premium purchases (149 kr): ~22,000 kr engångs

Total månadintäkt: ~16,000 kr
+ Premium bursts: ~22,000 kr
```

### Skalning
```
50,000 användare = ~80,000 kr/månad
100,000 användare = ~160,000 kr/månad
```

## 🎯 Ad Placement Strategy

### Banner Ads (Alltid synlig)
- **Position**: Bottom, ovanför navigation  
- **Stil**: Glassmorphism, smälter in
- **Timing**: Efter 5 sekunder, döljs under aktiv shopping

### Interstitial Ads (Smart timing)
- **Frequency**: Max var 3:e gång, min 3 min mellanrum
- **Triggers**: Lista klar, app restart, efter delning
- **Never**: Under aktiv shopping, första 5 min

### Rewarded Ads (Frivilligt)
- **Reward**: 24h ad-free experience  
- **Placement**: Settings menu, premium prompt
- **Message**: "Titta på kort video för 24h reklamfritt"

## 🔍 Monitoring & Optimization

### AdMob Console
- **URL**: https://apps.admob.com/
- **Metrics att följa**:
  - eCPM (revenue per 1000 impressions)
  - Fill rate (% ads som visas)
  - Click-through rate (CTR)

### Optimization Tips
1. **Första månaden**: Låt AdMob lära sig din audience
2. **Efter 1000+ impressions**: Optimera ad placement
3. **A/B testa**: Olika banner-positioner
4. **Seasonal**: Högre CPM under Black Friday/jul

## 🚨 Viktiga Regler

### AdMob Policy
- ❌ Aldrig klicka på egna ads (ban risk!)
- ❌ Uppmuntra användare att klicka  
- ❌ Placera ads för nära knappar
- ✅ Tydligt märk ads som "Annons"
- ✅ Respektera GDPR (svensk lag)

### Best Practices
```javascript
// Bra timing
showAd.after(['list-completed', 'natural-break']);

// Dålig timing  
showAd.during(['user-typing', 'active-shopping']);
```

## 🧪 Testing

### Verifiera ads fungerar
```bash
# Bygg och testa på device
npm run build:android
adb install app-debug.apk

# Kolla logs för ad events
adb logcat | grep AdMob
```

### Test Scenarios
1. **Banner**: Ska visas efter 5 sekunder
2. **Interstitial**: Visa efter lista-completion
3. **Rewarded**: Frivillig från settings
4. **Premium**: Köp ska gömma alla ads

## 🎉 Launch Checklist

- [ ] Test-mode avstängt (`USE_TEST_ADS: false`)
- [ ] App ID korrekt i AndroidManifest.xml
- [ ] Permissions tillagda
- [ ] Ads visas korrekt på test-device
- [ ] Premium-köp döljer ads
- [ ] GDPR consent implementerat

## 🆘 Troubleshooting

### Ads visas inte
1. Kontrollera internet-anslutning
2. Vänta 24h efter app-publicering (AdMob behöver tid)  
3. Kolla AdMob Console för errors
4. Verifiera App ID i manifest

### Låg eCPM
1. Vänta 30 dagar för AdMob-optimering
2. Lägg till fler ad networks (mediation)
3. Förbättra app retention
4. Testa olika ad-positioner

**Support**: Kontakta mig om du stöter på problem!

---

**Din app är nu redo att tjäna pengar! 💰**