import './App.css'

import { useCallback, useEffect, useState } from 'react'

import { StartScreen } from './components/StartScreen/StartScreen'
import { Game } from './components/Game/Game'
import { GameOver } from './components/GameOver/GameOver'
import { wordList } from './data/words'

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    //pick an random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick an random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    return { category, word }
  }, [words])

  const handleStartGame = useCallback(() => {
    //clear letters
    clearLetterStates()

    const { category, word } = pickWordAndCategory()

    //create an letters array
    let wordLetters = word.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  const handleVeriryLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //checks if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const handleRetry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  //clear letters
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //checks if guesses ended
  useEffect(() => {
    if (guesses === 0) {
      //reset all states
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  //checks win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    //win condition
    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === stages[1].name
    ) {
      //add score
      setScore((actualScore) => (actualScore += 100))

      //restart game with new word
      handleStartGame()
    }
  }, [guessedLetters, letters, handleStartGame])

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={handleStartGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={handleVeriryLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={handleRetry} score={score} />}
    </div>
  )
}

export default App
