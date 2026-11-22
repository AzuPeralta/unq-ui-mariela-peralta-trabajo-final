import { useState } from "react";
import { isValidWord, SINGLE_LETTER_WORDS } from "../utils/validations";
import { validateWord } from "../services/api";
import { normalizeWord } from "../utils/normalizeWord";

const Game = () => {
  const [input, setInput] = useState("");
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);

  const score = words.reduce((sum, word) => sum + word.length, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const playingWord = input.toLowerCase().trim();

    setError(null);
    if (!isValidWord(playingWord)) return setError("¡La palabra es inválida!");

    const normalizedWord = normalizeWord(playingWord);

    if (
      normalizedWord.length === 1 &&
      !SINGLE_LETTER_WORDS.includes(normalizedWord)
    )
      return setError("¡Esa letra sola no es una palabra!");

    if (words.some((word) => normalizeWord(word) === normalizedWord))
      return setError("¡La palabra ya fue utilizada!");

    if (
      words.length > 0 &&
      normalizeWord(words.at(-1)).at(-1) !== normalizedWord[0]
    )
      return setError("¡La palabra no se encadena con la anterior!");

    validateWord(playingWord)
      .then((res) => {
        if (res.data.exists) {
          setWords((prev) => [...prev, playingWord]);
          setInput("");
        } else {
          setError("¡La palabra no existe!");
          setInput("");
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Input"></label>
        <input
          id="Input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Enviar</button>
      </form>
      {error && <p>{error}</p>}
      <p>{words.join(" → ")}</p>
      <p>Puntaje:{score}</p>
    </div>
  );
};

export default Game;
