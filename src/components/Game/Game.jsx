/* eslint-disable react/prop-types */
import { useState, useRef } from 'react'
import './Game.css'

export const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  wrongLetters,
  guessedLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState('')
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)
    setLetter('')
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory.toUpperCase()}</span>
      </h3>

      <p>Você ainda tem {guesses} tentativa(s)</p>

      <section className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="blankSquare">
              {letter.toUpperCase()}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          ),
        )}
      </section>

      <section className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </section>

      <section className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </section>
    </div>
  )
}
