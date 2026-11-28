import { Modal } from "./Modal";

export const RestartModal = ({ wordCount, score, onCancel, onConfirm }) => {
  return (
    <Modal title="¿EMPEZAR DE NUEVO?" onClose={onCancel}>
      <p>
        Vas a perder esta partida: {wordCount}{" "}
        {wordCount === 1 ? "palabra" : "palabras"} y {score} puntos. El tiempo
        está en pausa mientras decidís.
      </p>
      <div className="d-flex justify-content-end gap-3">
        <button
          type="button"
          className="arcade-button arcade-button-secondary"
          onClick={onCancel}
        >
          Seguir jugando
        </button>
        <button type="button" className="arcade-button" onClick={onConfirm}>
          Sí, reiniciar
        </button>
      </div>
    </Modal>
  );
};
