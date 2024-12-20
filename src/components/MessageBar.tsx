import './MessageBar.css'

const MessageBar = ({message}: {message: string}) => {
    return (
        <div className="message-bar">
            {message}
        </div>
    )
}

export default MessageBar