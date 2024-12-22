import './Header.css'

const Header = ({toggleSettings}: {
    toggleSettings: () => void
}) => {
    return (
        <div className='my-header'>
            <div className='filler'></div>
            <h1>Wordle</h1>
            <button onClick={() => toggleSettings()}>
                <div className='settings-icon'></div>
            </button>
        </div>
    )
}

export default Header