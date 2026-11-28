import rules from "../assets/icons/rules.svg";
import records from "../assets/icons/records.svg";
import restart from "../assets/icons/restart.svg";

export const ControlPanel = ({ onRules, onRecords, onRestart }) => {
  return (
    <div className="d-flex justify-content-center justify-content-sm-end gap-4 pt-1 px-sm-4">
      <div className="control d-flex flex-column align-items-center gap-1">
        <button
          type="button"
          className="round-button round-button-rules d-flex align-items-center justify-content-center"
          aria-label="Ver las reglas"
          onClick={onRules}
        >
          <img src={rules} alt="" />
        </button>
        <span>REGLAS</span>
      </div>

      <div className="control d-flex flex-column align-items-center gap-1">
        <button
          type="button"
          className="round-button round-button-records d-flex align-items-center justify-content-center"
          aria-label="Ver tabla de posiciones"
          onClick={onRecords}
        >
          <img src={records} alt="" />
        </button>
        <span>RECORDS</span>
      </div>

      <div className="control d-flex flex-column align-items-center gap-1">
        <button
          type="button"
          className="round-button round-button-restart d-flex align-items-center justify-content-center"
          aria-label="Empezar de nuevo"
          onClick={onRestart}
        >
          <img src={restart} alt="" />
        </button>
        <span>REINICIAR</span>
      </div>
    </div>
  );
};
