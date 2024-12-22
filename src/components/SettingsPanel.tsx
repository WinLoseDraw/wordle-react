import './SettingsPanel.css'
import Colors from "../utils/Colors.ts";

const SettingsPanel = ({wordLength, resetGame}: {
    wordLength: number,
    resetGame: (length: number) => void,
}) => {
    const buttonGrid = () => {
        const numRows = 2
        const numCols = 3
        const start = 4
        return <div className='button-grid'>
            {[...Array(numRows)].map((_, row) =>
                <div className='button-grid-row' key={row}>
                    {[...Array(numCols)].map((_, col) => {
                        const buttonLength = row * numCols + col + start
                        return <button
                            key={col}
                            style={{
                                backgroundColor: (buttonLength === wordLength) ?
                                    Colors.correctPosition :
                                    Colors.unselectedButtonGrid
                            }}
                            onClick={(e) => {
                                resetGame(buttonLength)
                                if (e.target instanceof HTMLElement) e.target.blur()
                            }}>
                            {row * numCols + col + start}
                        </button>
                    })}
                </div>)}
        </div>
    }

    return (
        <div className='settings-panel'>
            <div className='length-selector'>
                <h3>Word Length</h3>
                {buttonGrid()}
            </div>
            <button className='reset-button' onClick={(e) => {
                resetGame(wordLength)
                if (e.target instanceof HTMLElement) e.target.blur()
            }}>Reset Game
            </button>
        </div>
    )
}

export default SettingsPanel