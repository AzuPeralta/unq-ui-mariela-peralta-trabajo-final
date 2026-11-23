export const Timer = ({ time, waiting }) => {
  return (
    <div className="hud-box">
      {waiting ? <p>Esperando tu primera palabra...</p> : <p>Tiempo: {time}</p>}
    </div>
  );
};
