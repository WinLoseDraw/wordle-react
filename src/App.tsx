import './App.css'
import Header from "./components/Header.tsx";
import Keyboard from "./components/Keyboard.tsx";
import GuessGrid from "./components/GuessGrid.tsx";
import {useState} from "react";
import {LetterStatus, StatusChar} from "./utils/StatusChar.ts";
import KeyboardLayout from "./utils/KeyboardLayout.ts";
import MessageBar from "./components/MessageBar.tsx";
import {getRandomWord} from "./utils/Words.ts";
import SettingsPanel from "./components/SettingsPanel.tsx";

const App = () => {
    const guessRows = 6
    const defaultWordLength = 5
    const [wordLength, setWordLength] = useState<number>(defaultWordLength)
    const [correctWord, setCorrectWord] = useState<string>(getRandomWord(wordLength))
    const [currentGuessNumber, setCurrentGuessNumber] = useState<number>(1)
    const [keyboardEnabled, setKeyboardEnabled] = useState<boolean>(true)
    const [message, setMessage] = useState<string>('')
    const [currentGuess, setCurrentGuess] = useState<string>('')
    const [guessGridContent, setGuessGridContent] = useState<StatusChar[][]>([...Array(guessRows)].map(() => Array(correctWord.length).fill(new StatusChar('', LetterStatus.UNUSED))))
    const [keyboardContent, setKeyboardContent] = useState<StatusChar[][]>(KeyboardLayout.map(row => row.map(key => new StatusChar(key, LetterStatus.UNUSED))))
    const [showSettings, setShowSettings] = useState<boolean>(true)

    const pressKey = (key: string) => {
        if (!keyboardEnabled) return
        if (key === 'Enter') {
            if (currentGuess.length < wordLength) return
            makeGuess(currentGuess)
            setCurrentGuess('')
            return
        }
        if (key === 'Delete' && currentGuess.length === 0) return
        const updatedGuess = (key === 'Delete') ? currentGuess.slice(0, -1) : currentGuess + key
        if (updatedGuess.length > wordLength) return
        setCurrentGuess(updatedGuess)
        updateGuessGridContent(currentGuessNumber, updatedGuess)
    }

    const validateGuess = (correctWord: string, guessWord: string) => {
        const result = guessWord.split('').map(char => new StatusChar(char, LetterStatus.UNUSED))
        const correctFrequencyMap = new Map<string, number>()
        for (const character of correctWord) {
            correctFrequencyMap.set(character, (correctFrequencyMap.get(character) ?? 0) + 1)
        }
        const correctIndices = new Set<number>()
        for (let index = 0; index < correctWord.length; index++) {
            const guessChar = guessWord[index]
            if (guessChar === correctWord[index]) {
                result[index].status = LetterStatus.CORRECT_POSITION
                correctIndices.add(index)
                correctFrequencyMap.set(guessChar, (correctFrequencyMap.get(guessChar) ?? 1) - 1)
            }
        }
        for (let index = 0; index < correctWord.length; index++) {
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
        for (let index = 0; index < wordLength; index++) {
            updatedGuessGrid[guessNumber - 1][index] = new StatusChar(guessWord[index] ?? '', LetterStatus.UNUSED)
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

    const checkWin = (validationResult: StatusChar[]) => {
        let win = true
        for (const resultChar of validationResult) {
            if (resultChar.status !== LetterStatus.CORRECT_POSITION) {
                win = false
                break
            }
        }
        return win
    }

    const makeGuess = (guessWord: string) => {
        const validationResult = validateGuess(correctWord, guessWord)
        const updatedGuessGrid = [...guessGridContent]
        updatedGuessGrid[currentGuessNumber - 1] = [...validationResult]
        setGuessGridContent(updatedGuessGrid)
        updateKeyboardContent(validationResult)
        if (checkWin(validationResult)) {
            setKeyboardEnabled(false)
        } else if (currentGuessNumber === guessRows) {
            setMessage(`${correctWord}`)
            setKeyboardEnabled(false)
        }
        setCurrentGuessNumber(currentGuessNumber + 1)
    }

    const resetGame = (length: number) => {
        setWordLength(length)
        setCorrectWord(getRandomWord(length))
        setCurrentGuessNumber(1)
        setKeyboardEnabled(true)
        setMessage('')
        setCurrentGuess('')
        setGuessGridContent([...Array(guessRows)].map(() => Array(length).fill(new StatusChar('', LetterStatus.UNUSED))))
        setKeyboardContent(KeyboardLayout.map(row => row.map(key => new StatusChar(key, LetterStatus.UNUSED))))
    }

    const toggleSettings = () => {
        setShowSettings(!showSettings)
    }

    return (
        <div className='app'>
            <div className='game-window'>
                <Header toggleSettings={toggleSettings}/>
                <GuessGrid guessGridContent={guessGridContent}/>
                <MessageBar message={message}/>
                <Keyboard keyboardContent={keyboardContent}
                          pressKey={pressKey}/>
            </div>
            {showSettings ? <SettingsPanel wordLength={wordLength} resetGame={resetGame}/> : <></>}
        </div>
    )
}

export default App