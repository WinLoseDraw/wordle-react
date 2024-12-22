import Colors from "../utils/Colors.ts";
import './LengthSelector.css'

const LengthSelector = ({wordLength, resetGame}: {
    wordLength: number;
    resetGame: (length: number) => void;
}) => {
    const numRows = 2
    const numCols = 3
    const start = 4
    return (
        <div className='length-selector'>
            <h3>Word Length</h3>
            <div className='button-grid'>
                {[...Array(numRows)].map((_, row) =>
                    <div className='button-grid-row' key={row}>
                        {[...Array(numCols)].map((_, col) => {
                            const buttonLength = row * numCols + col + start
                            const selectedButton = (buttonLength === wordLength)
                            return (
                                <button key={col}
                                        disabled={selectedButton}
                                        style={{
                                            backgroundColor: selectedButton ?
                                                Colors.correctPosition :
                                                Colors.unselectedButtonGrid
                                        }}
                                        onClick={(e) => {
                                            resetGame(buttonLength)
                                            if (e.target instanceof HTMLElement) e.target.blur()
                                        }}>
                                    {row * numCols + col + start}
                                </button>
                            )
                        })}
                    </div>)}
            </div>
        </div>
    )
}

export default LengthSelector