import './GuessGrid.css'
import {LetterStatus, StatusChar} from "../utils/StatusChar.ts";
import Colors from "../utils/Colors.ts";

const GuessGrid = ({guessGridContent}: { guessGridContent: StatusChar[][] }) => {
    const getTileColor = (status: LetterStatus)=> {
        switch (status) {
            case LetterStatus.UNUSED:
                return 'transparent'
            case LetterStatus.ABSENT:
                return Colors.gridAbsent
            case LetterStatus.INCORRECT_POSITION:
                return Colors.incorrectPosition
            case LetterStatus.CORRECT_POSITION:
                return Colors.correctPosition
        }
    }

    return (
        <div className="guesses">
            {
                guessGridContent.map((guessRow, rowIndex) => (
                    <div className='guess-row' key={rowIndex}>
                        {guessRow.map((guessChar: StatusChar, charIndex) => (
                            <div className='guess-tile' key={charIndex}
                                 style={{
                                     backgroundColor: getTileColor(guessChar.status),
                                     borderColor: guessChar.status === LetterStatus.UNUSED ? Colors.gridBorder : getTileColor(guessChar.status),
                                 }}>{guessChar.char}</div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default GuessGrid