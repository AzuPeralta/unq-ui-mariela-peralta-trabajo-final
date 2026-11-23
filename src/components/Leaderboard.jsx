export const Leaderboard = ({ scores }) => {
  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">HIGH SCORES</h2>
      {scores.length === 0 ? (
        <p>Todavía no hay puntajes</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th>Palabras</th>
              <th>Puntos</th>
            </tr>
          </thead>

          <tbody>
            {scores.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.player}</td>
                <td>{entry.words}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
