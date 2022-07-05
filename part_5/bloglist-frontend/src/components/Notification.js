const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    if(message !== null){
        if(message.includes('ERROR:'))
            return(
                <div className="error-not"style={errorStyle}>
                    {message}
                </div>
            )
        else{
            return(
                <div style={notificationStyle}>
                    {message}
                </div>
            )
        }
    }
    return null

}
export default Notification