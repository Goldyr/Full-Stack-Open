import { useSelector } from "react-redux";

const Notification = () => {
  let notification = useSelector((state) => state.notification);

  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notification) {
    if (notification.includes("ERROR:"))
      return (
        <div className="error-not" style={errorStyle}>
          {notification}
        </div>
      );
    else {
      return <div style={notificationStyle}>{notification}</div>;
    }
  }
};
export default Notification;
