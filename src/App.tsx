import './App.css'
import Header from "./components/Header.tsx";
import Keyboard from "./components/Keyboard.tsx";
import GuessGrid from "./components/GuessGrid.tsx";
import {useState} from "react";
import {LetterStatus, StatusChar} from "./utils/Status.ts";

const App = () => {
    const guessRows = 6
    const wordLength = 5
    const [guessGridContent, setGuessGridContent] = useState<StatusChar[][]>([...Array(guessRows)].map(() => Array(wordLength).fill({
        char: '',
        status: LetterStatus.UNUSED
    })))
    const [currentGuessNumber, setCurrentGuessNumber] = useState<number>(1)

    const updateGuessGridContent = (guessNumber: number, guessWord: string) => {
        const updatedGuessGrid = [...guessGridContent]
        for (let col = 0; col < wordLength; col++) {
            updatedGuessGrid[guessNumber - 1][col] = {
                char: guessWord[col] ?? '',
                status: LetterStatus.UNUSED
            }
        }
        setGuessGridContent(updatedGuessGrid)
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
        const updatedGuessGrid = [...guessGridContent]
        for (let col = 0; col < wordLength; col++) {
            updatedGuessGrid[guessNumber - 1][col] = {
                char: guessGridContent[guessNumber - 1][col].char,
                status: validationResult[col]
            }
        }
        if (guessNumber === guessRows) return
        setCurrentGuessNumber(guessNumber + 1)
    }

    return (
        <>
            <Header/>
            <GuessGrid guessGridContent={guessGridContent}/>
            <Keyboard currentGuessNumber={currentGuessNumber}
                      wordLength={wordLength}
                      updateGuessGridContent={updateGuessGridContent}
                      makeGuess={makeGuess}/>
        </>
    )
}

export default App