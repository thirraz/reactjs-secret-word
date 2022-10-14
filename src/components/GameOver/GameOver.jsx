/* eslint-disable react/prop-types */
import './GameOver.css'

export const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game Over!</h1>
      <h2>
        Pontuação total: <span>{score}</span>
      </h2>
      <button onClick={retry}>Reiniciar o jogo</button>
    </div>
  )
}
