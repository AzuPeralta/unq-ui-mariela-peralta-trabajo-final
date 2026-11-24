import { useEffect, useRef, useState } from "react";
import { isValidWord, SINGLE_LETTER_WORDS } from "../utils/validations";
import { validateWord } from "../services/api";
import { normalizeWord } from "../utils/normalizeWord";
import { useTimer } from "../hooks/useTimer";
import { GameOver } from "./GameOver";
import { Timer } from "./Timer";
import { Score } from "./Score";
import { ErrorMessage } from "./ErrorMessage";
import { WordChain } from "./WordChain";
import { WordForm } from "./WordForm";
import { ControlPanel } from "./ControlPanel";
import { RulesModal } from "./RulesModal";
import { RecordsModal } from "./RecordsModal";
import { RestartModal } from "./RestartModal";

const TURN_SECONDS = 15;

export const Game = () => {
  const [input, setInput] = useState("");
  const [words, setWords] = useState([]);
  const [validating, setValidating] = useState(false);
  const [modal, setModal] = useState(null);
  const [error, setError] = useState(null);
  const { timeLeft, isOver, restart, reset } = useTimer(
    TURN_SECONDS,
    validating || modal !== null,
  );

  const inputRef = useRef(null);
  const score = words.reduce((sum, word) => sum + word.length, 0);
  const nextLetter =
    words.length > 0 ? normalizeWord(words.at(-1)).at(-1) : null;

  useEffect(() => {
    if (!validating && !isOver) inputRef.current?.focus();
  }, [validating, isOver]);

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

    if (nextLetter && nextLetter !== normalizedWord[0])
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
      .catch(() => setError("No se pudo validar la palabra. Probá de nuevo."))
      .finally(() => setValidating(false));
  };

  const handleReset = () => {
    setWords([]);
    setInput("");
    setError(null);
    reset();
  };

  const closeModal = () => setModal(null);

  const handleRestartClick = () => {
    if (words.length === 0) return handleReset();
    setModal("restart");
  };

  const handleConfirmRestart = () => {
    handleReset();
    closeModal();
  };

  return (
    <main className={isOver ? "cabinet cabinet-wide" : "cabinet"}>
      <h1 className="cabinet-title">PALABRAS ENCADENADAS</h1>
      <section className="screen">
        {isOver ? (
          <GameOver
            wordCount={words.length}
            score={score}
            onRestart={handleReset}
          />
        ) : (
          <>
            <div className="hud">
              <Score score={score} />
              <Timer time={timeLeft} total={TURN_SECONDS} waiting={words.length === 0} />
            </div>
            <WordForm
              onSubmit={handleSubmit}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              ref={inputRef}
              disabled={validating}
              validating={validating}
              nextLetter={nextLetter}
            />
            <WordChain words={words} />
            <ErrorMessage message={error} />
          </>
        )}
      </section>
      {!isOver && (
        <ControlPanel
          onRules={() => setModal("rules")}
          onRecords={() => setModal("records")}
          onRestart={handleRestartClick}
        />
      )}
      {modal === "rules" && <RulesModal onClose={closeModal} />}
      {modal === "records" && <RecordsModal onClose={closeModal} />}
      {modal === "restart" && (
        <RestartModal
          wordCount={words.length}
          score={score}
          onCancel={closeModal}
          onConfirm={handleConfirmRestart}
        />
      )}
    </main>
  );
};
