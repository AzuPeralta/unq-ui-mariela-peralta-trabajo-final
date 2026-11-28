const LOW_TIME = 5;

export const Timer = ({ time, total, waiting }) => {
  if (waiting)
    return (
      <div className="hud-box">
        <p>Esperando tu primera palabra...</p>
      </div>
    );

  const hearts = Array.from({ length: total }, (_, index) => index < time);

  return (
    <div className="hud-box d-flex flex-column gap-1">
      <p>Tiempo: {String(time).padStart(4, "0")}</p>
      <div
        className={
          time <= LOW_TIME ? "d-flex gap-1 timer-lives-low" : "d-flex gap-1"
        }
        aria-hidden="true"
      >
        {hearts.map((isOn, index) => (
          <span
            key={index}
            className={isOn ? "timer-heart timer-heart-on" : "timer-heart"}
          />
        ))}
      </div>
    </div>
  );
};
