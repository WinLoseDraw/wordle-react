import './Keyboard.css'
import {useEffect} from "react";
import {LetterStatus, StatusChar} from "../utils/StatusChar.ts";
import Colors from "../utils/Colors.ts";


const Keyboard = ({keyboardContent, pressKey}: {
    keyboardContent: StatusChar[][],
    pressKey: (key: string) => void,
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


    const getKeyColor = (status: LetterStatus) => {
        switch (status) {
            case LetterStatus.UNUSED:
                return Colors.defaultKeyboardKey
            case LetterStatus.ABSENT:
                return Colors.absentKeyboardKey
            case LetterStatus.INCORRECT_POSITION:
                return Colors.incorrectPosition
            case LetterStatus.CORRECT_POSITION:
                return Colors.correctPosition
        }
    }

    return (
        <div className='keyboard'>
            {keyboardContent.map((keyboardRow, index) => (
                <div className='keyboard-row' key={index}>
                    {keyboardRow.map((keyboardKey, index) => (
                        <button className='keyboard-key' key={index}
                                style={{backgroundColor: getKeyColor(keyboardKey.status)}}
                                onClick={() => pressKey(keyboardKey.char)}>{keyboardKey.char}</button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard