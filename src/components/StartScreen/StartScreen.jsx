/* eslint-disable react/prop-types */
import './StartScreen.css'

export const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <h1>
        Secret <span className="letters">W</span>
        <span className="letters">O</span>
        <span className="letters">R</span>
        <span className="letters">D</span>
      </h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}
