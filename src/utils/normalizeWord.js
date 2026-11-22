const accents = { á: "a", é: "e", í: "i", ó: "o", ú: "u", ü: "u" };

export const normalizeWord = (word) => word.toLowerCase().replace(/[áéíóúü]/g, (letter) => accents[letter]);
