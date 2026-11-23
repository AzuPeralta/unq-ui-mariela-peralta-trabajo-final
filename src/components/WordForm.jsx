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
    <form className="word-form" onSubmit={onSubmit}>
      <input
        className="word-input"
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
