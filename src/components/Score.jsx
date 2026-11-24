export const Score = ({ score }) => {
  return <p className="hud-box">Puntaje: {String(score).padStart(4, "0")}</p>;
};
