import rules from "../assets/icons/rules.svg";
import records from "../assets/icons/records.svg";
import restart from "../assets/icons/restart.svg";

export const ControlPanel = ({ onRules, onRecords, onRestart }) => {
  return (
    <div className="control-panel">
      <div className="control">
        <button
          type="button"
          className="round-button round-button-rules"
          aria-label="Ver las reglas"
          onClick={onRules}
        >
          <img src={rules} alt="" />
        </button>
        <span>REGLAS</span>
      </div>

      <div className="control">
        <button
          type="button"
          className="round-button round-button-records"
          aria-label="Ver tabla de posiciones"
          onClick={onRecords}
        >
          <img src={records} alt="" />
        </button>
        <span>RECORDS</span>
      </div>

      <div className="control">
        <button
          type="button"
          className="round-button round-button-restart"
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
