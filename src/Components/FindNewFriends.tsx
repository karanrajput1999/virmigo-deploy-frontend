import { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import axios from "axios"
import { Link } from "react-router-dom"
import { UserType } from "../Types/types"
import URL from "../url"

function FindNewFriends() {
  const [allUsers, setAllUsers] = useState<UserType[] | null>(null)
  const [friendRequestedUser, setFriendRequestedUser] = useState<string[]>([])

  function getFriendRequestedUserId(friendRequestedUser: UserType[]) {
    const requestedUsers = friendRequestedUser?.map((user) => {
      return user._id
    })
    setFriendRequestedUser(requestedUsers)
  }

  useEffect(() => {
    axios.get(`${URL}/findfriends`, { withCredentials: true }).then((res) => {
      getFriendRequestedUserId(res.data.allFriendRequestsSent)
      setAllUsers(res.data.allUsers)
    })
  }, [])

  function sendFriendRequest(receiverId: string) {
    axios
      .post(`${URL}/findfriends`, { receiverId }, { withCredentials: true })
      .then((res) => {
        setFriendRequestedUser([...friendRequestedUser, receiverId])
      })
      .catch((error) => {
        console.log("error while sending friend request", error)
      })
  }

  function cancelFriendRequest(receiverId: string) {
    axios
      .post(
        `${URL}/findfriends`,
        { cancelRequestId: receiverId },
        { withCredentials: true },
      )
      .then((res) => {
        setFriendRequestedUser(
          friendRequestedUser.filter(
            (friendRequest) => friendRequest !== receiverId,
          ),
        )
      })
      .catch((error) => {
        console.log("error while sending friend request", error)
      })
  }

  return (
    <div className="mx find-new-friends-Container">
      <div>
        <Paper
          elevation={2}
          style={{
            width: "300px",
            height: "400px",
            borderRadius: "10px",
            overflow: "hidden",
            marginInline: "auto",
          }}
        >
          <div className="title-container">
            <span className="title">Find New Friends</span>
          </div>

          <div className="flow friends-container">
            {allUsers?.length === 0 ? (
              <div
                className="flex align-center content-center"
                style={{
                  height: "100%",
                  width: "100%",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#b5b5b5",
                }}
              >
                <span>No new friends!</span>
              </div>
            ) : (
              allUsers &&
              allUsers.map((user) => (
                <div
                  className="flex align-center space-between friend"
                  key={user._id}
                >
                  <div className="flex align-center  friend-left">
                    <div
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={user.profilePic || userIcon}
                        className="icon"
                        alt="user-icon"
                      />
                    </div>
                    <Link
                      className="friends-name"
                      to={`/user/${user._id}`}
                      style={{ color: "black" }}
                    >
                      {user.name}
                    </Link>
                  </div>

                  <button
                    className="flex align-center find-new-friends-add-btn"
                    onClick={() => {
                      if (friendRequestedUser?.includes(user._id)) {
                        cancelFriendRequest(user._id)
                      } else {
                        sendFriendRequest(user._id)
                      }
                    }}
                  >
                    {friendRequestedUser.includes(user._id) ? "Cancel" : "Add"}
                    <PersonAddIcon style={{ paddingLeft: "5px" }} />
                  </button>
                </div>
              ))
            )}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default FindNewFriends
