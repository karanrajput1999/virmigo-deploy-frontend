import React, { useEffect, useState } from "react"
import { Paper } from "@mui/material"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import userIcon from "../assets/user-icon.png"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../app/features/userSlice"
import axios from "axios"

function Notifications() {
  const [notifications, setNotifications] = useState(null)

  const user = useSelector((state: any) => state.user.adminUser)
  console.log(user)

  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get("http://localhost:3000/notifications", { withCredentials: true })
      .then((res) => {
        console.log("notifications data", res.data.notifications)
        setNotifications(res.data.notifications)
        dispatch(getUser(res.data.loggedInUser))
      })
      .catch((error) => {
        console.log("error while fetching notifications", error)
      })
  }, [])

  return (
    <div className="flex align-center content-center notifications-container">
      <div className="notifications-wrapper">
        <Paper className="notification-paper" elevation={2}>
          <div className="flex align-center notifications-title-container">
            <span className="flex align-center notification-title">
              Notifications{" "}
              <NotificationsActiveIcon
                style={{
                  color: "#5600ac",
                  fontSize: "2rem",
                  marginLeft: ".5rem",
                }}
              />
            </span>
          </div>
          {notifications &&
            notifications.map((notification) => (
              <div
                className="flex align-center notification-container"
                key={notification._id}
              >
                <span className="flex align-center notification-text">
                  <span className="flex align-center notification-user">
                    <img
                      src={userIcon}
                      className="notification-user-icon"
                      alt="user-photo"
                    />
                    {notification.notificationSender[0].name}&nbsp;
                  </span>
                  {notification.status === 1
                    ? "sent you a friend request."
                    : notification.status === 2
                    ? "accepted you a friend request."
                    : notification.status === 3
                    ? "liked your post."
                    : notification.status === 4
                    ? "commented on your post."
                    : null}
                </span>
              </div>
            ))}
          {/* 
          <div className="flex align-center notification-container">
            <span className="flex align-center notification-text">
              <span className="flex align-center notification-user">
                <img
                  src={userIcon}
                  className="notification-user-icon"
                  alt="user-photo"
                />
                John Doe&nbsp;
              </span>
              liked your post.
            </span>
          </div> */}
          {/******************************  first notification ************************/}
          {/* <div className="flex align-center notification-container">
            <span className="flex align-center notification-text">
              <span className="flex align-center notification-user">
                <img
                  src={userIcon}
                  className="notification-user-icon"
                  alt="user-photo"
                />
                John Doe&nbsp;
              </span>
              liked your post.
            </span>
          </div> */}
          {/******************************  second notification ************************/}
          {/* <div className="flex align-center notification-container">
            <span className="flex align-center notification-text">
              <span className="flex align-center notification-user">
                <img
                  src={userIcon}
                  className="notification-user-icon"
                  alt="user-photo"
                />
                Anshu Upadhyay&nbsp;
              </span>
              accepted your friend request.
            </span>
          </div> */}
          {/******************************  third notification ************************/}
          {/* <div className="flex align-center notification-container">
            <span className="flex align-center notification-text">
              <span className="flex align-center notification-user">
                <img
                  src={userIcon}
                  className="notification-user-icon"
                  alt="user-photo"
                />
                Hardik Patel&nbsp;
              </span>
              commented on your post.
            </span>
          </div> */}
        </Paper>
      </div>
    </div>
  )
}

export default Notifications
