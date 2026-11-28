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

      <div className="chain-box d-flex flex-column-reverse">
        <ul className="list-unstyled m-0 d-flex flex-wrap gap-2">
          {words.map((word, index) => {
            const isLast = index === words.length - 1;
            return (
              <li key={word} className="d-flex align-items-center gap-2">
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
