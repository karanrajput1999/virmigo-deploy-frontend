import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import axios from "axios"
import { Link } from "react-router-dom"

interface UserType {
  _id: string
  name: string
  email: string
  profilePic: string | null
  coverPic: string | null
  posts: string[]
  comments: string[]
  friends: string[]
  friendRequestsSent: string[]
  friendRequests: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

function FindNewFriends() {
  const [allUsers, setAllUsers] = useState<UserType[] | null>(null)
  const [friendRequestedUser, setFriendRequestedUser] = useState<string[]>([])

  function getFriendRequestedUserId(friendRequestedUser: UserType[]) {
    const requestedUsers = friendRequestedUser.map((user) => {
      return user._id
    })
    setFriendRequestedUser(requestedUsers)
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/", { withCredentials: true })
      .then((res) => {
        console.log("received friend request data", res.data)
        getFriendRequestedUserId(res.data.allFriendRequestsSent)
        setAllUsers(res.data.allUsers)
      })
  }, [])

  function sendFriendRequest(friendRequestReceiverId: string) {
    axios
      .post(
        "http://localhost:3000/",
        { friendRequestReceiverId },
        { withCredentials: true },
      )
      .then((res) => {
        setFriendRequestedUser([
          ...friendRequestedUser,
          friendRequestReceiverId,
        ])
        console.log("after sending a friend request", res.data)
      })
      .catch((error) => {
        console.log("error while sending friend request", error)
      })
  }

  function cancelFriendRequest(receiverId: string) {
    axios
      .post(
        "http://localhost:3000/",
        { cancelRequestId: receiverId },
        { withCredentials: true },
      )
      .then((res) => {
        setFriendRequestedUser(
          friendRequestedUser.filter(
            (friendRequest) => friendRequest !== receiverId,
          ),
        )
        console.log("after sending a friend request", res.data)
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
            {allUsers &&
              allUsers.map((user) => (
                <div
                  className="flex align-center space-between friend"
                  key={user._id}
                >
                  <div className="flex align-center  friend-left">
                    <img src={userIcon} className="icon" alt="user-icon" />
                    <Link className="friends-name" to={`/user/${user._id}`}>
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
              ))}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default FindNewFriends
