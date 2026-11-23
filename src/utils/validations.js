export const isValidWord = (word) => /^[a-záéíóúüñ]+$/i.test(word);

export const isValidInitials = (initials) => /^[a-z]{3}$/i.test(initials);

export const SINGLE_LETTER_WORDS = ["a", "e", "o", "u", "y"];