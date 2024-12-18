import './Keyboard.css'
import {useState} from "react";


const Keyboard = ({currentGuessNumber, wordLength, updateGuessGrid, makeGuess}: {
    currentGuessNumber: number,
    wordLength: number,
    updateGuessGrid: (guessNumber: number, guessWord: string) => void,
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
        updateGuessGrid(currentGuessNumber, updatedGuess)
    }

    const generateLayout = () => {
        const keyboardLayout = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete', 'Enter']
        ]
        return keyboardLayout.map((row, index) => (
            <div className='keyboard-row' key={index}>
                {row.map((key, index) => (
                    <button className='keyboard-key' key={index} onClick={() => pressKey(key)}>{key}</button>
                ))}
            </div>
        ))
    }

    return (
        <div className='keyboard'>
            {generateLayout()}
        </div>
    )
}

export default Keyboard