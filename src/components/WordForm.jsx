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
    <form onSubmit={onSubmit}>
      <input
        aria-label="palabra"
        size={40}
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
      <button disabled={disabled}>
        {validating ? "Validando..." : "Enviar"}
      </button>
    </form>
  );
};
