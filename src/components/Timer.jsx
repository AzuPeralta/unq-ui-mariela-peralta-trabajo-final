export const Timer = ({ time, waiting }) => {
  return (
    <div>
      {waiting ? <p>Esperando tu primera palabra...</p> : <p>Tiempo: {time}</p>}
    </div>
  );
};
