// Svensk produktdatabas med kategorimappning
// Optimerad för svenska matvaror och vanliga inköpslistor

export interface Product {
  name: string;
  category: string;
  aliases?: string[];
  popularity?: number; // 1-10, högre = visas högre upp i förslag
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  order: number;
  removable: boolean; // Kan användaren ta bort denna kategori?
}

// Fördefinierade kategorier (optimerade för svensk handel)
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'mejeri', name: 'Mejeri', icon: '🥛', order: 1, removable: true },
  { id: 'frukt-gront', name: 'Frukt & Grönt', icon: '🍎', order: 2, removable: true },
  { id: 'kott-fisk', name: 'Kött & Fisk', icon: '🥩', order: 3, removable: true },
  { id: 'skafferi', name: 'Skafferi', icon: '🥫', order: 4, removable: true },
  { id: 'brod', name: 'Bröd', icon: '🍞', order: 5, removable: true },
  { id: 'frys', name: 'Frys', icon: '❄️', order: 6, removable: true },
  { id: 'dryck', name: 'Dryck', icon: '🥤', order: 7, removable: true },
  { id: 'godis-snacks', name: 'Godis & Snacks', icon: '🍬', order: 8, removable: true },
  { id: 'hygien', name: 'Hygien', icon: '🧼', order: 9, removable: true },
  { id: 'stad', name: 'Städ', icon: '🧹', order: 10, removable: true },
  { id: 'husdjur', name: 'Husdjur', icon: '🐕', order: 11, removable: true },
  { id: 'ovrigt', name: 'Övrigt', icon: '📦', order: 12, removable: false }, // Kan inte tas bort
];

// Produktdatabas med svenska matvaror
export const PRODUCT_DATABASE: Product[] = [
  // MEJERI
  { name: 'mjölk', category: 'mejeri', aliases: ['mellanmjölk', 'standardmjölk'], popularity: 10 },
  { name: 'lättmjölk', category: 'mejeri', aliases: ['mjölk lätt'], popularity: 8 },
  { name: 'minimjölk', category: 'mejeri', popularity: 6 },
  { name: 'laktosfri mjölk', category: 'mejeri', aliases: ['laktosfri'], popularity: 7 },
  { name: 'havremjölk', category: 'mejeri', aliases: ['oatly', 'havredryck'], popularity: 8 },
  { name: 'yoghurt', category: 'mejeri', aliases: ['yogurt'], popularity: 9 },
  { name: 'filmjölk', category: 'mejeri', popularity: 7 },
  { name: 'gräddfil', category: 'mejeri', popularity: 6 },
  { name: 'kvarg', category: 'mejeri', popularity: 8 },
  { name: 'cottage cheese', category: 'mejeri', aliases: ['keso'], popularity: 6 },
  { name: 'ost', category: 'mejeri', popularity: 9 },
  { name: 'prästost', category: 'mejeri', popularity: 7 },
  { name: 'hushållsost', category: 'mejeri', popularity: 8 },
  { name: 'mozzarella', category: 'mejeri', popularity: 7 },
  { name: 'fetaost', category: 'mejeri', aliases: ['feta'], popularity: 7 },
  { name: 'parmesanost', category: 'mejeri', aliases: ['parmesan'], popularity: 6 },
  { name: 'smör', category: 'mejeri', popularity: 10 },
  { name: 'bregott', category: 'mejeri', popularity: 8 },
  { name: 'margarin', category: 'mejeri', aliases: ['lätta', 'flora'], popularity: 6 },
  { name: 'grädde', category: 'mejeri', aliases: ['vispgrädde'], popularity: 8 },
  { name: 'matlagningsgrädde', category: 'mejeri', popularity: 7 },
  { name: 'crème fraiche', category: 'mejeri', popularity: 7 },
  { name: 'ägg', category: 'mejeri', popularity: 10 },
  
  // FRUKT & GRÖNT
  { name: 'äpple', category: 'frukt-gront', aliases: ['äpplen'], popularity: 9 },
  { name: 'banan', category: 'frukt-gront', aliases: ['bananer'], popularity: 10 },
  { name: 'apelsin', category: 'frukt-gront', aliases: ['apelsiner'], popularity: 8 },
  { name: 'clementin', category: 'frukt-gront', aliases: ['clementiner'], popularity: 7 },
  { name: 'päron', category: 'frukt-gront', popularity: 6 },
  { name: 'vindruvor', category: 'frukt-gront', aliases: ['druvor'], popularity: 7 },
  { name: 'jordgubbar', category: 'frukt-gront', popularity: 8 },
  { name: 'blåbär', category: 'frukt-gront', popularity: 7 },
  { name: 'hallon', category: 'frukt-gront', popularity: 6 },
  { name: 'mango', category: 'frukt-gront', popularity: 6 },
  { name: 'ananas', category: 'frukt-gront', popularity: 5 },
  { name: 'kiwi', category: 'frukt-gront', popularity: 5 },
  { name: 'avokado', category: 'frukt-gront', aliases: ['avokador'], popularity: 8 },
  { name: 'tomat', category: 'frukt-gront', aliases: ['tomater'], popularity: 10 },
  { name: 'körsbärstomater', category: 'frukt-gront', popularity: 7 },
  { name: 'gurka', category: 'frukt-gront', aliases: ['gurkor'], popularity: 9 },
  { name: 'paprika', category: 'frukt-gront', aliases: ['paprikor'], popularity: 9 },
  { name: 'lök', category: 'frukt-gront', aliases: ['gul lök', 'lökar'], popularity: 10 },
  { name: 'rödlök', category: 'frukt-gront', popularity: 7 },
  { name: 'vitlök', category: 'frukt-gront', popularity: 9 },
  { name: 'potatis', category: 'frukt-gront', aliases: ['potatisar'], popularity: 10 },
  { name: 'morötter', category: 'frukt-gront', aliases: ['morot'], popularity: 9 },
  { name: 'broccoli', category: 'frukt-gront', popularity: 7 },
  { name: 'blomkål', category: 'frukt-gront', popularity: 6 },
  { name: 'sallad', category: 'frukt-gront', aliases: ['isbergssallad', 'huvudsallad'], popularity: 8 },
  { name: 'spenat', category: 'frukt-gront', aliases: ['babyspenat'], popularity: 6 },
  { name: 'ruccola', category: 'frukt-gront', aliases: ['arugula'], popularity: 5 },
  { name: 'champinjoner', category: 'frukt-gront', aliases: ['svamp'], popularity: 7 },
  { name: 'zucchini', category: 'frukt-gront', aliases: ['squash'], popularity: 5 },
  { name: 'aubergine', category: 'frukt-gront', popularity: 4 },
  { name: 'ingefära', category: 'frukt-gront', popularity: 6 },
  { name: 'citron', category: 'frukt-gront', aliases: ['citroner'], popularity: 7 },
  { name: 'lime', category: 'frukt-gront', popularity: 6 },
  { name: 'persilja', category: 'frukt-gront', popularity: 6 },
  { name: 'dill', category: 'frukt-gront', popularity: 7 },
  { name: 'basilika', category: 'frukt-gront', popularity: 5 },
  
  // KÖTT & FISK
  { name: 'köttfärs', category: 'kott-fisk', aliases: ['färs', 'blandfärs'], popularity: 10 },
  { name: 'nötfärs', category: 'kott-fisk', popularity: 8 },
  { name: 'fläskfärs', category: 'kott-fisk', popularity: 6 },
  { name: 'kyckling', category: 'kott-fisk', aliases: ['kycklingfilé', 'kycklingbröst'], popularity: 10 },
  { name: 'kycklinglår', category: 'kott-fisk', popularity: 7 },
  { name: 'bacon', category: 'kott-fisk', popularity: 8 },
  { name: 'fläskfilé', category: 'kott-fisk', popularity: 7 },
  { name: 'fläskkotlett', category: 'kott-fisk', aliases: ['kotlett'], popularity: 6 },
  { name: 'oxfilé', category: 'kott-fisk', aliases: ['biff'], popularity: 6 },
  { name: 'entrecote', category: 'kott-fisk', popularity: 5 },
  { name: 'korv', category: 'kott-fisk', aliases: ['prinskorv', 'isterband'], popularity: 8 },
  { name: 'falukorv', category: 'kott-fisk', popularity: 9 },
  { name: 'bratwurst', category: 'kott-fisk', aliases: ['grillkorv'], popularity: 6 },
  { name: 'hamburgare', category: 'kott-fisk', aliases: ['burgare', 'hamburgerkött'], popularity: 7 },
  { name: 'köttbullar', category: 'kott-fisk', popularity: 8 },
  { name: 'skinka', category: 'kott-fisk', aliases: ['kokt skinka', 'rökt skinka'], popularity: 8 },
  { name: 'leverpastej', category: 'kott-fisk', popularity: 6 },
  { name: 'salami', category: 'kott-fisk', popularity: 6 },
  { name: 'lax', category: 'kott-fisk', aliases: ['laxfilé', 'gravad lax'], popularity: 9 },
  { name: 'torsk', category: 'kott-fisk', aliases: ['torskfilé'], popularity: 7 },
  { name: 'sej', category: 'kott-fisk', aliases: ['sejfilé'], popularity: 6 },
  { name: 'räkor', category: 'kott-fisk', aliases: ['skalade räkor'], popularity: 7 },
  { name: 'tonfisk', category: 'kott-fisk', aliases: ['tonfisk i vatten'], popularity: 7 },
  { name: 'fiskpinnar', category: 'kott-fisk', popularity: 6 },
  { name: 'kräftor', category: 'kott-fisk', popularity: 4 },
  { name: 'sill', category: 'kott-fisk', aliases: ['inlagd sill'], popularity: 6 },
  
  // SKAFFERI
  { name: 'pasta', category: 'skafferi', aliases: ['makaroner', 'spagetti', 'penne'], popularity: 10 },
  { name: 'ris', category: 'skafferi', aliases: ['jasminris', 'basmatiris'], popularity: 9 },
  { name: 'potatisgratäng', category: 'skafferi', popularity: 5 },
  { name: 'mjöl', category: 'skafferi', aliases: ['vetemjöl'], popularity: 8 },
  { name: 'socker', category: 'skafferi', aliases: ['strösocker'], popularity: 8 },
  { name: 'salt', category: 'skafferi', popularity: 9 },
  { name: 'peppar', category: 'skafferi', aliases: ['svartpeppar'], popularity: 8 },
  { name: 'olja', category: 'skafferi', aliases: ['olivolja', 'rapsolja'], popularity: 9 },
  { name: 'vinäger', category: 'skafferi', aliases: ['ättika'], popularity: 5 },
  { name: 'ketchup', category: 'skafferi', popularity: 8 },
  { name: 'senap', category: 'skafferi', popularity: 7 },
  { name: 'majonnäs', category: 'skafferi', aliases: ['majonäs'], popularity: 7 },
  { name: 'soja', category: 'skafferi', aliases: ['sojasås'], popularity: 6 },
  { name: 'tomatpuré', category: 'skafferi', popularity: 7 },
  { name: 'krossade tomater', category: 'skafferi', popularity: 8 },
  { name: 'kokosmjölk', category: 'skafferi', popularity: 6 },
  { name: 'buljong', category: 'skafferi', aliases: ['buljongtärning', 'hönsbuljong'], popularity: 7 },
  { name: 'kryddor', category: 'skafferi', aliases: ['oregano', 'basilika', 'timjan'], popularity: 6 },
  { name: 'curry', category: 'skafferi', aliases: ['currypulver'], popularity: 6 },
  { name: 'kanel', category: 'skafferi', popularity: 5 },
  { name: 'vaniljsocker', category: 'skafferi', popularity: 6 },
  { name: 'bakpulver', category: 'skafferi', popularity: 5 },
  { name: 'jäst', category: 'skafferi', aliases: ['torrjäst'], popularity: 5 },
  { name: 'havregryn', category: 'skafferi', popularity: 8 },
  { name: 'müsli', category: 'skafferi', popularity: 6 },
  { name: 'cornflakes', category: 'skafferi', aliases: ['flingor'], popularity: 6 },
  { name: 'nötter', category: 'skafferi', aliases: ['cashewnötter', 'jordnötter'], popularity: 6 },
  { name: 'russin', category: 'skafferi', popularity: 4 },
  { name: 'sylt', category: 'skafferi', aliases: ['jordgubbssylt', 'hallonsylt'], popularity: 7 },
  { name: 'honung', category: 'skafferi', popularity: 6 },
  { name: 'nutella', category: 'skafferi', aliases: ['chokladkräm'], popularity: 6 },
  { name: 'jordnötssmör', category: 'skafferi', popularity: 5 },
  
  // BRÖD
  { name: 'bröd', category: 'brod', aliases: ['limpa', 'formbröd'], popularity: 10 },
  { name: 'rostbröd', category: 'brod', aliases: ['toastbröd'], popularity: 8 },
  { name: 'fullkornsbröd', category: 'brod', popularity: 7 },
  { name: 'rågbröd', category: 'brod', popularity: 6 },
  { name: 'knäckebröd', category: 'brod', popularity: 8 },
  { name: 'frallor', category: 'brod', aliases: ['fralla'], popularity: 7 },
  { name: 'korvbröd', category: 'brod', popularity: 6 },
  { name: 'hamburgerbröd', category: 'brod', popularity: 6 },
  { name: 'pitabröd', category: 'brod', popularity: 6 },
  { name: 'tortilla', category: 'brod', aliases: ['tortillabröd', 'wraps'], popularity: 7 },
  { name: 'baguette', category: 'brod', popularity: 6 },
  { name: 'croissant', category: 'brod', aliases: ['croissanter'], popularity: 5 },
  { name: 'kanelbulle', category: 'brod', aliases: ['kanelbullar'], popularity: 7 },
  { name: 'wienerbröd', category: 'brod', popularity: 5 },
  
  // FRYS
  { name: 'glass', category: 'frys', aliases: ['vaniljglass', 'chokladglass'], popularity: 8 },
  { name: 'glasspinnar', category: 'frys', aliases: ['piggelin', 'magnum'], popularity: 7 },
  { name: 'frysta bär', category: 'frys', aliases: ['blåbär', 'hallon'], popularity: 6 },
  { name: 'fryspizza', category: 'frys', aliases: ['pizza'], popularity: 7 },
  { name: 'fiskpinnar', category: 'frys', popularity: 6 },
  { name: 'pommes frites', category: 'frys', aliases: ['pommes'], popularity: 7 },
  { name: 'grönsaker fryst', category: 'frys', aliases: ['wokgrönsaker'], popularity: 6 },
  { name: 'köttbullar fryst', category: 'frys', popularity: 6 },
  { name: 'vårrullar', category: 'frys', popularity: 5 },
  { name: 'piroger', category: 'frys', popularity: 5 },
  
  // DRYCK
  { name: 'juice', category: 'dryck', aliases: ['apelsinjuice', 'äppeljuice'], popularity: 8 },
  { name: 'läsk', category: 'dryck', aliases: ['coca cola', 'pepsi', 'fanta'], popularity: 7 },
  { name: 'vatten', category: 'dryck', aliases: ['mineralvatten', 'kolsyrat vatten'], popularity: 9 },
  { name: 'öl', category: 'dryck', aliases: ['lättöl', 'folköl'], popularity: 8 },
  { name: 'vin', category: 'dryck', aliases: ['rödvin', 'vitt vin'], popularity: 7 },
  { name: 'kaffe', category: 'dryck', popularity: 10 },
  { name: 'te', category: 'dryck', aliases: ['grönt te', 'svart te'], popularity: 7 },
  { name: 'kakao', category: 'dryck', aliases: ['oboy', 'chokladdryck'], popularity: 6 },
  { name: 'saft', category: 'dryck', aliases: ['hallonsaft', 'flädersaft'], popularity: 7 },
  { name: 'energidryck', category: 'dryck', aliases: ['red bull', 'monster'], popularity: 5 },
  { name: 'sportdryck', category: 'dryck', aliases: ['gatorade', 'powerade'], popularity: 4 },
  
  // GODIS & SNACKS
  { name: 'godis', category: 'godis-snacks', aliases: ['lösgodis', 'lördagsgodis'], popularity: 8 },
  { name: 'choklad', category: 'godis-snacks', aliases: ['marabou', 'fazer'], popularity: 9 },
  { name: 'chips', category: 'godis-snacks', aliases: ['potatischips', 'sourcream'], popularity: 8 },
  { name: 'popcorn', category: 'godis-snacks', popularity: 6 },
  { name: 'nötter', category: 'godis-snacks', aliases: ['jordnötter', 'cashewnötter'], popularity: 6 },
  { name: 'kex', category: 'godis-snacks', aliases: ['digestive', 'marie'], popularity: 7 },
  { name: 'kakor', category: 'godis-snacks', aliases: ['ballerina', 'oreo'], popularity: 7 },
  { name: 'tuggummi', category: 'godis-snacks', popularity: 5 },
  { name: 'pastiller', category: 'godis-snacks', aliases: ['läkerol', 'mentos'], popularity: 5 },
  
  // HYGIEN
  { name: 'tandkräm', category: 'hygien', popularity: 9 },
  { name: 'tandborste', category: 'hygien', popularity: 8 },
  { name: 'schampo', category: 'hygien', popularity: 9 },
  { name: 'balsam', category: 'hygien', popularity: 8 },
  { name: 'tvål', category: 'hygien', aliases: ['handtvål'], popularity: 9 },
  { name: 'duschkräm', category: 'hygien', aliases: ['duschgel', 'duschtvål'], popularity: 8 },
  { name: 'deo', category: 'hygien', aliases: ['deodorant'], popularity: 8 },
  { name: 'raklödder', category: 'hygien', aliases: ['rakskum'], popularity: 6 },
  { name: 'rakhyvlar', category: 'hygien', popularity: 6 },
  { name: 'bindor', category: 'hygien', popularity: 7 },
  { name: 'tamponger', category: 'hygien', popularity: 7 },
  { name: 'toapapper', category: 'hygien', aliases: ['toalettpapper'], popularity: 10 },
  { name: 'hushållspapper', category: 'hygien', popularity: 9 },
  { name: 'näsdukar', category: 'hygien', aliases: ['pappersnäsdukar'], popularity: 7 },
  { name: 'våtservetter', category: 'hygien', popularity: 6 },
  { name: 'bomullstops', category: 'hygien', aliases: ['tops'], popularity: 6 },
  { name: 'plåster', category: 'hygien', popularity: 7 },
  { name: 'solkräm', category: 'hygien', popularity: 5 },
  
  // STÄD
  { name: 'diskmedel', category: 'stad', popularity: 9 },
  { name: 'disktabletter', category: 'stad', aliases: ['maskindisktabletter'], popularity: 8 },
  { name: 'allrengöring', category: 'stad', aliases: ['ajax', 'mr muscle'], popularity: 8 },
  { name: 'fönsterputs', category: 'stad', popularity: 6 },
  { name: 'toalettrengöring', category: 'stad', popularity: 7 },
  { name: 'tvättmedel', category: 'stad', aliases: ['tvättmedelspulver'], popularity: 9 },
  { name: 'sköljmedel', category: 'stad', popularity: 7 },
  { name: 'disktrasa', category: 'stad', aliases: ['disktrasor'], popularity: 7 },
  { name: 'svamp', category: 'stad', aliases: ['disksvamp'], popularity: 7 },
  { name: 'diskborste', category: 'stad', popularity: 6 },
  { name: 'soppåsar', category: 'stad', aliases: ['sopsäckar'], popularity: 9 },
  { name: 'fryspåsar', category: 'stad', popularity: 7 },
  { name: 'gladpack', category: 'stad', aliases: ['plastfolie'], popularity: 6 },
  { name: 'aluminiumfolie', category: 'stad', popularity: 6 },
  { name: 'bakplåtspapper', category: 'stad', popularity: 7 },
  
  // HUSDJUR
  { name: 'hundfoder', category: 'husdjur', aliases: ['torrfoder hund'], popularity: 8 },
  { name: 'kattfoder', category: 'husdjur', aliases: ['torrfoder katt'], popularity: 8 },
  { name: 'kattströ', category: 'husdjur', aliases: ['kattsand'], popularity: 9 },
  { name: 'hundgodis', category: 'husdjur', popularity: 6 },
  { name: 'kattgodis', category: 'husdjur', popularity: 6 },
  { name: 'hundleksak', category: 'husdjur', popularity: 5 },
  { name: 'kattleksak', category: 'husdjur', popularity: 5 },
  
  // ÖVRIGT
  { name: 'batterier', category: 'ovrigt', aliases: ['aa', 'aaa'], popularity: 7 },
  { name: 'glödlampor', category: 'ovrigt', aliases: ['led-lampa'], popularity: 6 },
  { name: 'ljus', category: 'ovrigt', aliases: ['värmeljus', 'kronljus'], popularity: 6 },
  { name: 'tändare', category: 'ovrigt', popularity: 5 },
  { name: 'paraply', category: 'ovrigt', popularity: 4 },
  { name: 'blomma', category: 'ovrigt', aliases: ['blommor', 'bukett'], popularity: 5 },
];

// Funktion för att få populära produkter (för initial visning)
export function getPopularProducts(limit = 10): Product[] {
  return [...PRODUCT_DATABASE]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit);
}

// Funktion för att hitta kategori för en produkt
export function getCategoryForProduct(productName: string): string {
  const normalizedName = productName.toLowerCase().trim();
  const product = PRODUCT_DATABASE.find(p => 
    p.name.toLowerCase() === normalizedName ||
    p.aliases?.some(alias => alias.toLowerCase() === normalizedName)
  );
  
  return product?.category || 'ovrigt';
}

// Funktion för att få alla produkter i en kategori
export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCT_DATABASE.filter(p => p.category === categoryId);
}

// Export för användning i autocomplete
export default PRODUCT_DATABASE;