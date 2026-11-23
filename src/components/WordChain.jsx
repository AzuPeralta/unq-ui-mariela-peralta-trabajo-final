export const WordChain = ({ words }) => {
  if (words.length === 0)
    return (
      <p>
        Escribí cualquier palabra para empezar. El tiempo corre desde tu primera
        palabra válida.
      </p>
    );
  return (
    <div>
      <p className="chain-label">
        CADENA: {words.length} {words.length === 1 ? "PALABRA" : "PALABRAS"}
      </p>

      <div className="chain-box">
        <ul className="chain">
          {words.map((word, index) => {
            const isLast = index === words.length - 1;
            return (
              <li key={word} className="chain-item">
                <span className={isLast ? "chip chip-last" : "chip"}>
                  {word}
                </span>
                {!isLast && (
                  <span className="chain-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
