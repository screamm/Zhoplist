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
  { id: 'frukt', name: 'Frukt', icon: '🍎', order: 2, removable: true },
  { id: 'vegetables', name: 'Grönsaker', icon: '🥕', order: 3, removable: true },
  { id: 'meat', name: 'Kött', icon: '🥩', order: 4, removable: true },
  { id: 'fish', name: 'Fisk', icon: '🐟', order: 5, removable: true },
  { id: 'skafferi', name: 'Skafferi', icon: '🥫', order: 6, removable: true },
  { id: 'brod', name: 'Bröd', icon: '🍞', order: 7, removable: true },
  { id: 'frys', name: 'Frys', icon: '❄️', order: 8, removable: true },
  { id: 'dryck', name: 'Dryck', icon: '🥤', order: 9, removable: true },
  { id: 'godis-snacks', name: 'Godis & Snacks', icon: '🍬', order: 10, removable: true },
  { id: 'hygien', name: 'Hygien', icon: '🧼', order: 11, removable: true },
  { id: 'stad', name: 'Städ', icon: '🧹', order: 12, removable: true },
  { id: 'husdjur', name: 'Husdjur', icon: '🐕', order: 13, removable: true },
  { id: 'ovrigt', name: 'Övrigt', icon: '📦', order: 14, removable: false }, // Kan inte tas bort
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
  
  // Fler mejeriprodukter som ofta saknas
  { name: 'philadelphia', category: 'mejeri', aliases: ['gräddsot', 'cream cheese'], popularity: 7 },
  { name: 'mascarpone', category: 'mejeri', popularity: 5 },
  { name: 'ricotta', category: 'mejeri', popularity: 4 },
  { name: 'gorgonzola', category: 'mejeri', popularity: 4 },
  { name: 'brie', category: 'mejeri', popularity: 5 },
  { name: 'camembert', category: 'mejeri', popularity: 5 },
  { name: 'gouda', category: 'mejeri', popularity: 5 },
  { name: 'cheddar', category: 'mejeri', popularity: 6 },
  { name: 'getost', category: 'mejeri', aliases: ['chevrotin'], popularity: 4 },
  { name: 'halloumi', category: 'mejeri', popularity: 6 },
  { name: 'grekisk yoghurt', category: 'mejeri', aliases: ['turkisk yoghurt'], popularity: 8 },
  { name: 'naturell yoghurt', category: 'mejeri', popularity: 7 },
  { name: 'vaniljyoghurt', category: 'mejeri', popularity: 6 },
  { name: 'kesam', category: 'mejeri', popularity: 5 },
  { name: 'mjölkdryck', category: 'mejeri', aliases: ['arla ko', 'o boy'], popularity: 5 },
  { name: 'glass', category: 'mejeri', aliases: ['vaniljglass'], popularity: 7 },
  
  // FRUKT
  { name: 'äpple', category: 'frukt', aliases: ['äpplen'], popularity: 9 },
  { name: 'banan', category: 'frukt', aliases: ['bananer'], popularity: 10 },
  { name: 'apelsin', category: 'frukt', aliases: ['apelsiner'], popularity: 8 },
  { name: 'clementin', category: 'frukt', aliases: ['clementiner'], popularity: 7 },
  { name: 'päron', category: 'frukt', popularity: 6 },
  { name: 'vindruvor', category: 'frukt', aliases: ['druvor'], popularity: 7 },
  { name: 'jordgubbar', category: 'frukt', popularity: 8 },
  { name: 'blåbär', category: 'frukt', popularity: 7 },
  { name: 'hallon', category: 'frukt', popularity: 6 },
  { name: 'mango', category: 'frukt', popularity: 6 },
  { name: 'ananas', category: 'frukt', popularity: 5 },
  { name: 'kiwi', category: 'frukt', popularity: 5 },
  { name: 'avokado', category: 'vegetables', aliases: ['avokador'], popularity: 8 },
  { name: 'tomat', category: 'vegetables', aliases: ['tomater'], popularity: 10 },
  { name: 'körsbärstomater', category: 'vegetables', popularity: 7 },
  { name: 'gurka', category: 'vegetables', aliases: ['gurkor'], popularity: 9 },
  { name: 'paprika', category: 'vegetables', aliases: ['paprikor'], popularity: 9 },
  { name: 'lök', category: 'vegetables', aliases: ['gul lök', 'lökar'], popularity: 10 },
  { name: 'rödlök', category: 'vegetables', popularity: 7 },
  { name: 'vitlök', category: 'vegetables', popularity: 9 },
  { name: 'potatis', category: 'vegetables', aliases: ['potatisar'], popularity: 10 },
  { name: 'morötter', category: 'vegetables', aliases: ['morot'], popularity: 9 },
  { name: 'broccoli', category: 'vegetables', popularity: 7 },
  { name: 'blomkål', category: 'vegetables', popularity: 6 },
  { name: 'sallad', category: 'vegetables', aliases: ['isbergssallad', 'huvudsallad'], popularity: 8 },
  { name: 'spenat', category: 'vegetables', aliases: ['babyspenat'], popularity: 6 },
  { name: 'ruccola', category: 'vegetables', aliases: ['arugula'], popularity: 5 },
  { name: 'champinjoner', category: 'vegetables', aliases: ['svamp'], popularity: 7 },
  { name: 'zucchini', category: 'vegetables', aliases: ['squash'], popularity: 5 },
  { name: 'aubergine', category: 'vegetables', popularity: 4 },
  { name: 'ingefära', category: 'vegetables', popularity: 6 },
  { name: 'citron', category: 'frukt', aliases: ['citroner'], popularity: 7 },
  { name: 'lime', category: 'frukt', popularity: 6 },
  { name: 'persilja', category: 'vegetables', popularity: 6 },
  { name: 'dill', category: 'vegetables', popularity: 7 },
  { name: 'basilika', category: 'vegetables', popularity: 5 },
  
  // Fler grönsaker som ofta saknas
  { name: 'majs', category: 'vegetables', aliases: ['majskolvar', 'kornmajskolvar'], popularity: 7 },
  { name: 'majskorn', category: 'vegetables', aliases: ['majs konserv', 'konservmajskorn'], popularity: 8 },
  { name: 'ärtor', category: 'vegetables', aliases: ['gröna ärtor'], popularity: 7 },
  { name: 'bönor', category: 'vegetables', aliases: ['gröna bönor', 'haricots verts'], popularity: 6 },
  { name: 'kidneybönor', category: 'vegetables', aliases: ['röda bönor'], popularity: 6 },
  { name: 'svarta bönor', category: 'vegetables', popularity: 5 },
  { name: 'kikärtor', category: 'vegetables', aliases: ['chickpeas'], popularity: 6 },
  { name: 'linser', category: 'vegetables', aliases: ['röda linser', 'gröna linser'], popularity: 6 },
  { name: 'selleri', category: 'vegetables', aliases: ['selleristjälkar'], popularity: 5 },
  { name: 'fänkål', category: 'vegetables', popularity: 4 },
  { name: 'palsternacka', category: 'vegetables', popularity: 4 },
  { name: 'rättika', category: 'vegetables', aliases: ['rädisor'], popularity: 5 },
  { name: 'rödbetor', category: 'vegetables', aliases: ['rödkål'], popularity: 5 },
  { name: 'vitkål', category: 'vegetables', popularity: 6 },
  { name: 'rödkål', category: 'vegetables', popularity: 5 },
  { name: 'kålrabbi', category: 'vegetables', popularity: 4 },
  { name: 'purjolök', category: 'vegetables', aliases: ['purjo'], popularity: 5 },
  { name: 'schalottenlök', category: 'vegetables', aliases: ['schalotter'], popularity: 4 },
  
  // Fler frukter 
  { name: 'melon', category: 'frukt', aliases: ['honungsmelon', 'vattenmelon'], popularity: 6 },
  { name: 'persika', category: 'frukt', aliases: ['persikor'], popularity: 5 },
  { name: 'plommon', category: 'frukt', popularity: 5 },
  { name: 'aprikos', category: 'frukt', aliases: ['aprikoser'], popularity: 4 },
  { name: 'körsbär', category: 'frukt', popularity: 5 },
  { name: 'granatäpple', category: 'frukt', popularity: 4 },
  { name: 'kokos', category: 'frukt', aliases: ['kokosnöt'], popularity: 4 },
  { name: 'dadlar', category: 'frukt', popularity: 4 },
  { name: 'fikon', category: 'frukt', popularity: 3 },
  
  // Kryddor & örter
  { name: 'oregano', category: 'vegetables', popularity: 5 },
  { name: 'timjan', category: 'vegetables', popularity: 4 },
  { name: 'rosmarin', category: 'vegetables', popularity: 4 },
  { name: 'salvia', category: 'vegetables', popularity: 3 },
  { name: 'mynta', category: 'vegetables', popularity: 4 },
  { name: 'koriander', category: 'vegetables', popularity: 5 },
  { name: 'gräslök', category: 'vegetables', popularity: 6 },
  
  // KÖTT
  { name: 'köttfärs', category: 'meat', aliases: ['färs', 'blandfärs'], popularity: 10 },
  { name: 'nötfärs', category: 'meat', popularity: 8 },
  { name: 'fläskfärs', category: 'meat', popularity: 6 },
  { name: 'kyckling', category: 'meat', aliases: ['kycklingfilé', 'kycklingbröst'], popularity: 10 },
  { name: 'kycklinglår', category: 'meat', popularity: 7 },
  { name: 'bacon', category: 'meat', popularity: 8 },
  { name: 'fläskfilé', category: 'meat', popularity: 7 },
  { name: 'fläskkotlett', category: 'meat', aliases: ['kotlett'], popularity: 6 },
  { name: 'oxfilé', category: 'meat', aliases: ['biff'], popularity: 6 },
  { name: 'entrecote', category: 'meat', popularity: 5 },
  { name: 'korv', category: 'meat', aliases: ['prinskorv', 'isterband'], popularity: 8 },
  { name: 'falukorv', category: 'meat', popularity: 9 },
  { name: 'bratwurst', category: 'meat', aliases: ['grillkorv'], popularity: 6 },
  { name: 'hamburgare', category: 'meat', aliases: ['burgare', 'hamburgerkött'], popularity: 7 },
  { name: 'köttbullar', category: 'meat', popularity: 8 },
  { name: 'skinka', category: 'meat', aliases: ['kokt skinka', 'rökt skinka'], popularity: 8 },
  { name: 'leverpastej', category: 'meat', popularity: 6 },
  { name: 'salami', category: 'meat', popularity: 6 },

  // FISK
  { name: 'lax', category: 'fish', aliases: ['laxfilé', 'gravad lax'], popularity: 9 },
  { name: 'torsk', category: 'fish', aliases: ['torskfilé'], popularity: 7 },
  { name: 'sej', category: 'fish', aliases: ['sejfilé'], popularity: 6 },
  { name: 'räkor', category: 'fish', aliases: ['skalade räkor'], popularity: 7 },
  { name: 'tonfisk', category: 'fish', aliases: ['tonfisk i vatten'], popularity: 7 },
  { name: 'fiskpinnar', category: 'fish', popularity: 6 },
  { name: 'kräftor', category: 'fish', popularity: 4 },
  { name: 'sill', category: 'fish', aliases: ['inlagd sill'], popularity: 6 },
  
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
  
  // Fler skafferi-produkter som ofta saknas
  { name: 'quinoa', category: 'skafferi', popularity: 6 },
  { name: 'bulgur', category: 'skafferi', popularity: 5 },
  { name: 'couscous', category: 'skafferi', popularity: 5 },
  { name: 'linser torra', category: 'skafferi', aliases: ['torkade linser'], popularity: 5 },
  { name: 'bönor torra', category: 'skafferi', aliases: ['torkade bönor'], popularity: 4 },
  { name: 'mandelmjöl', category: 'skafferi', popularity: 4 },
  { name: 'kokosmjöl', category: 'skafferi', popularity: 3 },
  { name: 'havremjöl', category: 'skafferi', popularity: 4 },
  { name: 'potatismjöl', category: 'skafferi', aliases: ['potatisstärkelse'], popularity: 4 },
  { name: 'maizena', category: 'skafferi', aliases: ['majsstärkelse'], popularity: 5 },
  { name: 'panko', category: 'skafferi', aliases: ['pankoströbröd'], popularity: 4 },
  { name: 'ströbröd', category: 'skafferi', popularity: 5 },
  { name: 'sesam', category: 'skafferi', aliases: ['sesamfrön'], popularity: 4 },
  { name: 'solrosfrön', category: 'skafferi', popularity: 5 },
  { name: 'pumpafrön', category: 'skafferi', popularity: 4 },
  { name: 'chiafrön', category: 'skafferi', popularity: 5 },
  { name: 'linfrön', category: 'skafferi', popularity: 4 },
  { name: 'kokosolja', category: 'skafferi', popularity: 5 },
  { name: 'sesamolja', category: 'skafferi', popularity: 4 },
  { name: 'chili', category: 'skafferi', aliases: ['chilipulver', 'cayennepeppar'], popularity: 6 },
  { name: 'paprikapulver', category: 'skafferi', popularity: 6 },
  { name: 'vitpeppar', category: 'skafferi', popularity: 4 },
  { name: 'lagerblad', category: 'skafferi', popularity: 4 },
  { name: 'kryddnejlika', category: 'skafferi', popularity: 3 },
  { name: 'kardemumma', category: 'skafferi', popularity: 4 },
  { name: 'ingefära pulver', category: 'skafferi', popularity: 4 },
  { name: 'gurkmeja', category: 'skafferi', aliases: ['turmeric'], popularity: 5 },
  { name: 'spiskummin', category: 'skafferi', aliases: ['kummin'], popularity: 4 },
  { name: 'koriander frön', category: 'skafferi', popularity: 4 },
  { name: 'fänkålsfrön', category: 'skafferi', popularity: 3 },
  { name: 'fisksås', category: 'skafferi', popularity: 4 },
  { name: 'ostronsås', category: 'skafferi', popularity: 4 },
  { name: 'worcestersås', category: 'skafferi', popularity: 5 },
  { name: 'tabasco', category: 'skafferi', aliases: ['hettsås'], popularity: 5 },
  { name: 'sriracha', category: 'skafferi', popularity: 5 },
  { name: 'sambal oelek', category: 'skafferi', popularity: 5 },
  { name: 'miso', category: 'skafferi', aliases: ['misopasta'], popularity: 4 },
  { name: 'tahini', category: 'skafferi', aliases: ['sesampasta'], popularity: 4 },
  { name: 'kokosgrädde', category: 'skafferi', popularity: 5 },
  { name: 'kondenserad mjölk', category: 'skafferi', popularity: 4 },
  { name: 'mandelmjölk', category: 'skafferi', popularity: 6 },
  { name: 'sojamjölk', category: 'skafferi', popularity: 5 },
  { name: 'rismjölk', category: 'skafferi', popularity: 4 },
  
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
  
  // Fler drycker som ofta saknas
  { name: 'kombucha', category: 'dryck', popularity: 5 },
  { name: 'kvass', category: 'dryck', popularity: 3 },
  { name: 'smoothie', category: 'dryck', popularity: 6 },
  { name: 'protein shake', category: 'dryck', aliases: ['proteinshake'], popularity: 5 },
  { name: 'kokosnötsvatten', category: 'dryck', aliases: ['kokosvatten'], popularity: 4 },
  { name: 'aloe vera', category: 'dryck', aliases: ['aloedryck'], popularity: 4 },
  { name: 'mandelmjölk', category: 'dryck', popularity: 6 },
  { name: 'chai latte', category: 'dryck', aliases: ['chai te'], popularity: 5 },
  { name: 'bubble tea', category: 'dryck', popularity: 4 },
  { name: 'glögg', category: 'dryck', popularity: 4 },
  { name: 'soda', category: 'dryck', aliases: ['mineralvatten kolsyrat'], popularity: 7 },
  { name: 'tonic', category: 'dryck', aliases: ['tonic water'], popularity: 5 },
  { name: 'must', category: 'dryck', aliases: ['julmust', 'påskmust'], popularity: 6 },
  
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
  
  // Fler snacks som ofta saknas
  { name: 'crackers', category: 'godis-snacks', aliases: ['tuc', 'ritz'], popularity: 6 },
  { name: 'müslibars', category: 'godis-snacks', aliases: ['proteinbars', 'energibars'], popularity: 6 },
  { name: 'torkad frukt', category: 'godis-snacks', aliases: ['russin', 'dadlar'], popularity: 5 },
  { name: 'fruktgodis', category: 'godis-snacks', aliases: ['haribo', 'ahlgrens bilar'], popularity: 7 },
  { name: 'marshmallows', category: 'godis-snacks', popularity: 4 },
  { name: 'gelato', category: 'godis-snacks', aliases: ['sorbet', 'fruktglass'], popularity: 5 },
  { name: 'chokladkaka', category: 'godis-snacks', aliases: ['kitkat', 'snickers'], popularity: 8 },
  
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