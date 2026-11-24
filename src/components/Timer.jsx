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
    <div className="hud-box timer">
      <p>Tiempo: {String(time).padStart(4, "0")}</p>
      <div
        className={
          time <= LOW_TIME ? "timer-lives timer-lives-low" : "timer-lives"
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
