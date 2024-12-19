import './Keyboard.css'
import {useState} from "react";
import {StatusChar} from "../utils/Status.ts";


const Keyboard = ({keyboardContent, currentGuessNumber, wordLength, updateGuessGridContent, makeGuess}: {
    keyboardContent: StatusChar[][],
    currentGuessNumber: number,
    wordLength: number,
    updateGuessGridContent: (guessNumber: number, guessWord: string) => void,
    makeGuess: (guessNumber: number, correctWord: string, guessWord: string) => void,
}) => {
    const [currentGuess, setCurrentGuess] = useState('')

    const pressKey = (key: string) => {
        if (key === 'Enter') {
            if (currentGuess.length < wordLength) return;
            makeGuess(currentGuessNumber, 'APPLE', currentGuess)
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