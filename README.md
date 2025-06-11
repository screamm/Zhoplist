# 🚀 Zhoplist - Modern Shopping List App

En modern, mobile-first shopping list-applikation byggd med React 18, TypeScript och Tailwind CSS v3.4. Appen använder glassmorphism design och är optimerad för mobila enheter med swipe-gester och pull-to-refresh.

## ✨ Funktioner

### 🎯 Grundfunktioner
- ✅ Lägg till, redigera och ta bort items
- 🔄 Markera items som slutförda med smooth animationer
- 🗑️ Massradering av slutförda items
- 🔍 Realtids-sökning och filtrering
- 📂 Kategorisering med färgkodning
- ⭐ Prioritetsnivåer (Låg, Medium, Hög)
- 🏷️ Taggning av items
- 📅 Förfallodatum

### 📱 Mobile-First UX
- 👆 Swipe-gester (swipe höger för att slutföra, vänster för att ta bort)
- 🔄 Pull-to-refresh funktionalitet
- 📱 Bottom navigation för primära actions
- ⚡ Floating Action Button för snabb access
- 🎨 Glassmorphism design med moderna animationer

### 🛠️ Tekniska Funktioner
- 🌐 REST API med Cloudflare Workers backend
- 💾 Cloudflare D1 databas (SQLite)
- 📱 PWA-stöd (Progressive Web App)
- 🔄 Offline-funktionalitet med mock data fallback
- ⚡ Optimerad för Cloudflares free tier

## 🏗️ Teknisk Stack

### Frontend
- **React 18** med TypeScript
- **Tailwind CSS v3.4** (undviker v4 kompatibilitetsproblem)
- **Vite** för snabb utveckling och optimerad bundling
- **Context API** för state management

### Backend
- **Cloudflare Workers** för serverless API
- **Cloudflare D1** för databas (SQLite-baserad)
- **REST API** med full CRUD-funktionalitet

## 🚀 Kom Igång

### Förutsättningar
- Node.js 18+
- npm eller yarn
- Cloudflare-konto (för deployment)

### Installation

1. **Klona repositoriet**
```bash
git clone https://github.com/screamm/Zhoplist.git
cd zhoplist
```

2. **Installera backend-beroenden**
```bash
cd backend
npm install
```

3. **Konfigurera Cloudflare Workers**
```bash
# Logga in på Cloudflare
npx wrangler login

# Skapa D1 databas
npx wrangler d1 create zhoplist-db

# Kör migrationer
npx wrangler d1 migrations apply zhoplist-db --local
```

4. **Installera frontend-beroenden**
```bash
cd ../frontend
npm install
```

### Utveckling

1. **Starta backend API**
```bash
cd backend
npm run dev
```
Backend kommer köra på `http://localhost:8787`

2. **Starta frontend (i ny terminal)**
```bash
cd frontend
npm run dev
```
Frontend kommer köra på `http://localhost:5173`

### 🧪 Test Mode
Om backend inte är tillgängligt kommer appen automatiskt falla tillbaka på mock data för testning.

## 📱 Användning

### Grundläggande Navigation
- **Lägg till item**: Tryck på den blå FAB-knappen (+ ikon)
- **Slutföra item**: Tryck på checkboxen eller swipe höger
- **Ta bort item**: Swipe vänster eller tryck på skräpkorgsikonen
- **Redigera item**: Tryck på rediger-ikonen eller tryck på innehållet

### Mobile Gester
- **Swipe höger**: Markera som slutförd/ångra
- **Swipe vänster**: Ta bort item
- **Pull-to-refresh**: Dra ner på listan för att uppdatera

### Filtrering och Sökning
- Använd sökfältet för realtids-sökning
- Filtrera på: Alla, Aktiva, Slutförda
- Sortera på: Nyaste, Äldsta, Prioritet, Alfabetisk

## 🚀 Deployment

### Cloudflare Workers (Backend)
```bash
cd backend
npm run deploy
```

### Cloudflare Pages (Frontend)
1. Koppla git-repository till Cloudflare Pages
2. Sätt build-kommando: `npm run build`
3. Sätt output-mapp: `dist`
4. Sätt miljövariabler:
   - `VITE_API_URL`: Din Workers API URL

## 🎨 Design System

### Färgpalett
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple) 
- **Background**: #0f172a (Slate-900)
- **Surface**: #1e293b (Slate-800)
- **Success**: #10b981 (Emerald)
- **Text**: #f1f5f9 (Slate-100)

### Designprinciper
- **Mobile First**: Designad för thumbs-first navigation
- **Glassmorphism**: Frostad glas-effekter med blur
- **Dark Mode**: Modern mörk färgpalett som standard
- **Micro-interactions**: Subtila animationer för bättre UX

## 📊 Performance

Appen är optimerad för:
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Mobile Performance**: Time to Interactive < 3s på 3G
- **Bundle Size**: < 100KB gzipped
- **API Response**: < 200ms (95th percentile)

## 🤝 Bidrag

1. Forka projektet
2. Skapa en feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit dina ändringar (`git commit -m 'Add some AmazingFeature'`)
4. Push till branchen (`git push origin feature/AmazingFeature`)
5. Öppna en Pull Request

## 📄 Licens

Detta projekt är licensierat under MIT License.

## 🙏 Erkännanden

- Designinspiration från moderna mobile shopping list-appar
- Teknisk implementation följer Cloudflares best practices
- Mobile UX-patterns från iOS och Android guidelines

---

**Byggd med ❤️ för moderna mobila enheter** 