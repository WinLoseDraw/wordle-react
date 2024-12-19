import './GuessGrid.css'
import {StatusChar} from "../utils/Status.ts";

const GuessGrid = ({guessGridContent}: { guessGridContent: StatusChar[][] }) => {
    return (
        <div className="guesses">
            {
                guessGridContent.map((guessRow, rowIndex) => (
                    <div className='guess-row' key={rowIndex}>
                        {guessRow.map((guessChar: StatusChar, charIndex) => (
                            <div className='guess-tile' key={charIndex}
                                 style={{backgroundColor: guessChar.getColor()}}>{guessChar.char}</div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default GuessGrid