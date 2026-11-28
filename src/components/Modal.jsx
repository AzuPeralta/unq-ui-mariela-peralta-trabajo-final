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
      className="arcade-modal"
      onClose={onClose}
      aria-labelledby="arcade-modal-title"
    >
      <div className="arcade-modal-header d-flex justify-content-between align-items-center">
        <h2 id="arcade-modal-title" className="arcade-modal-title">
          {title}
        </h2>
        <button
          type="button"
          className="arcade-modal-close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          X
        </button>
      </div>

      <div className="arcade-modal-body d-flex flex-column gap-3">{children}</div>
    </dialog>
  );
};
