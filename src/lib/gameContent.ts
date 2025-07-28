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
        ]
      }
    },
    "2-doppie": {
      title: "Ortografia: Le Doppie",
      description: "Trova le parole scritte correttamente.",
      gameType: 'matching',
      content: {
        matching: [
            { left: "pala", right: "palla", emoji: " pala vs ⚽" },
            { left: "capello", right: "cappello", emoji: " capello vs 👒" },
            { left: "caro", right: "carro", emoji: " caro vs 🛒" },
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
        ]
      }
    },
    "2-geometria": {
      title: "Geometria: Figure Piane",
      description: "Riconosci le figure piane.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "Quadrato", right: "🟥", emoji: "Figura" },
          { left: "Triangolo", right: "🔺", emoji: "Figura" },
          { left: "Cerchio", right: "⚫", emoji: "Figura" },
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
            ]
        }
    },
    "4-tabellina-2": {
      title: "Tabellina del 2",
      description: "Rispondi velocemente!",
      gameType: 'timed',
      content: { timed: [ { question: "2 x 3 = ?", options: ["4", "6", "8"], correct: 1, points: 10, timeLimit: 5 } ] }
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
        ]
      }
    },
    "2-simple-sentences": {
      title: "Simple Sentences: I like...",
      description: "Match the sentence to the picture.",
      gameType: 'matching',
      content: {
        matching: [
          { left: "I like apples", right: "👍🍎", emoji: "😊" },
          { left: "I have a dog", right: "🙋‍♂️🐕", emoji: "🐾" },
        ]
      }
    },
  }
};

export function getGameContent(subject: string, topicId: string): TopicContent | null {
  const subjectContent = gameContentMap[subject?.toLowerCase()];
  if (!subjectContent) return null;
  
  return subjectContent[topicId] || null;
}
