import { useEffect, useRef, useState } from "react";
import { isValidWord, SINGLE_LETTER_WORDS } from "../utils/validations";
import { validateWord } from "../services/api";
import { normalizeWord } from "../utils/normalizeWord";
import { useTimer } from "../hooks/useTimer";
import { GameOver } from "./GameOver";
import { Timer } from "./Timer";

const TURN_SECONDS = 15;

const Game = () => {
  const [input, setInput] = useState("");
  const [words, setWords] = useState([]);
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState(null);
  const { timeLeft, isOver, restart, reset } = useTimer(TURN_SECONDS, validating);

  const inputRef = useRef(null);
  const score = words.reduce((sum, word) => sum + word.length, 0);

  useEffect(() => {
    if (!validating) inputRef.current?.focus();
  }, [validating]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isOver) return;

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

    setValidating(true);

    validateWord(playingWord)
      .then((res) => {
        if (res.data.exists) {
          setWords((prev) => [...prev, playingWord]);
          restart();
          setInput("");
        } else {
          setError("¡La palabra no existe!");
          setInput("");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setValidating(false));
  };

  const handleReset = () => {
    setWords([]);
    setInput("");
    setError(null);
    reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Input"></label>
        <input
          id="Input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
          disabled={validating || isOver}
        />
        <button disabled={validating || isOver}>Enviar</button>
      </form>
      {error && <p>{error}</p>}
      <p>{words.join(" → ")}</p>
      <p>Puntaje:{score}</p>
      <Timer time={timeLeft} waiting={words.length === 0}/>

      {isOver && <GameOver wordCount={words.length} score={score} onRestart={handleReset} />}
    </div>
  );
};

export default Game;
