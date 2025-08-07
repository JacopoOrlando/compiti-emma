// Defines the structure for a single game's content
export interface GameContent {
  matching?: Array<{ left: string; right: string; emoji?: string; leftEmoji?: string }>;
  memory?: Array<{ content: string; emoji: string }>;
  timed?: Array<{
    question: string;
    options: string[];
    correct: number;
    points: number;
    timeLimit: number;
  }>;
}

// Defines the structure for a sub-topic, including its title, description, game type, and content
export interface TopicContent {
  title: string;
  description: string;
  gameType: 'matching' | 'memory' | 'timed'; // Add other creative game types here
  content: GameContent;
}

// The main data map for the entire application
export const gameContentMap: Record<string, Record<string, TopicContent>> = {
  // ================================================================================= //
  // ================================= ITALIANO ================================== //
  // ================================================================================= //
  italiano: {
    "1-suoni-difficili": {
      title: "Ortografia: Suoni Difficili",
      description: "Completa le parole con CQU, GLI, GN.",
      gameType: 'timed',
      content: {
        timed: [
          { question: "Completa la parola: a...a", options: ["cqu", "cu", "qu"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: fo...a", options: ["glia", "lia", "gla"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: ra...o", options: ["gno", "nio", "no"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: ma...era", options: ["nni", "ni", "gni"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: ba...o", options: ["gno", "njo", "nio"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: sco...o", options: ["gli", "li", "glio"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: a...ila", options: ["qu", "cu", "cqu"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: so...are", options: ["gn", "gni", "ni"], correct: 0, points: 10, timeLimit: 10 },
        ]
      }
    },
    "2-doppie": {
      title: "Ortografia: Le Doppie",
      description: "Trova le parole scritte correttamente.",
      gameType: 'matching',
      content: {
        matching: [
            { left: "pala", right: "palla", emoji: "⚽" },
            { left: "capello", right: "cappello", emoji: "👒" },
            { left: "caro", right: "carro", emoji: "🛒" },
            { left: "nono", right: "nonno", emoji: "👴" },
            { left: "belo", right: "bello", emoji: "😍" },
            { left: "casa", right: "cassa", emoji: "📦" },
            { left: "nota", right: "notte", emoji: "🌙" },
            { left: "sete", right: "sette", emoji: "7️⃣" },
            { left: "papa", right: "papà", emoji: "👨" },
            { left: "mamma", right: "mamma", emoji: "👩" },
        ]
      }
    },
     "3-comprensione": {
      title: "Lettura e Comprensione",
      description: "Leggi la favola e rispondi.",
      gameType: 'timed',
      content: {
          timed: [
              { question: "La volpe voleva mangiare...", options: ["il formaggio", "l'uva", "una mela"], correct: 1, points: 10, timeLimit: 20 },
              { question: "Perché la volpe dice 'l'uva è acerba'?", options: ["Perché non le piace", "Perché non riesce a prenderla", "Perché è troppo dolce"], correct: 1, points: 10, timeLimit: 20 },
              { question: "Cappuccetto Rosso dove andava?", options: ["A scuola", "Dalla nonna", "Al mercato"], correct: 1, points: 10, timeLimit: 20 },
              { question: "Chi incontra nel bosco?", options: ["Il lupo", "Un orso", "Un coniglio"], correct: 0, points: 10, timeLimit: 20 },
              { question: "I tre porcellini costruiscono case di...", options: ["paglia, legno, mattoni", "carta, plastica, vetro", "sabbia, terra, rocce"], correct: 0, points: 10, timeLimit: 20 },
              { question: "Quale casa resiste al lupo?", options: ["Di paglia", "Di legno", "Di mattoni"], correct: 2, points: 10, timeLimit: 20 },
          ]
      }
    },
    "4-grammatica": {
      title: "Grammatica: Nomi e Articoli",
      description: "Associa il nome al suo articolo corretto.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "Il", right: "cane", emoji: "🐕", leftEmoji: "" },
          { left: "La", right: "casa", emoji: "🏠", leftEmoji: "" },
          { left: "Lo", right: "zaino", emoji: "🎒", leftEmoji: "" },
          { left: "Il", right: "gatto", emoji: "🐱", leftEmoji: "" },
          { left: "La", right: "penna", emoji: "🖊️", leftEmoji: "" },
          { left: "Lo", right: "specchio", emoji: "🪞", leftEmoji: "" },
          { left: "Il", right: "tavolo", emoji: "🪑", leftEmoji: "" },
          { left: "La", right: "scuola", emoji: "🏫", leftEmoji: "" },
          { left: "Lo", right: "zucchero", emoji: "🍯", leftEmoji: "" },
          { left: "Il", right: "libro", emoji: "📚", leftEmoji: "" },
          { left: "La", right: "macchina", emoji: "🚗", leftEmoji: "" },
          { left: "Lo", right: "stadio", emoji: "🏟️", leftEmoji: "" },
        ]
      }
    },
  },
  // ================================================================================= //
  // ================================= MATEMATICA ================================ //
  // ================================================================================= //
  matematica: {
    "1-problemi": {
      title: "Problemi con Addizioni/Sottrazioni",
      description: "Risolvi i problemi dello gnomo.",
      gameType: 'timed',
      content: {
        timed: [
            { question: "Marco ha 5 mele. Ne mangia 2. Quante ne restano?", options: ["2", "3", "5"], correct: 1, points: 10, timeLimit: 15 },
            { question: "Ci sono 7 uccelli. Ne arrivano altri 4. Quanti sono ora?", options: ["10", "11", "12"], correct: 1, points: 10, timeLimit: 15 },
            { question: "Lucia ha 8 caramelle. Ne regala 3 alla sorella. Quante ne tiene?", options: ["5", "6", "11"], correct: 0, points: 10, timeLimit: 15 },
            { question: "In giardino ci sono 6 fiori. Ne sbocciano altri 4. Quanti fiori in totale?", options: ["9", "10", "2"], correct: 1, points: 10, timeLimit: 15 },
            { question: "Paolo ha 12 figurine. Ne perde 4. Quante ne rimangono?", options: ["8", "16", "7"], correct: 0, points: 10, timeLimit: 15 },
            { question: "Nel prato corrono 9 conigli. Ne arrivano altri 3. Quanti conigli ora?", options: ["11", "12", "6"], correct: 1, points: 10, timeLimit: 15 },
            { question: "Anna ha 15 adesivi. Ne usa 7. Quanti ne restano?", options: ["8", "9", "22"], correct: 0, points: 10, timeLimit: 15 },
            { question: "In classe ci sono 18 bambini. Ne escono 5. Quanti rimangono?", options: ["13", "14", "23"], correct: 0, points: 10, timeLimit: 15 },
            { question: "Tom ha 20 carte. Ne regala 6. Quante ne tiene?", options: ["14", "15", "26"], correct: 0, points: 10, timeLimit: 15 },
            { question: "Nel vaso ci sono 11 fiori. Ne aggiungi 8. Quanti fiori ora?", options: ["19", "20", "3"], correct: 0, points: 10, timeLimit: 15 },
        ]
      }
    },
    "2-geometria": {
      title: "Geometria: Figure Piane",
      description: "Riconosci le figure piane.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "Quadrato", right: "🟦🟦🟦\n🟦🟦🟦\n🟦🟦🟦", emoji: "📐", leftEmoji: "" },
          { left: "Triangolo", right: "🔺🔺🔺\n🔺🔺🔺", emoji: "📐", leftEmoji: "" },
          { left: "Cerchio", right: "⚫⚫⚫\n⚫⚫⚫\n⚫⚫⚫", emoji: "📐", leftEmoji: "" },
          { left: "Rettangolo", right: "🟩🟩🟩🟩\n🟩🟩🟩🟩", emoji: "📐", leftEmoji: "" },
          { left: "Rombo", right: "🔶🔶\n🔶🔶🔶\n🔶🔶", emoji: "📐", leftEmoji: "" },
          { left: "Pentagono", right: "⭐⭐⭐\n⭐⭐⭐⭐\n⭐⭐⭐", emoji: "📐", leftEmoji: "" },
        ]
      }
    },
    "3-numeri-100": {
        title: "Numeri fino a 100",
        description: "Componi e scomponi i numeri.",
        gameType: 'timed',
        content: {
            timed: [
                { question: "Quante decine ci sono in 73?", options: ["3", "7", "10"], correct: 1, points: 10, timeLimit: 10 },
                { question: "3 da e 5 u formano il numero...", options: ["35", "53", "305"], correct: 0, points: 10, timeLimit: 10 },
                { question: "Quante unità ci sono in 46?", options: ["4", "6", "10"], correct: 1, points: 10, timeLimit: 10 },
                { question: "8 da e 2 u formano il numero...", options: ["28", "82", "208"], correct: 1, points: 10, timeLimit: 10 },
                { question: "Il numero 95 è formato da...", options: ["9 da e 5 u", "5 da e 9 u", "9 u e 5 da"], correct: 0, points: 10, timeLimit: 10 },
                { question: "Quante decine ci sono in 100?", options: ["10", "1", "100"], correct: 0, points: 10, timeLimit: 10 },
            ]
        }
    },
    "4-tabellina-2": {
      title: "Tabellina del 2",
      description: "Rispondi velocemente!",
      gameType: 'timed',
      content: { 
        timed: [ 
          { question: "2 x 3 = ?", options: ["4", "6", "8"], correct: 1, points: 10, timeLimit: 5 },
          { question: "2 x 5 = ?", options: ["8", "10", "12"], correct: 1, points: 10, timeLimit: 5 },
          { question: "2 x 7 = ?", options: ["12", "14", "16"], correct: 1, points: 10, timeLimit: 5 },
          { question: "2 x 4 = ?", options: ["6", "8", "10"], correct: 1, points: 10, timeLimit: 5 },
          { question: "2 x 6 = ?", options: ["10", "12", "14"], correct: 1, points: 10, timeLimit: 5 },
          { question: "2 x 8 = ?", options: ["14", "16", "18"], correct: 1, points: 10, timeLimit: 5 },
          { question: "2 x 9 = ?", options: ["16", "18", "20"], correct: 1, points: 10, timeLimit: 5 },
          { question: "2 x 10 = ?", options: ["18", "20", "22"], correct: 1, points: 10, timeLimit: 5 },
        ] 
      }
    },
  },
  // ================================================================================= //
  // ================================== ENGLISH ================================== //
  // ================================================================================= //
  english: {
    "1-animals-colors": {
      title: "Vocabulary: Animals & Colors",
      description: "Find the right animal or color.",
      gameType: 'timed',
      content: {
        timed: [
            { question: "Which one is the 'cat'?", options: ["🐶", "🐱", "🦁"], correct: 1, points: 10, timeLimit: 8 },
            { question: "What color is this? 🟥", options: ["Blue", "Red", "Green"], correct: 1, points: 10, timeLimit: 8 },
            { question: "Which one is the 'bird'?", options: ["🐸", "🦅", "🐟"], correct: 1, points: 10, timeLimit: 8 },
            { question: "What color is this? 🟦", options: ["Blue", "Red", "Yellow"], correct: 0, points: 10, timeLimit: 8 },
            { question: "Which one is the 'fish'?", options: ["🐠", "🦋", "🐞"], correct: 0, points: 10, timeLimit: 8 },
            { question: "What color is this? 🟨", options: ["Purple", "Green", "Yellow"], correct: 2, points: 10, timeLimit: 8 },
            { question: "Which one is the 'elephant'?", options: ["🐘", "🦏", "🦛"], correct: 0, points: 10, timeLimit: 8 },
            { question: "What color is this? 🟩", options: ["Orange", "Green", "Pink"], correct: 1, points: 10, timeLimit: 8 },
        ]
      }
    },
    "2-simple-sentences": {
      title: "Learn Basic Vocabulary",
      description: "Learn words and their meanings with interactive questions.",
      gameType: 'timed',
      content: {
        timed: [
          { question: "What does 'apple' mean?", options: ["🍎", "🍌", "🍊"], correct: 0, points: 10, timeLimit: 8 },
          { question: "What does 'dog' mean?", options: ["🐱", "🐶", "🐰"], correct: 1, points: 10, timeLimit: 8 },
          { question: "What does 'house' mean?", options: ["🏠", "🚗", "✈️"], correct: 0, points: 10, timeLimit: 8 },
          { question: "What does 'car' mean?", options: ["🚗", "🚲", "🛸"], correct: 0, points: 10, timeLimit: 8 },
          { question: "What does 'happy' mean?", options: ["😢", "😊", "😴"], correct: 1, points: 10, timeLimit: 8 },
          { question: "What does 'book' mean?", options: ["📚", "📱", "💻"], correct: 0, points: 10, timeLimit: 8 },
          { question: "What does 'sun' mean?", options: ["🌙", "⭐", "☀️"], correct: 2, points: 10, timeLimit: 8 },
          { question: "What does 'water' mean?", options: ["💧", "🔥", "🌪️"], correct: 0, points: 10, timeLimit: 8 },
          { question: "What does 'tree' mean?", options: ["🌳", "🌸", "🍄"], correct: 0, points: 10, timeLimit: 8 },
          { question: "What does 'ball' mean?", options: ["⚽", "🎮", "🎲"], correct: 0, points: 10, timeLimit: 8 },
        ]
      }
    },
  }
};

// Generate random game variant for variety with better randomization
export function getGameVariant(content: GameContent, gameType: string): GameContent {
  // Add timestamp to ensure different results each time
  const seed = Date.now() + Math.random();
  
  if (gameType === 'timed' && content.timed) {
    // Better shuffling algorithm
    const shuffled = [...content.timed];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((Math.sin(seed + i) + 1) * 0.5 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const variantSize = Math.min(8, shuffled.length); // Increased to 8 for more variety
    return { timed: shuffled.slice(0, variantSize) };
  }
  if (gameType === 'matching' && content.matching) {
    // Better shuffling for matching games
    const shuffled = [...content.matching];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((Math.sin(seed + i * 2) + 1) * 0.5 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { matching: shuffled };
  }
  if (gameType === 'memory' && content.memory) {
    const shuffled = [...content.memory];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((Math.sin(seed + i * 3) + 1) * 0.5 * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { memory: shuffled };
  }
  return content;
}

export function getGameContent(subject: string, topicId: string): TopicContent | null {
  const subjectContent = gameContentMap[subject?.toLowerCase()];
  if (!subjectContent) return null;
  
  const baseContent = subjectContent[topicId];
  if (!baseContent) return null;
  
  // Generate variant for variety
  const variantContent = getGameVariant(baseContent.content, baseContent.gameType);
  
  return {
    ...baseContent,
    content: variantContent
  };
}
