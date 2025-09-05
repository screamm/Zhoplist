// Premium Features för Zhoplist - Svenska marknaden

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  value: string;
}

export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: 'no_ads',
    name: 'Ingen reklam',
    description: 'Ta bort all reklam för alltid - inga störningar när du handlar',
    icon: '🚫',
    value: 'För alltid'
  },
  {
    id: 'premium_themes',
    name: 'Premium-teman',
    description: '10+ vackra teman - anpassa appen efter din stil',
    icon: '🎨',
    value: '10+ designs'
  },
  {
    id: 'unlimited_lists',
    name: 'Obegränsade listor',
    description: 'Skapa hur många listor du vill - för hem, kontor, semester',
    icon: '📝',
    value: 'Unlimited'
  },
  {
    id: 'family_sharing',
    name: 'Familje-delning',
    description: 'Dela listor med upp till 6 familjemedlemmar',
    icon: '👨‍👩‍👧‍👦',
    value: '6 personer'
  },
  {
    id: 'widget_support',
    name: 'Widget på hemskärmen',
    description: 'Se din lista direkt på hemskärmen - inga extra klick',
    icon: '📱',
    value: 'Android widget'
  },
  {
    id: 'priority_sync',
    name: 'Prioriterad synkning',
    description: 'Snabbare synkning mellan dina enheter',
    icon: '⚡',
    value: '2x snabbare'
  },
  {
    id: 'export_features',
    name: 'Exportera listor',
    description: 'Spara listor som PDF eller CSV för backup',
    icon: '📄',
    value: 'PDF & CSV'
  },
  {
    id: 'barcode_scanning',
    name: 'Streckkods-scanning',
    description: 'Scanna produkter för att lägga till i listan',
    icon: '📷',
    value: 'Smart scanning'
  },
  {
    id: 'voice_input',
    name: 'Röst-inmatning',
    description: 'Säg vad du behöver - vi lägger till det automatiskt',
    icon: '🎤',
    value: 'Handsfree'
  },
  {
    id: 'future_features',
    name: 'Framtida features',
    description: 'Alla nya premium-funktioner ingår automatiskt',
    icon: '🚀',
    value: 'Inkluderat'
  }
];

export const PREMIUM_PRICING = {
  price: '149 kr',
  priceUSD: '$14.99',
  comparison: 'Mindre än två kaffe på Espresso House',
  savings: 'Istället för 49 kr/månad i andra appar',
  guarantee: 'Pengarna tillbaka inom 48 timmar om du inte är nöjd'
};

export const PREMIUM_MESSAGING = {
  title: 'Zhoplist Premium 🇸🇪',
  subtitle: 'Perfekt för svenska familjer',
  cta: 'Uppgradera till Premium',
  ctaSecondary: 'Prova gratis i 24h',
  testimonial: '"Bästa inköpsappen jag använt!" - Anna, Stockholm',
  
  // Olika meddelanden baserat på användning
  messages: {
    firstTime: 'Upptäck alla Premium-funktioner!',
    frequent: 'Du använder appen ofta - bli Premium!',
    sharing: 'Perfekt för familjer som delar listor!',
    offline: 'Få prioriterad synkning med Premium!',
    ads: 'Trött på reklam? Bli av med den för alltid!'
  }
};

// Conversion triggers
export const CONVERSION_TRIGGERS = {
  appOpens: 15,        // Visa efter 15 användningar
  listsCreated: 5,     // Visa efter 5 skapade listor
  itemsAdded: 50,      // Visa efter 50 tillagda items
  daysActive: 7,       // Visa efter 7 dagar aktiv användning
  adsShown: 20,        // Visa efter 20 visade annonser
  shareAttempts: 3     // Visa efter 3 delningsförsök
};

// Regional pricing för framtida expansion
export const REGIONAL_PRICING = {
  'SE': { price: '149 kr', currency: 'SEK' },
  'NO': { price: '149 kr', currency: 'NOK' },
  'DK': { price: '99 kr', currency: 'DKK' },
  'FI': { price: '14.99 €', currency: 'EUR' },
  'US': { price: '$14.99', currency: 'USD' },
  'DE': { price: '12.99 €', currency: 'EUR' },
  'UK': { price: '£11.99', currency: 'GBP' }
};