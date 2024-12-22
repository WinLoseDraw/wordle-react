import './Header.css'

const Header = () => {
    return (
        <div className='my-header'>
            <div className='filler'></div>
            <h1>Wordle</h1>
            <button>
                <div className='settings-icon'></div>
            </button>
        </div>
    )
}

export default Header