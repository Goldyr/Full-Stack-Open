import { connect } from "react-redux"


const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    margin: 10,
    borderWidth: 1
  }
  if(notification){
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  else{
    return (
      <div style={{display:''}}></div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification