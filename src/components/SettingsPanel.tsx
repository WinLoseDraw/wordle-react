import './SettingsPanel.css'
import LengthSelector from "./LengthSelector.tsx";

const SettingsPanel = ({wordLength, resetGame}: {
    wordLength: number,
    resetGame: (length: number) => void,
}) => {
    return (
        <div className='settings-panel'>
            <LengthSelector wordLength={wordLength}
                            resetGame={resetGame}
            />
            <button className='reset-button' onClick={(e) => {
                resetGame(wordLength)
                if (e.target instanceof HTMLElement) e.target.blur()
            }}>Reset Game
            </button>
        </div>
    )
}

export default SettingsPanel