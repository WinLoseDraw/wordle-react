import './Guesses.css'

const Guesses = ({guessGrid}: { guessGrid: string[][] }) => {
    return (
        <div className="guesses">
            {
                Array.from({length: guessGrid.length}).map((_, rowIndex) => (
                    <div className='guess-row' key={rowIndex}>
                        {Array.from({length: guessGrid[0].length}, (_, charIndex) => (
                            <div className='guess-tile' key={charIndex}>{guessGrid[rowIndex][charIndex]}</div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default Guesses