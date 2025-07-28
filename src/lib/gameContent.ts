// Defines the structure for a single game's content
export interface GameContent {
  matching?: Array<{ left: string; right: string; emoji?: string }>;
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
  gameType: 'matching' | 'memory' | 'timed' | 'story' | 'puzzle' | 'scene' | 'hunt';
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
      description: "Completa le parole con CQU, GLI, GN per svelare un'immagine magica.",
      gameType: 'timed', // Using TimedChallenge for this topic
      content: {
        timed: [
          { question: "Completa la parola: a...a", options: ["cqu", "cu", "qu"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: fo...a", options: ["glia", "lia", "gla"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: ra...o", options: ["gno", "nio", "no"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: ...aderno", options: ["qu", "cu"], correct: 0, points: 10, timeLimit: 10 },
          { question: "Completa la parola: pa...a", options: ["gli", "li"], correct: 0, points: 10, timeLimit: 10 },
        ]
      }
    },
    "2-doppie": {
      title: "Ortografia: Le Doppie",
      description: "Trova le parole scritte correttamente con le doppie.",
      gameType: 'matching', // Using MatchingGame for this topic
      content: {
        matching: [
            { left: "pala", right: "palla", emoji: " pala vs ⚽" },
            { left: "capello", right: "cappello", emoji: " capello vs 👒" },
            { left: "caro", right: "carro", emoji: " caro vs 🛒" },
            { left: "note", right: "notte", emoji: " 🎵 vs 🌙" },
        ]
      }
    },
     "3-comprensione": {
      title: "Lettura e Comprensione",
      description: "Leggi una breve favola e rispondi alle domande.",
      gameType: 'timed',
      content: {
          timed: [
              { question: "La volpe voleva mangiare...", options: ["il formaggio", "l'uva", "una mela"], correct: 1, points: 10, timeLimit: 20 },
              { question: "Perché la volpe dice 'l'uva è acerba'?", options: ["Perché non le piace", "Perché non riesce a prenderla", "Perché è troppo dolce"], correct: 1, points: 10, timeLimit: 20 },
          ]
      }
    },
    "4-grammatica": {
      title: "Grammatica: Nomi e Articoli",
      description: "Associa il nome al suo articolo corretto.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "Il", right: "cane", emoji: "🐕" },
          { left: "La", right: "casa", emoji: "🏠" },
          { left: "Lo", right: "zaino", emoji: "🎒" },
          { left: "L'", right: "ape", emoji: "🐝" },
        ]
      }
    },
    "5-frasi-minime": {
      title: "Scrivere Frasi Minime",
      description: "Unisci il soggetto e il verbo per formare una frase.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "Il bambino", right: "legge", emoji: "👦📖" },
          { left: "Il gatto", right: "dorme", emoji: "🐱💤" },
          { left: "La mamma", right: "cucina", emoji: "👩‍🍳🍳" },
          { left: "Il cane", right: "corre", emoji: "🐕💨" },
        ]
      }
    }
  },
  // ================================================================================= //
  // ================================= MATEMATICA ================================ //
  // ================================================================================= //
  matematica: {
    "1-problemi": {
      title: "Problemi con Addizioni/Sottrazioni",
      description: "Risolvi i problemi per aiutare lo gnomo nel suo negozio.",
      gameType: 'timed',
      content: {
        timed: [
            { question: "Marco ha 5 mele. Ne mangia 2. Quante ne restano?", options: ["2", "3", "5"], correct: 1, points: 10, timeLimit: 15 },
            { question: "Ci sono 7 uccelli. Ne arrivano altri 4. Quanti sono ora?", options: ["10", "11", "12"], correct: 1, points: 10, timeLimit: 15 },
        ]
      }
    },
    "2-geometria": {
      title: "Geometria: Figure Piane",
      description: "Riconosci le figure piane per costruire un castello.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "Quadrato", right: "🟥", emoji: " Castle Part" },
          { left: "Rettangolo", right: "🟦", emoji: " Castle Part" },
          { left: "Triangolo", right: "🔺", emoji: " Castle Part" },
          { left: "Cerchio", right: "⚫", emoji: " Castle Part" },
        ]
      }
    },
    "3-numeri-100": {
        title: "Numeri fino a 100",
        description: "Componi e scomponi i numeri in decine e unità.",
        gameType: 'timed',
        content: {
            timed: [
                { question: "Quante decine ci sono in 73?", options: ["3", "7", "10"], correct: 1, points: 10, timeLimit: 10 },
                { question: "3 da e 5 u formano il numero...", options: ["35", "53", "305"], correct: 0, points: 10, timeLimit: 10 },
            ]
        }
    },
    "4-tabellina-2": {
      title: "Tabellina del 2",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "2 x 3 = ?", options: ["4", "6", "8"], correct: 1, points: 10, timeLimit: 5 } ] }
    },
    "5-tabellina-3": {
      title: "Tabellina del 3",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "3 x 4 = ?", options: ["9", "12", "15"], correct: 1, points: 10, timeLimit: 5 } ] }
    },
    "6-tabellina-4": {
      title: "Tabellina del 4",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "4 x 5 = ?", options: ["16", "20", "24"], correct: 1, points: 10, timeLimit: 5 } ] }
    },
    "7-tabellina-5": {
      title: "Tabellina del 5",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "5 x 6 = ?", options: ["25", "30", "35"], correct: 1, points: 10, timeLimit: 5 } ] }
    },
    "8-tabellina-6": {
      title: "Tabellina del 6",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "6 x 7 = ?", options: ["36", "42", "48"], correct: 1, points: 10, timeLimit: 5 } ] }
    },
    "9-tabellina-7": {
      title: "Tabellina del 7",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "7 x 8 = ?", options: ["49", "56", "63"], correct: 1, points: 10, timeLimit: 5 } ] }
    },
    "10-tabellina-8": {
      title: "Tabellina del 8",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "8 x 9 = ?", options: ["64", "72", "80"], correct: 1, points: 10, timeLimit: 5 } ] }
    },
    "11-tabellina-9": {
      title: "Tabellina del 9",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "9 x 9 = ?", options: ["81", "90", "99"], correct: 0, points: 10, timeLimit: 5 } ] }
    },
    "12-tabellina-10": {
      title: "Tabellina del 10",
      description: "Rispondi velocemente per caricare il corno dell'unicorno!",
      gameType: 'timed',
      content: { timed: [ { question: "10 x 5 = ?", options: ["50", "100", "5"], correct: 0, points: 10, timeLimit: 5 } ] }
    }
  },
  // ================================================================================= //
  // ================================== ENGLISH ================================== //
  // ================================================================================= //
  english: {
    "1-animals-colors": {
      title: "Vocabulary: Animals & Colors",
      description: "Find the right animal or color in the picture.",
      gameType: 'timed',
      content: {
        timed: [
            { question: "Which one is the 'cat'?", options: ["🐶", "🐱", "🦁"], correct: 1, points: 10, timeLimit: 8 },
            { question: "What color is this? 🟥", options: ["Blue", "Red", "Green"], correct: 1, points: 10, timeLimit: 8 },
        ]
      }
    },
    "2-simple-sentences": {
      title: "Simple Sentences: I like...",
      description: "Match the sentence to the correct picture.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "I like apples", right: "👍🍎", emoji: "😊" },
          { left: "I have a dog", right: "🙋‍♂️🐕", emoji: "🐾" },
        ]
      }
    },
    "3-reading-story": {
      title: "Reading a Short Story",
      description: "Read a simple story and answer the questions.",
      gameType: 'timed',
      content: {
          timed: [
              { question: "The cat is on the...", options: ["mat", "dog", "hat"], correct: 0, points: 10, timeLimit: 15 },
          ]
      }
    },
  }
};

/**
 * Gets the game content for a specific subject, topic, and level.
 * @param subject The subject (e.g., 'matematica').
 * @param topicId The unique ID for the topic (e.g., '1-problemi').
 * @param level The level number (not used in this simplified structure but kept for compatibility).
 * @returns The TopicContent object or null if not found.
 */
export function getGameContent(subject: string, topicId: string, level: string): TopicContent | null {
  const subjectContent = gameContentMap[subject?.toLowerCase()];
  if (!subjectContent) return null;
  
  // In our new structure, topicId is the key, and level is not needed.
  return subjectContent[topicId] || null;
}
