export const WordForm = ({
  value,
  onChange,
  onSubmit,
  disabled,
  validating,
  ref,
  nextLetter,
}) => {
  return (
    <form className="d-flex gap-3" onSubmit={onSubmit}>
      <input
        className="word-input flex-grow-1"
        aria-label="palabra"
        type="text"
        value={value}
        onChange={onChange}
        ref={ref}
        disabled={disabled}
        placeholder={
          nextLetter
            ? `Una palabra que empiece con ${nextLetter.toUpperCase()}...`
            : "Acá va tu palabra"
        }
      />
      <button className="arcade-button" disabled={disabled}>
        {validating ? "Validando..." : "Enviar"}
      </button>
    </form>
  );
};
