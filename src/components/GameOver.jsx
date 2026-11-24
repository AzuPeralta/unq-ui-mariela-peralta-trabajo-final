import { useState } from "react";
import {
  getLeaderBoard,
  saveNewScore,
  isTopScore,
} from "../services/leaderboardStorage";
import { isValidInitials } from "../utils/validations";
import { Leaderboard } from "./Leaderboard";
import { ErrorMessage } from "./ErrorMessage";

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
    <div className="game-over">
      <div className="game-over-left">
        <h2 className="game-over-title">GAME OVER</h2>

        <div className="stats">
          <div className="hud-box stat-box">
            <span className="stat-label">PALABRAS</span>
            <span className="stat-value">{wordCount}</span>
          </div>

          <div className="hud-box stat-box">
            <span className="stat-label">PUNTAJE FINAL</span>
            <span className="stat-value">{score}</span>
          </div>
        </div>

        {!saved && isTop10 && (
          <form className="initials-form" onSubmit={handleSave}>
            <label htmlFor="initials" className="initials-label">
              ¡NUEVO RECORD! INGRESA TUS INICIALES:
            </label>
            <div className="initials-row">
              <input
                id="initials"
                className="word-input initials-input"
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                maxLength={3}
                placeholder="ABC"
              />
              <button className="arcade-button">Guardar</button>
            </div>

            <ErrorMessage message={error} />
          </form>
        )}

        <button className="arcade-button play-again" onClick={onRestart}>
          ▶ Jugar otra vez
        </button>
      </div>

      <Leaderboard scores={leaderboard} />
    </div>
  );
};
