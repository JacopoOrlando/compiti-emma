// Game content organized by subject and topic
export interface GameContent {
  matching: Array<{ left: string; right: string; emoji?: string }>;
  memory: Array<{ content: string; emoji: string }>;
  timed: Array<{
    question: string;
    options: string[];
    correct: number;
    points: number;
    timeLimit: number;
  }>;
}

export const gameContentMap: Record<string, Record<string, GameContent>> = {
  matematica: {
    "numeri-fino-20": {
      matching: [
        { left: "15", right: "quindici", emoji: "🔢" },
        { left: "8 + 2", right: "10", emoji: "➕" },
        { left: "12 - 3", right: "9", emoji: "➖" },
        { left: "7", right: "sette", emoji: "🔢" },
        { left: "20", right: "venti", emoji: "🔢" },
        { left: "5 + 5", right: "10", emoji: "➕" },
        { left: "18 - 8", right: "10", emoji: "➖" },
        { left: "13", right: "tredici", emoji: "🔢" }
      ],
      memory: [
        { content: "1", emoji: "1️⃣" },
        { content: "2", emoji: "2️⃣" },
        { content: "3", emoji: "3️⃣" },
        { content: "4", emoji: "4️⃣" },
        { content: "5", emoji: "5️⃣" },
        { content: "6", emoji: "6️⃣" },
        { content: "7", emoji: "7️⃣" },
        { content: "8", emoji: "8️⃣" }
      ],
      timed: [
        { question: "Quanto fa 15 + 3?", options: ["17", "18", "19", "20"], correct: 1, points: 10, timeLimit: 15 },
        { question: "Qual è il numero che viene prima di 12?", options: ["10", "11", "13", "14"], correct: 1, points: 10, timeLimit: 12 },
        { question: "Quanto fa 20 - 7?", options: ["12", "13", "14", "15"], correct: 1, points: 10, timeLimit: 15 },
        { question: "Quale numero è maggiore: 16 o 14?", options: ["16", "14", "Sono uguali", "Non si può dire"], correct: 0, points: 10, timeLimit: 10 }
      ]
    },
    "addizioni-fino-20": {
      matching: [
        { left: "5 + 3", right: "8", emoji: "➕" },
        { left: "7 + 4", right: "11", emoji: "➕" },
        { left: "9 + 6", right: "15", emoji: "➕" },
        { left: "12 + 8", right: "20", emoji: "➕" },
        { left: "3 + 7", right: "10", emoji: "➕" },
        { left: "6 + 5", right: "11", emoji: "➕" },
        { left: "8 + 9", right: "17", emoji: "➕" },
        { left: "4 + 6", right: "10", emoji: "➕" }
      ],
      memory: [
        { content: "5+5=10", emoji: "➕" },
        { content: "7+3=10", emoji: "🔟" },
        { content: "8+2=10", emoji: "🎯" },
        { content: "9+1=10", emoji: "✨" },
        { content: "6+4=10", emoji: "⭐" },
        { content: "4+6=10", emoji: "🌟" },
        { content: "3+7=10", emoji: "💫" },
        { content: "2+8=10", emoji: "🎊" }
      ],
      timed: [
        { question: "Quanto fa 8 + 7?", options: ["14", "15", "16", "17"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Quanto fa 9 + 5?", options: ["13", "14", "15", "16"], correct: 1, points: 15, timeLimit: 18 },
        { question: "Quanto fa 6 + 8?", options: ["12", "13", "14", "15"], correct: 2, points: 15, timeLimit: 20 },
        { question: "Quanto fa 12 + 7?", options: ["18", "19", "20", "21"], correct: 1, points: 20, timeLimit: 25 }
      ]
    },
    "sottrazioni-fino-20": {
      matching: [
        { left: "15 - 6", right: "9", emoji: "➖" },
        { left: "20 - 8", right: "12", emoji: "➖" },
        { left: "17 - 9", right: "8", emoji: "➖" },
        { left: "14 - 7", right: "7", emoji: "➖" },
        { left: "19 - 5", right: "14", emoji: "➖" },
        { left: "16 - 8", right: "8", emoji: "➖" },
        { left: "13 - 4", right: "9", emoji: "➖" },
        { left: "18 - 9", right: "9", emoji: "➖" }
      ],
      memory: [
        { content: "10-1=9", emoji: "➖" },
        { content: "10-2=8", emoji: "🔢" },
        { content: "10-3=7", emoji: "💯" },
        { content: "10-4=6", emoji: "🎯" },
        { content: "10-5=5", emoji: "⭐" },
        { content: "10-6=4", emoji: "✨" },
        { content: "10-7=3", emoji: "🌟" },
        { content: "10-8=2", emoji: "💫" }
      ],
      timed: [
        { question: "Quanto fa 16 - 9?", options: ["6", "7", "8", "9"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Quanto fa 20 - 12?", options: ["7", "8", "9", "10"], correct: 1, points: 15, timeLimit: 18 },
        { question: "Quanto fa 15 - 8?", options: ["6", "7", "8", "9"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Quanto fa 19 - 11?", options: ["7", "8", "9", "10"], correct: 1, points: 20, timeLimit: 25 }
      ]
    },
    "problemi-fino-20": {
      matching: [
        { left: "Marco ha 8 caramelle, ne mangia 3", right: "8 - 3 = 5", emoji: "🍬" },
        { left: "Lisa ha 5 matite, ne compra 7", right: "5 + 7 = 12", emoji: "✏️" },
        { left: "Nel cestino ci sono 15 mele, ne prendo 6", right: "15 - 6 = 9", emoji: "🍎" },
        { left: "Ho 9 euro, guadagno 8 euro", right: "9 + 8 = 17", emoji: "💰" },
        { left: "Ci sono 12 bambini, 4 vanno via", right: "12 - 4 = 8", emoji: "👶" },
        { left: "Paolo colleziona 6 figurine + 9 nuove", right: "6 + 9 = 15", emoji: "🃏" }
      ],
      memory: [
        { content: "Addizione", emoji: "➕" },
        { content: "Sottrazione", emoji: "➖" },
        { content: "Problema", emoji: "❓" },
        { content: "Soluzione", emoji: "✅" },
        { content: "Dati", emoji: "📊" },
        { content: "Domanda", emoji: "❔" },
        { content: "Operazione", emoji: "🔢" },
        { content: "Risultato", emoji: "🎯" }
      ],
      timed: [
        { question: "Sara ha 7 libri. La mamma le regala 5 libri. Quanti libri ha ora?", options: ["11", "12", "13", "14"], correct: 1, points: 20, timeLimit: 30 },
        { question: "In un parcheggio ci sono 18 auto. 9 auto vanno via. Quante auto rimangono?", options: ["8", "9", "10", "11"], correct: 1, points: 20, timeLimit: 35 },
        { question: "Luca ha 4 palloni. Il papà gli compra altri 8 palloni. Quanti palloni ha in tutto?", options: ["11", "12", "13", "14"], correct: 1, points: 20, timeLimit: 30 }
      ]
    },
    "spazio-figure-20": {
      matching: [
        { left: "Cerchio", right: "⭕", emoji: "🔵" },
        { left: "Quadrato", right: "⬜", emoji: "🟦" },
        { left: "Triangolo", right: "🔺", emoji: "🔺" },
        { left: "Rettangolo", right: "▭", emoji: "🟪" },
        { left: "Dentro", right: "📦", emoji: "⬅️" },
        { left: "Fuori", right: "📤", emoji: "➡️" },
        { left: "Confine", right: "🚪", emoji: "🔄" },
        { left: "Aperto", right: "📖", emoji: "🔓" }
      ],
      memory: [
        { content: "Cerchio", emoji: "⭕" },
        { content: "Quadrato", emoji: "⬜" },
        { content: "Triangolo", emoji: "🔺" },
        { content: "Rettangolo", emoji: "▭" },
        { content: "Dentro", emoji: "📦" },
        { content: "Fuori", emoji: "📤" },
        { content: "Sopra", emoji: "⬆️" },
        { content: "Sotto", emoji: "⬇️" }
      ],
      timed: [
        { question: "Quanti lati ha un triangolo?", options: ["2", "3", "4", "5"], correct: 1, points: 10, timeLimit: 15 },
        { question: "Quale figura ha tutti i lati uguali?", options: ["Rettangolo", "Quadrato", "Triangolo", "Cerchio"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Un cerchio ha angoli?", options: ["Sì", "No", "Uno", "Due"], correct: 1, points: 10, timeLimit: 15 }
      ]
    },
    "numeri-fino-100": {
      matching: [
        { left: "45", right: "quarantacinque", emoji: "🔢" },
        { left: "67", right: "sessantasette", emoji: "🔢" },
        { left: "83", right: "ottantatré", emoji: "🔢" },
        { left: "30 + 20", right: "50", emoji: "➕" },
        { left: "90 - 15", right: "75", emoji: "➖" },
        { left: "8 decine", right: "80", emoji: "🔢" },
        { left: "9 decine e 6 unità", right: "96", emoji: "🔢" },
        { left: "100", right: "cento", emoji: "💯" }
      ],
      memory: [
        { content: "10", emoji: "🔟" },
        { content: "20", emoji: "2️⃣0️⃣" },
        { content: "30", emoji: "3️⃣0️⃣" },
        { content: "40", emoji: "4️⃣0️⃣" },
        { content: "50", emoji: "5️⃣0️⃣" },
        { content: "60", emoji: "6️⃣0️⃣" },
        { content: "70", emoji: "7️⃣0️⃣" },
        { content: "80", emoji: "8️⃣0️⃣" }
      ],
      timed: [
        { question: "Quanto fa 34 + 25?", options: ["57", "58", "59", "60"], correct: 2, points: 20, timeLimit: 30 },
        { question: "Quale numero viene dopo 89?", options: ["88", "90", "91", "100"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Quanto fa 72 - 18?", options: ["52", "53", "54", "55"], correct: 2, points: 25, timeLimit: 35 }
      ]
    }
  },
  scienze: {
    "viventi-non-viventi": {
      matching: [
        { left: "Cane", right: "Vivente", emoji: "🐕" },
        { left: "Sasso", right: "Non vivente", emoji: "🪨" },
        { left: "Albero", right: "Vivente", emoji: "🌳" },
        { left: "Automobile", right: "Non vivente", emoji: "🚗" },
        { left: "Gatto", right: "Vivente", emoji: "🐱" },
        { left: "Libro", right: "Non vivente", emoji: "📚" },
        { left: "Fiore", right: "Vivente", emoji: "🌸" },
        { left: "Telefono", right: "Non vivente", emoji: "📱" }
      ],
      memory: [
        { content: "Respirare", emoji: "💨" },
        { content: "Nutrirsi", emoji: "🍎" },
        { content: "Crescere", emoji: "📈" },
        { content: "Riprodursi", emoji: "👶" },
        { content: "Muoversi", emoji: "🏃" },
        { content: "Reagire", emoji: "⚡" },
        { content: "Vivere", emoji: "❤️" },
        { content: "Morire", emoji: "🕊️" }
      ],
      timed: [
        { question: "Quali caratteristiche hanno tutti gli esseri viventi?", options: ["Solo crescere", "Respirare e nutrirsi", "Solo muoversi", "Solo reagire"], correct: 1, points: 20, timeLimit: 25 },
        { question: "Un robot è un essere vivente?", options: ["Sì", "No", "Forse", "Dipende"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Le piante sono esseri viventi?", options: ["No", "Sì", "Solo alcune", "Non si sa"], correct: 1, points: 15, timeLimit: 20 }
      ]
    },
    "cicli-vita": {
      matching: [
        { left: "Seme", right: "Inizio della pianta", emoji: "🌱" },
        { left: "Germoglio", right: "Pianta giovane", emoji: "🌿" },
        { left: "Pianta adulta", right: "Pianta matura", emoji: "🌳" },
        { left: "Uovo", right: "Inizio dell'animale", emoji: "🥚" },
        { left: "Pulcino", right: "Animale giovane", emoji: "🐤" },
        { left: "Gallina", right: "Animale adulto", emoji: "🐔" },
        { left: "Bruco", right: "Larva", emoji: "🐛" },
        { left: "Farfalla", right: "Insetto adulto", emoji: "🦋" }
      ],
      memory: [
        { content: "Nascita", emoji: "🐣" },
        { content: "Crescita", emoji: "📈" },
        { content: "Maturità", emoji: "🌟" },
        { content: "Riproduzione", emoji: "👨‍👩‍👧‍👦" },
        { content: "Invecchiamento", emoji: "⏰" },
        { content: "Morte", emoji: "🕊️" },
        { content: "Seme", emoji: "🌱" },
        { content: "Frutto", emoji: "🍎" }
      ],
      timed: [
        { question: "Qual è la prima fase della vita di una pianta?", options: ["Fiore", "Seme", "Frutto", "Foglia"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Cosa diventa un girino?", options: ["Pesce", "Rana", "Serpente", "Lucertola"], correct: 1, points: 20, timeLimit: 25 },
        { question: "Quante fasi ha la metamorfosi della farfalla?", options: ["2", "3", "4", "5"], correct: 2, points: 25, timeLimit: 30 }
      ]
    },
    "caratteristiche-viventi": {
      matching: [
        { left: "Vertebrati", right: "Hanno la colonna vertebrale", emoji: "🦴" },
        { left: "Invertebrati", right: "Non hanno la colonna vertebrale", emoji: "🐛" },
        { left: "Mammiferi", right: "Allattano i piccoli", emoji: "🐄" },
        { left: "Uccelli", right: "Hanno le penne", emoji: "🐦" },
        { left: "Pesci", right: "Vivono nell'acqua", emoji: "🐟" },
        { left: "Rettili", right: "Hanno le squame", emoji: "🦎" },
        { left: "Anfibi", right: "Vivono in terra e acqua", emoji: "🐸" },
        { left: "Insetti", right: "Hanno 6 zampe", emoji: "🐜" }
      ],
      memory: [
        { content: "Radici", emoji: "🌿" },
        { content: "Fusto", emoji: "🌳" },
        { content: "Foglie", emoji: "🍃" },
        { content: "Fiori", emoji: "🌸" },
        { content: "Frutti", emoji: "🍎" },
        { content: "Semi", emoji: "🌱" },
        { content: "Fotosintesi", emoji: "☀️" },
        { content: "Respirazione", emoji: "💨" }
      ],
      timed: [
        { question: "Dove avviene la fotosintesi nelle piante?", options: ["Radici", "Fusto", "Foglie", "Fiori"], correct: 2, points: 20, timeLimit: 25 },
        { question: "Come respirano i pesci?", options: ["Polmoni", "Branchie", "Pelle", "Bocca"], correct: 1, points: 20, timeLimit: 25 },
        { question: "Cosa mangiano gli animali erbivori?", options: ["Carne", "Piante", "Tutto", "Niente"], correct: 1, points: 15, timeLimit: 20 }
      ]
    },
    "classificazione-piante-animali": {
      matching: [
        { left: "Alghe", right: "Piante acquatiche", emoji: "🌊" },
        { left: "Muschi", right: "Piante senza fiori", emoji: "🟢" },
        { left: "Felci", right: "Piante con spore", emoji: "🌿" },
        { left: "Angiosperme", right: "Piante con fiori", emoji: "🌸" },
        { left: "Gimnosperme", right: "Piante con coni", emoji: "🌲" },
        { left: "Molluschi", right: "Corpo molle", emoji: "🐌" },
        { left: "Artropodi", right: "Zampe articolate", emoji: "🦀" },
        { left: "Cnidari", right: "Corpo gelatinoso", emoji: "🎐" }
      ],
      memory: [
        { content: "Mammiferi", emoji: "🐄" },
        { content: "Uccelli", emoji: "🐦" },
        { content: "Rettili", emoji: "🦎" },
        { content: "Anfibi", emoji: "🐸" },
        { content: "Pesci", emoji: "🐟" },
        { content: "Insetti", emoji: "🐛" },
        { content: "Molluschi", emoji: "🐌" },
        { content: "Crostacei", emoji: "🦀" }
      ],
      timed: [
        { question: "A quale gruppo appartiene la rosa?", options: ["Gimnosperme", "Angiosperme", "Felci", "Muschi"], correct: 1, points: 20, timeLimit: 25 },
        { question: "Quante zampe hanno gli insetti?", options: ["4", "6", "8", "10"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Dove vivono gli anfibi?", options: ["Solo in terra", "Solo in acqua", "Terra e acqua", "Solo negli alberi"], correct: 2, points: 20, timeLimit: 25 }
      ]
    }
  },
  tecnologia: {
    "materiali-oggetti": {
      matching: [
        { left: "Bicchiere", right: "Vetro", emoji: "🥛" },
        { left: "Maglietta", right: "Tessuto", emoji: "👕" },
        { left: "Pentola", right: "Metallo", emoji: "🍳" },
        { left: "Tavolo", right: "Legno", emoji: "🪵" },
        { left: "Borsa", right: "Plastica", emoji: "🛍️" },
        { left: "Mattone", right: "Ceramica", emoji: "🧱" },
        { left: "Pneumatico", right: "Gomma", emoji: "🛞" },
        { left: "Libro", right: "Carta", emoji: "📚" }
      ],
      memory: [
        { content: "Legno", emoji: "🪵" },
        { content: "Metallo", emoji: "⚙️" },
        { content: "Plastica", emoji: "🔧" },
        { content: "Vetro", emoji: "🪟" },
        { content: "Tessuto", emoji: "🧵" },
        { content: "Ceramica", emoji: "🏺" },
        { content: "Gomma", emoji: "🎈" },
        { content: "Carta", emoji: "📄" }
      ],
      timed: [
        { question: "Quale materiale è trasparente?", options: ["Legno", "Metallo", "Vetro", "Gomma"], correct: 2, points: 15, timeLimit: 20 },
        { question: "Quale materiale si ottiene dagli alberi?", options: ["Plastica", "Legno", "Metallo", "Vetro"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Quale materiale è elastico?", options: ["Vetro", "Ceramica", "Gomma", "Metallo"], correct: 2, points: 20, timeLimit: 25 }
      ]
    },
    "strumenti-misura": {
      matching: [
        { left: "Bilancia", right: "Misura il peso", emoji: "⚖️" },
        { left: "Orologio", right: "Misura il tempo", emoji: "⏰" },
        { left: "Righello", right: "Misura la lunghezza", emoji: "📏" },
        { left: "Termometro", right: "Misura la temperatura", emoji: "🌡️" },
        { left: "Metro", right: "Misura le distanze", emoji: "📐" },
        { left: "Cronometro", right: "Misura tempi precisi", emoji: "⏱️" },
        { left: "Calcolatrice", right: "Fa i calcoli", emoji: "🧮" },
        { left: "Lente", right: "Ingrandisce", emoji: "🔍" }
      ],
      memory: [
        { content: "Peso", emoji: "⚖️" },
        { content: "Lunghezza", emoji: "📏" },
        { content: "Tempo", emoji: "⏰" },
        { content: "Temperatura", emoji: "🌡️" },
        { content: "Volume", emoji: "🥤" },
        { content: "Velocità", emoji: "💨" },
        { content: "Distanza", emoji: "📐" },
        { content: "Area", emoji: "⬜" }
      ],
      timed: [
        { question: "Con cosa misuriamo la febbre?", options: ["Bilancia", "Orologio", "Termometro", "Righello"], correct: 2, points: 15, timeLimit: 20 },
        { question: "Quale strumento usiamo per pesare?", options: ["Metro", "Bilancia", "Cronometro", "Lente"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Con cosa misuriamo quanto è lunga una matita?", options: ["Orologio", "Termometro", "Righello", "Bilancia"], correct: 2, points: 20, timeLimit: 25 }
      ]
    },
    "ciclo-vita-prodotti": {
      matching: [
        { left: "Materie prime", right: "Inizio del ciclo", emoji: "🌱" },
        { left: "Produzione", right: "Creazione oggetto", emoji: "🏭" },
        { left: "Confezionamento", right: "Imballaggio", emoji: "📦" },
        { left: "Trasporto", right: "Spostamento", emoji: "🚛" },
        { left: "Vendita", right: "Acquisto", emoji: "🏪" },
        { left: "Uso", right: "Utilizzo", emoji: "👥" },
        { left: "Riciclo", right: "Riutilizzo", emoji: "♻️" },
        { left: "Smaltimento", right: "Fine del ciclo", emoji: "🗑️" }
      ],
      memory: [
        { content: "Progetta", emoji: "✏️" },
        { content: "Produce", emoji: "🏭" },
        { content: "Confeziona", emoji: "📦" },
        { content: "Trasporta", emoji: "🚛" },
        { content: "Vende", emoji: "🏪" },
        { content: "Usa", emoji: "👥" },
        { content: "Ricicla", emoji: "♻️" },
        { content: "Smaltisce", emoji: "🗑️" }
      ],
      timed: [
        { question: "Cosa facciamo per non sprecare?", options: ["Buttare tutto", "Riciclare", "Comprare di più", "Sprecare"], correct: 1, points: 20, timeLimit: 25 },
        { question: "Dove nascono i prodotti?", options: ["Negozi", "Case", "Fabbriche", "Scuole"], correct: 2, points: 15, timeLimit: 20 },
        { question: "Cosa significa riciclare?", options: ["Buttare via", "Riutilizzare", "Comprare nuovo", "Sprecare"], correct: 1, points: 20, timeLimit: 25 }
      ]
    },
    "classificazione-materiali": {
      matching: [
        { left: "Naturali", right: "Dalla natura", emoji: "🌿" },
        { left: "Artificiali", right: "Fatti dall'uomo", emoji: "🏭" },
        { left: "Legno", right: "Naturale", emoji: "🪵" },
        { left: "Plastica", right: "Artificiale", emoji: "🔧" },
        { left: "Cotone", right: "Naturale", emoji: "🌱" },
        { left: "Alluminio", right: "Artificiale", emoji: "⚙️" },
        { left: "Lana", right: "Naturale", emoji: "🐑" },
        { left: "Nylon", right: "Artificiale", emoji: "🧵" }
      ],
      memory: [
        { content: "Duro", emoji: "🪨" },
        { content: "Morbido", emoji: "🧸" },
        { content: "Flessibile", emoji: "🤸" },
        { content: "Rigido", emoji: "🧱" },
        { content: "Trasparente", emoji: "🪟" },
        { content: "Opaco", emoji: "⬛" },
        { content: "Leggero", emoji: "🪶" },
        { content: "Pesante", emoji: "⚖️" }
      ],
      timed: [
        { question: "Il cotone è un materiale?", options: ["Artificiale", "Naturale", "Né l'uno né l'altro", "Entrambi"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Quale caratteristica ha il vetro?", options: ["Opaco", "Trasparente", "Flessibile", "Morbido"], correct: 1, points: 15, timeLimit: 20 },
        { question: "Da dove viene il legno?", options: ["Fabbriche", "Laboratori", "Alberi", "Negozi"], correct: 2, points: 20, timeLimit: 25 }
      ]
    }
  }
};

export function getGameContent(subject: string, topic: string): GameContent | null {
  const subjectContent = gameContentMap[subject?.toLowerCase()];
  if (!subjectContent) return null;
  
  const topicContent = subjectContent[topic?.toLowerCase()];
  return topicContent || null;
}