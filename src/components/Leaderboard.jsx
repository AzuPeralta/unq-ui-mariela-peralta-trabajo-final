export const Leaderboard = ({ scores }) => {
  if (scores.length === 0) return <p>Todavía no hay puntajes</p>;
  
  return (
    <div>
      <h2>Tabla de posiciones</h2>
      <ol>
        {scores.map((entry, index) => (
          <li key={index}>
            {entry.player} — {entry.words} palabras — {entry.score} puntos
          </li>
        ))}
      </ol>
    </div>
  );
};
