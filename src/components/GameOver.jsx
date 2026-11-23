export const GameOver = ({wordCount, score, onRestart}) => {

    return (
        <div>
            <h2>¡Terminó tu partida!</h2>
            <p>Encadenaste {wordCount} palabras</p>
            <p>Tu puntaje final es {score}</p>
            <button onClick={onRestart}>Jugar otra vez</button>
        </div>
    )
}