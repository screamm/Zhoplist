# �� Deployment Guide - Zhoplist Shopping List App

Denna guide förklarar hur du deployer shopping list-appen till Cloudflares free tier.

## 📋 Förutsättningar

- ✅ Cloudflare-konto (gratis)
- ✅ Git repository (GitHub, GitLab, etc.)
- ✅ Node.js 18+ installerat lokalt
- ✅ Wrangler CLI installerat (`npm install -g wrangler`)

## 🗄️ Steg 1: Konfigurera Cloudflare D1 Databas

### 1.1 Logga in på Cloudflare
```bash
npx wrangler login
```

### 1.2 Skapa D1 databas
```bash
cd backend
npx wrangler d1 create zhoplist-db
```

**Anteckna databas-ID:t** från output! Du behöver det i nästa steg.

### 1.3 Uppdatera wrangler.toml
Öppna `backend/wrangler.toml` och ersätt `database_id` med ditt verkliga ID:

```toml
[[d1_databases]]
binding = "DB"
database_name = "zhoplist-db"
database_id = "DITT_DATABAS_ID_HÄR"  # Ersätt med verkligt ID
```

### 1.4 Kör migrationer i produktion
```bash
npx wrangler d1 migrations apply zhoplist-db
```

## ⚡ Steg 2: Deploya Backend (Cloudflare Workers)

### 2.1 Bygg och deploya
```bash
cd backend
npm run deploy
```

### 2.2 Verifiera deployment
```bash
# Testa ditt API
curl https://DITT_WORKER_NAMN.DITT_SUBDOMAIN.workers.dev/health
```

**Anteckna din Workers URL!** Du behöver den för frontend.

## 🌐 Steg 3: Deploya Frontend (Cloudflare Pages)

### 3.1 Sätt upp Git Repository
1. Pusha koden till GitHub/GitLab
2. Logga in på [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Gå till **Pages** → **Create a project**

### 3.2 Koppla Repository
1. Välj **Connect to Git**
2. Auktorisera Cloudflare med din Git-provider
3. Välj ditt repository
4. Välj `main` eller `master` branch

### 3.3 Konfigurera Build Settings
```yaml
Build command: cd frontend && npm run build
Build output directory: frontend/dist
Root directory: / (leave empty)
Node.js version: 18.x
```

### 3.4 Sätt Environment Variables
Under **Environment Variables** på Pages-projektet:

| Variable | Value | Exempel |
|----------|--------|---------|
| `VITE_API_URL` | Din Workers URL | `https://todo-api.david.workers.dev` |
| `NODE_VERSION` | `18` | `18` |

### 3.5 Deploya
1. Klicka **Save and Deploy**
2. Vänta på att bygget slutförs (~2-3 minuter)
3. Din app blir tillgänglig på `https://DITT_PROJEKT.pages.dev`

## 🔧 Steg 4: Konfigurera Custom Domain (Valfritt)

### 4.1 Lägg till Custom Domain
1. I Pages-projektet → **Custom domains**
2. Klicka **Set up a custom domain**
3. Ange din domän (t.ex. `inkopslista.com`)
4. Följ instruktionerna för DNS-setup

### 4.2 SSL Certifikat
Cloudflare skapar automatiskt SSL-certifikat för din domän.

## 🧪 Steg 5: Testa Deployment

### 5.1 Funktionalitetstest
Besök din app och testa:
- ✅ Ladda todos (kan vara tom initially)
- ✅ Skapa ny todo
- ✅ Markera som slutförd
- ✅ Ta bort todo
- ✅ Redigera todo
- ✅ Sökning och filtrering

### 5.2 Performance Test
Använd verktyg som:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Chrome DevTools Lighthouse

Mål: 90+ på alla Core Web Vitals

## 📊 Steg 6: Övervaka Usage

### 6.1 Cloudflare Analytics
- **Pages**: Besök Analytics-fliken
- **Workers**: Kontrollera invocations och CPU-tid
- **D1**: Övervaka reads/writes per dag

### 6.2 Free Tier Limits (2025)
```yaml
Workers:
  Invocations: 100,000/dag
  CPU Time: 10ms per request
  Memory: 128MB

D1 Database:
  Reads: 25,000/dag  
  Writes: 50,000/dag
  Storage: 5GB total

Pages:
  Builds: 500/månad
  Requests: 100,000/dag
  Bandwidth: Unlimited
```

## 🔧 Felsökning

### Problem: "Module not found" vid build
**Lösning**: Kontrollera att alla dependencies är installerade
```bash
cd frontend && npm install
cd ../backend && npm install
```

### Problem: API 404 errors
**Lösning**: Kontrollera `VITE_API_URL` environment variable
```bash
# I Cloudflare Pages environment variables
VITE_API_URL=https://din-worker.subdomain.workers.dev
```

### Problem: D1 migrations fail
**Lösning**: Kontrollera databas-ID i wrangler.toml
```bash
npx wrangler d1 list  # Lista alla databaser
```

### Problem: Build failure på Pages
**Lösning**: Kontrollera Node.js version
```yaml
Environment Variables:
NODE_VERSION: 18
```

### Problem: CORS errors
**Lösning**: Kontrollera CORS headers i Workers API (redan implementerat)

## 🚀 Continuous Deployment

### Auto-deploy från Git
Cloudflare Pages deployer automatiskt vid:
- ✅ Push till main/master branch
- ✅ Merge av pull requests
- ✅ Tag-skapande

### Preview Deployments
Varje pull request får sin egen preview URL:
- `https://PR_NUMBER.DITT_PROJEKT.pages.dev`

## 📈 Optimeringar för Produktion

### 1. Caching Strategy
Workers API använder redan Cloudflare Edge caching.

### 2. Asset Optimization
Frontend assets optimeras automatiskt av Vite:
- Code splitting
- Tree shaking  
- Asset compression

### 3. CDN Distribution
Cloudflare distribuerar automatiskt till 300+ edge locations.

## 🔒 Säkerhetsöverväganden

### 1. API Rate Limiting
Implementerat i Workers API för att förhindra abuse.

### 2. Input Validation
Både frontend och backend validerar all input.

### 3. HTTPS Enforcement
Cloudflare forcerar HTTPS för all trafik.

## 📞 Support

### Cloudflare Resources
- [Workers Documentation](https://developers.cloudflare.com/workers/)
- [Pages Documentation](https://developers.cloudflare.com/pages/)
- [D1 Documentation](https://developers.cloudflare.com/d1/)

### Community Support
- [Cloudflare Discord](https://discord.cloudflare.com/)
- [Cloudflare Community Forum](https://community.cloudflare.com/)

---

🎉 **Grattis! Din todo-app är nu live på Cloudflare!** 

Dela din app-URL och börja produktivitet-hackingen! 🚀 