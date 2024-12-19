import './App.css'
import Header from "./components/Header.tsx";
import Keyboard from "./components/Keyboard.tsx";
import GuessGrid from "./components/GuessGrid.tsx";
import {useState} from "react";
import {LetterStatus, StatusChar} from "./utils/Status.ts";
import keyboardLayout from "./utils/KeyboardLayout.ts";

const App = () => {
    const guessRows = 6
    const wordLength = 5
    const [currentGuessNumber, setCurrentGuessNumber] = useState<number>(1)
    const [guessGridContent, setGuessGridContent] = useState<StatusChar[][]>([...Array(guessRows)].map(() => Array(wordLength).fill(new StatusChar('', LetterStatus.UNUSED))))
    const [keyboardContent, setKeyboardContent] = useState<StatusChar[][]>(keyboardLayout.map(row => row.map(key => new StatusChar(key, LetterStatus.UNUSED))))

    const validateGuess = (correctWord: string, guessWord: string) => {
        const result = guessWord.split('').map(char => new StatusChar(char, LetterStatus.UNUSED))
        const correctFrequencyMap = new Map<string, number>()
        for (const character of correctWord) {
            correctFrequencyMap.set(character, (correctFrequencyMap.get(character) ?? 0) + 1)
        }
        const correctIndices = new Set<number>()
        for (let index = 0; index < wordLength; index++) {
            const guessChar = guessWord[index]
            if (guessChar === correctWord[index]) {
                result[index].status = LetterStatus.CORRECT_POSITION
                correctIndices.add(index)
                correctFrequencyMap.set(guessChar, (correctFrequencyMap.get(guessChar) ?? 1) - 1)
            }
        }
        for (let index = 0; index < wordLength; index++) {
            if (correctIndices.has(index)) continue
            const guessChar = guessWord[index]
            if ((correctFrequencyMap.get(guessChar) ?? 0) > 0) {
                result[index].status = LetterStatus.INCORRECT_POSITION
                correctFrequencyMap.set(guessChar, (correctFrequencyMap.get(guessChar) ?? 1) - 1)
            } else {
                result[index].status = LetterStatus.ABSENT
            }
        }
        return result
    }

    const updateGuessGridContent = (guessNumber: number, guessWord: string) => {
        const updatedGuessGrid = [...guessGridContent]
        for (let index = 0; index < guessWord.length; index++) {
            updatedGuessGrid[guessNumber - 1][index] = new StatusChar(guessWord[index], LetterStatus.UNUSED)
        }
        setGuessGridContent(updatedGuessGrid)
    }

    const updateKeyboardContent = (validationResult: StatusChar[]) => {
        const updatedKeyboardContent = [...keyboardContent]
        const charStatusMap = new Map<string, LetterStatus>()
        for (let index = 0; index < validationResult.length; index++) {
            const guessChar = validationResult[index].char
            if (charStatusMap.has(guessChar) && charStatusMap.get(guessChar) === LetterStatus.CORRECT_POSITION) continue
            charStatusMap.set(guessChar, validationResult[index].status)
        }
        for (let row = 0; row < keyboardContent.length; row++) {
            for (let col = 0; col < keyboardContent[row].length; col++) {
                const keyboardChar = keyboardContent[row][col].char
                if (charStatusMap.has(keyboardChar)) {
                    keyboardContent[row][col] = new StatusChar(keyboardChar, charStatusMap.get(keyboardChar) ?? LetterStatus.UNUSED)
                }
            }
        }
        setKeyboardContent(updatedKeyboardContent)
    }

    const makeGuess = (guessNumber: number, correctWord: string, guessWord: string) => {
        const validationResult = validateGuess(correctWord, guessWord)
        const updatedGuessGrid = [...guessGridContent]
        updatedGuessGrid[guessNumber - 1] = [...validationResult]
        setGuessGridContent(updatedGuessGrid)
        updateKeyboardContent(validationResult)
        if (guessNumber === guessRows) return
        setCurrentGuessNumber(guessNumber + 1)
    }

    return (
        <>
            <Header/>
            <GuessGrid guessGridContent={guessGridContent}/>
            <Keyboard keyboardContent={keyboardContent}
                      currentGuessNumber={currentGuessNumber}
                      wordLength={wordLength}
                      updateGuessGridContent={updateGuessGridContent}
                      makeGuess={makeGuess}/>
        </>
    )
}

export default App