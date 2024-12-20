import './Keyboard.css'
import {useEffect, useState} from "react";
import {StatusChar} from "../utils/StatusChar.ts";


const Keyboard = ({keyboardContent, keyboardEnabled, currentGuessNumber, wordLength, updateGuessGridContent, makeGuess}: {
    keyboardContent: StatusChar[][],
    keyboardEnabled: boolean,
    currentGuessNumber: number,
    wordLength: number,
    updateGuessGridContent: (guessNumber: number, guessWord: string) => void,
    makeGuess: (guessWord: string) => void,
}) => {

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            const pressedKey = e.key
            if (pressedKey === 'Enter') {
                pressKey('Enter')
            } else if (pressedKey === 'Backspace') {
                pressKey('Delete')
            } else if (pressedKey.length === 1 && pressedKey.match(/^[a-zA-Z]+$/)) {
                pressKey(pressedKey.toUpperCase())
            }
        }
        document.addEventListener("keydown", handleKeydown)
        return () => {
            document.removeEventListener("keydown", handleKeydown)
        }
    })

    const [currentGuess, setCurrentGuess] = useState('')

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

    return (
        <div className='keyboard'>
            {keyboardContent.map((keyboardRow, index) => (
                <div className='keyboard-row' key={index}>
                    {keyboardRow.map((keyboardKey, index) => (
                        <button className='keyboard-key' key={index} style={{backgroundColor: keyboardKey.getColor()}}
                                onClick={() => pressKey(keyboardKey.char)}>{keyboardKey.char}</button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard