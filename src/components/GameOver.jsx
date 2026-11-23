import { useState } from "react";
import { getLeaderBoard, saveNewScore, isTopScore } from "../services/leaderboardStorage";
import { isValidInitials } from "../utils/validations";
import { Leaderboard } from "./Leaderboard";

export const GameOver = ({ wordCount, score, onRestart }) => {
  const [initials, setInitials] = useState("");
  const [saved, setSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => getLeaderBoard());
  const [error, setError] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setError(null);

    if (!isValidInitials(initials)) return setError("Ingresá 3 letras");

    const newScore = {
      player: initials.toUpperCase(),
      words: wordCount,
      score,
    };

    setLeaderboard(saveNewScore(newScore));
    setSaved(true);
  };

  const isTop10 = isTopScore(score, leaderboard);

  return (
    <div>
      <div>
        <h2>¡Terminó tu partida!</h2>
        <p>Encadenaste {wordCount} palabras</p>
        <p>Tu puntaje final es {score}</p>
        <button onClick={onRestart}>Jugar otra vez</button>
      </div>

      {!saved && isTop10 && (
        <form onSubmit={handleSave}>
          <h2>¡Guardá tu puntaje!</h2>
          <input
            aria-label="iniciales"
            type="text"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            maxLength={3}
            placeholder="Ingresá tus iniciales"
          />
          {error && <p>{error}</p>}
          <button>Enviar</button>
        </form>
      )}

      <Leaderboard scores={leaderboard} />
    </div>
  );
};
