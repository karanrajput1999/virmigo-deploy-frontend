import { useEffect, useState } from "react"
import { Paper } from "@mui/material"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import userIcon from "../assets/user-icon.png"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../app/features/userSlice"
import axios from "axios"
import { UserType } from "../Types/types"
import URL from "../url"

interface notificationType {
  _id: string
  sender: number
  receiver: number
  status: number
  notificationSender: UserType[]
}

function Notifications() {
  const [notifications, setNotifications] = useState<notificationType[] | null>(
    null,
  )

  const user = useSelector((state: any) => state.user.adminUser)

  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get(`${URL}/notifications`, { withCredentials: true })
      .then((res) => {
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
        <Paper
          className="notification-paper"
          elevation={2}
          style={{ overflowY: "auto" }}
        >
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
          {notifications?.length === 0 ? (
            <div
              className="flex align-center content-center"
              style={{
                height: "90%",
                width: "100%",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#b5b5b5",
              }}
            >
              <span>No notifications to show!</span>
            </div>
          ) : (
            notifications &&
            notifications?.map((notification) => (
              <div
                className="flex align-center notification-container"
                key={notification._id}
              >
                <span className="flex align-center notification-text">
                  <span className="flex align-center notification-user">
                    <span
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        marginRight: ".5rem",
                      }}
                    >
                      <img
                        src={
                          notification.notificationSender[0].profilePic ||
                          userIcon
                        }
                        className="notification-user-icon"
                        alt="user-photo"
                      />
                    </span>
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
            ))
          )}
        </Paper>
      </div>
    </div>
  )
}

export default Notifications
