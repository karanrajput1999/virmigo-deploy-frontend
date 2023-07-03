import React from "react"
import { Paper } from "@mui/material"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import userIcon from "../assets/user-icon.png"

function Notifications() {
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
          {/******************************  first notification ************************/}
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
          </div>
          {/******************************  second notification ************************/}
          <div className="flex align-center notification-container">
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
          </div>
          {/******************************  third notification ************************/}
          <div className="flex align-center notification-container">
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
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default Notifications
