import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API,
});

// GET /api/validate?word=hola
export const validateWord = (word) => api.get("/api/validate", { params: {word}});
