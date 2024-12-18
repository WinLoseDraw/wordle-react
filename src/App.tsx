import './App.css'
import Header from "./components/Header.tsx";
import Keyboard from "./components/Keyboard.tsx";
import Guesses from "./components/Guesses.tsx";
import {useState} from "react";
import LetterStatus from "./utils/LetterStatus.ts";

const App = () => {
    const guessRows = 5
    const wordLength = 5
    const [guessGrid, setGuessGrid] = useState<string[][]>([...Array(guessRows)].map(() => Array(wordLength).fill('')))
    const [currentGuessNumber, setCurrentGuessNumber] = useState<number>(1)

    const updateGuessGrid = (guessNumber: number, guessWord: string) => {
        const updatedGuessMatrix = [...guessGrid]
        for (let col = 0; col < wordLength; col++) {
            updatedGuessMatrix[guessNumber - 1][col] = guessWord[col] ?? ''
        }
        setGuessGrid(updatedGuessMatrix)
    }

    const validateGuess = (correctWord: string, guessWord: string) => {
        const result = new Array<LetterStatus>(wordLength)
        const correctFrequencyMap = new Map<string, number>()
        for (const character of correctWord) {
            correctFrequencyMap.set(character, (correctFrequencyMap.get(character) ?? 0) + 1)
        }
        for (let index = 0; index < wordLength; index++) {
            const guessChar = guessWord[index]
            if ((correctFrequencyMap.get(guessChar) ?? 0) > 0) {
                if (correctWord[index] === guessChar) {
                    result[index] = LetterStatus.CORRECT_POSITION
                } else result[index] = LetterStatus.INCORRECT_POSITION
                correctFrequencyMap.set(guessChar, (correctFrequencyMap.get(guessChar) ?? 1) - 1)
            } else {
                result[index] = LetterStatus.ABSENT
            }
        }
        return result
    }

    const makeGuess = (guessNumber: number, correctWord: string, guessWord: string) => {
        const validationResult = validateGuess(correctWord, guessWord)
        console.log(validationResult)
        setCurrentGuessNumber(guessNumber + 1)
    }

    return (
        <>
            <Header/>
            <Guesses guessGrid={guessGrid}/>
            <Keyboard currentGuessNumber={currentGuessNumber} wordLength={wordLength}
                      updateGuessGrid={updateGuessGrid}
                      makeGuess={makeGuess}/>
        </>
    )
}

export default App