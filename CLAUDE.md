# Zhoplist - Shopping List App

## Claude Guidelines & Project Rules

### UI & Design Guidelines

**❌ ALDRIG använda emoji-ikoner:**
- Använd ALDRIG färgglada emoji-ikoner som 🛍️, 🎪, 🎭, 🎨, 📦, 🏷️, 📋 etc.
- Använd ENDAST stilrena SVG-ikoner som matchar befintliga kategori-ikoner
- Alla ikoner ska vara enfärgade SVG med samma designspråk som CategoryIcons.tsx
- Ikoner ska vara 28x28px SVG med clean, minimalistisk design
- Håll ikonpaletten enhetlig och professionell
- Undvik "party" eller "cirkus" känsla i ikonvalen

**✅ Rätt ikontyper:**
- SVG-ikoner: box, sports, electronics, garden, pets, baby, tools, books, auto, health, office, music
- Följ samma designmönster som DairyIcon, FishIcon, MeatIcon etc.
- Enfärgad design med subtila skuggor/detaljer

### Architecture Notes

- Frontend: React + TypeScript + Vite
- Backend: Cloudflare Workers + D1 Database  
- State: React Context API
- Storage: localStorage för custom kategorier och produkter
- Styling: Inline styles med dark theme

### Key Features Implemented

1. **Smart Autocomplete** - AI-driven product suggestions
2. **Custom Categories** - User-created categories with localStorage
3. **View Toggle** - Categorized vs flat list views
4. **Multi-language** - Swedish/English with context-based translations
5. **Custom Products** - Learning system for unknown products