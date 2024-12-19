import './GuessGrid.css'
import {LetterStatus, StatusChar} from "../utils/Status.ts";

const GuessGrid = ({guessGridContent}: { guessGridContent: StatusChar[][] }) => {
    const getTileColor = (letterStatus: LetterStatus) => {
        switch (letterStatus) {
            case LetterStatus.UNUSED:
                return 'white'
            case LetterStatus.ABSENT:
                return 'red'
            case LetterStatus.INCORRECT_POSITION:
                return 'yellow'
            case LetterStatus.CORRECT_POSITION:
                return 'green'
        }
    }



    return (
        <div className="guesses">
            {
                Array.from({length: guessGridContent.length}).map((_, rowIndex) => (
                    <div className='guess-row' key={rowIndex}>
                        {Array.from({length: guessGridContent[0].length}, (_, charIndex) => (
                            <div className='guess-tile' key={charIndex}
                                 style={{backgroundColor: getTileColor(guessGridContent[rowIndex][charIndex].status)}}>{guessGridContent[rowIndex][charIndex].char}</div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default GuessGrid