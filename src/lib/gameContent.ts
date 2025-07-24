// Game content organized by subject, topic, and LEVEL
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

// New structure: subject -> topic -> level -> content
export const gameContentMap: Record<string, Record<string, Record<string, GameContent>>> = {
  italiano: {
    "lettura-associazione": {
      "1": {
        matching: [
          { left: "Mela", right: "🍎", emoji: "🍏" },
          { left: "Cane", right: "🐕", emoji: "🐾" },
          { left: "Sole", right: "☀️", emoji: "🌅" },
          { left: "Casa", right: "🏠", emoji: "🏘️" },
        ],
        memory: [
          { content: "Mela", emoji: "🍎" },
          { content: "Cane", emoji: "🐕" },
          { content: "Sole", emoji: "☀️" },
          { content: "Casa", emoji: "🏠" },
        ],
        timed: [
          { question: "Quale immagine è una MELA?", options: ["🍎", "🐕", "☀️", "🏠"], correct: 0, points: 10, timeLimit: 10 },
        ]
      },
      "5": {
        matching: [
          { left: "Il gatto dorme", right: "🐱💤", emoji: "🐾" },
          { left: "La bambina legge", right: "👧📖", emoji: "📚" },
          { left: "Il sole splende", right: "☀️✨", emoji: "🌅" },
          { left: "La palla rotola", right: "⚽️🔄", emoji: "🥅" },
        ],
        memory: [
          { content: "Gatto", emoji: "🐱" },
          { content: "Bambina", emoji: "👧" },
          { content: "Sole", emoji: "☀️" },
          { content: "Palla", emoji: "⚽️" },
        ],
        timed: [
           { question: "Chi sta leggendo un libro?", options: ["Il gatto", "La bambina", "Il sole", "La palla"], correct: 1, points: 15, timeLimit: 15 },
        ]
      },
       "10": {
        matching: [
          { left: "Il cane grande insegue la palla rossa", right: "🐕➡️⚽️", emoji: "🐾" },
          { left: "La bambina con il vestito blu legge un libro", right: "👧🟦📖", emoji: "📚" },
        ],
        memory: [
          { content: "Cane grande", emoji: "🐕" },
          { content: "Palla rossa", emoji: "⚽️" },
          { content: "Vestito blu", emoji: "🟦" },
          { content: "Libro", emoji: "📖" },
        ],
        timed: [
           { question: "Di che colore è la palla?", options: ["Blu", "Rossa", "Verde", "Gialla"], correct: 1, points: 20, timeLimit: 15 },
        ]
      }
    },
    // Add more topics for italiano...
  },
  matematica: {
    "problemi-fino-20": {
      "1": {
        matching: [
          { left: "Ho 2 mele, ne mangio 1. Quante ne restano?", right: "2 - 1", emoji: "🍎" },
          { left: "Ci sono 3 gatti, ne arrivano 2. Quanti in totale?", right: "3 + 2", emoji: "🐱" },
        ],
        memory: [
          { content: "2-1", emoji: "1" },
          { content: "3+2", emoji: "5" },
        ],
        timed: [
          { question: "Se hai 5 caramelle e ne ricevi altre 3, quale operazione fai?", options: ["5 - 3", "5 + 3", "5 x 3", "5 / 3"], correct: 1, points: 10, timeLimit: 15 },
        ]
      },
       "5": {
        matching: [
          { left: "Marco ha 8 figurine, ne perde 3. Quante ne ha ora?", right: "8 - 3", emoji: "🃏" },
          { left: "Ci sono 7 uccelli su un ramo, ne volano via 4. Quanti restano?", right: "7 - 4", emoji: "🐦" },
          { left: "In un cesto ci sono 5 pere e 6 mele. Quanta frutta in tutto?", right: "5 + 6", emoji: "🧺" },
        ],
        memory: [
          { content: "8-3", emoji: "5" },
          { content: "7-4", emoji: "3" },
          { content: "5+6", emoji: "11" },
        ],
        timed: [
          { question: "Luca ha 12 biglie e ne vince 5. Quante biglie ha adesso?", options: ["7", "16", "17", "18"], correct: 2, points: 15, timeLimit: 20 },
        ]
      },
      "10": {
        matching: [
          { left: "In una scatola ci sono 18 pastelli. 5 sono rossi, 6 sono blu. Quanti sono di altri colori?", right: "18 - 5 - 6", emoji: "🖍️" },
          { left: "Marta ha 9 euro. Compra un gelato da 3 euro e delle caramelle da 2 euro. Quanti soldi le restano?", right: "9 - 3 - 2", emoji: "💶" },
        ],
        memory: [
          { content: "18-11", emoji: "7" },
          { content: "9-5", emoji: "4" },
        ],
        timed: [
          { question: "Ci sono 20 bambini in un parco. 8 giocano a palla, 5 vanno sull'altalena. Quanti bambini fanno altro?", options: ["7", "8", "12", "13"], correct: 0, points: 20, timeLimit: 25 },
        ]
      }
    }
    // Add more topics for matematica...
  }
  // Add more subjects...
};

// This function now gets content for a specific level
export function getGameContent(subject: string, topic: string, level: string): GameContent | null {
  const subjectContent = gameContentMap[subject?.toLowerCase()];
  if (!subjectContent) return null;
  
  const topicContent = subjectContent[topic?.toLowerCase()];
  if (!topicContent) return null;

  // Return content for the specific level, or fallback to level 1 if not found
  return topicContent[level] || topicContent["1"] || null;
}
