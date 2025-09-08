# Zhoplist - Komplett Svensk Dokumentation

## Appöversikt

Zhoplist är en modern, mobilfokuserad inköpslisteapp byggd med glassmorphism-design för Cloudflares kostnadsfria nivå. Appen är byggd som en Progressive Web App (PWA) med React, TypeScript, och Tailwind CSS på frontend, medan backend använder Cloudflare Workers och D1-databasen.

### Teknisk Stack

**Frontend:**
- React 19.1.1 med TypeScript
- Tailwind CSS för styling
- Vite som build-verktyg
- PWA-funktionalitet med Service Workers
- Capacitor för mobilapplikationer

**Backend:**
- Cloudflare Workers (serverless)
- Cloudflare D1 (SQLite-databas)
- TypeScript för typsäkerhet
- UUID för unika identifierare

## Arkitektur

```
Zhoplist/
├── frontend/          # React PWA-applikation
│   ├── src/
│   │   ├── components/    # Återanvändbara UI-komponenter
│   │   ├── context/       # React Context för state management
│   │   ├── hooks/         # Anpassade React hooks
│   │   ├── utils/         # Hjälpfunktioner och API-anrop
│   │   ├── types/         # TypeScript typdefinitioner
│   │   └── data/          # Mockdata och produktkataloger
│   └── public/        # Statiska tillgångar
├── backend/           # Cloudflare Workers API
│   ├── src/
│   │   └── index.ts      # Huvudfil för Workers API
│   └── migrations/    # Databas-migreringar
└── android-wrapper/   # Android-applikation med Capacitor
```

## Kärnfunktionalitet

### 1. Todo/Inköpslisthantering
- Skapa, redigera och ta bort todos/inköpslistor
- Markera som slutförda
- Prioriteringssystem (0=låg, 1=medium, 2=hög)
- Kategorisering av produkter
- Tags för organisering

### 2. PWA-funktioner
- Offline-support med lokal lagring
- Installationsbar på mobil och desktop
- Push-notifikationer (planerad)
- App shortcuts för snabb åtkomst
- Share Target API för delning av listor

### 3. Mobiloptimerad UX
- Swipe-gester för redigering och borttagning
- Pull-to-refresh för datauppdatering
- Responsiv design för alla skärmstorlekar
- Glassmorphism UI med moderna animationer

### 4. Sessionshantering
- Session-baserad användaridentifiering
- Multi-user support genom sessionID
- Säker datahantering per session

## Deployment

### Frontend
- Automatisk deployment via Cloudflare Pages
- Git-baserad CI/CD
- CDN-distribution globalt

### Backend
- Cloudflare Workers deployment
- D1-databas för datalagring
- Edge computing för låg latens

### Android
- Capacitor för native Android-app
- Google Play Store distribution
- AdMob-integration för intäkter

---

*Denna dokumentation uppdaterades senast: 2025-09-07*