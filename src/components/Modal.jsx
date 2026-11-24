import { useEffect, useRef } from "react";

export const Modal = ({ title, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <div className="modal-header">
        <h2 id="modal-title" className="modal-title">
          {title}
        </h2>
        <button
          type="button"
          className="modal-close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          X
        </button>
      </div>

      <div className="modal-body">{children}</div>
    </dialog>
  );
};
