export const WordChain = ({ words }) => {
  if (words.length === 0)
    return (
      <p>
        Escribí cualquier palabra para empezar. El tiempo corre desde tu primera
        palabra válida.
      </p>
    );
  return <p>{words.join(" → ")}</p>;
};
