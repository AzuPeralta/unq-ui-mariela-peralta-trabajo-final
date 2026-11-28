import { Modal } from "./Modal";

export const RulesModal = ({ onClose }) => {
  return (
    <Modal title="REGLAS" onClose={onClose}>
      <ol className="rules-list">
        <li>La primera palabra puede ser cualquiera</li>
        <li>Cada palabra empieza con la última letra de la anterior: casa → árbol → luna</li>
        <li>No se puede repetir una palabra</li>
        <li>Tiene que existir en el diccionario español</li>
        <li>Las palabras de una sola letra solo valen si son a, e, o, u, y</li>
        <li>Cada letra suma 1 punto</li>
        <li>Tenés 15 segundos por palabra. Cada palabra válida vuelve el tiempo a 15</li>
      </ol>
      <p className="arcade-modal-note">El tiempo está en pausa mientras leés</p>
      <div className="arcade-modal-actions">
        <button type="button" className="arcade-button" onClick={onClose}>
          ¡A jugar!
        </button>
      </div>
    </Modal>
  );
};