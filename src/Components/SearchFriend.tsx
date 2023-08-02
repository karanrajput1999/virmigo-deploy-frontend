import React, { useEffect, useState } from "react"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Paper } from "@mui/material"
import { Link, useAsyncError } from "react-router-dom"
import axios from "axios"

interface NewPostType {
  _id: string
  description: string
  image: string | null
  likes: []
  comments: []
  userId: string
  username: string
  createdAt: string
  updatedAt: string
  __v: number
}
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
  userAllPosts: NewPostType[]
}
interface SearchFriendType {
  visible: boolean
  allUsers: UserType[] | null
  friendRequestsSent: UserType[] | null
}

function SearchFriend({
  visible,
  allUsers,
  friendRequestsSent,
}: SearchFriendType) {
  const [friendRequestedUser, setFriendRequestedUser] = useState<string[]>([])

  useEffect(() => {
    if (friendRequestsSent) {
      const requestedUser = friendRequestsSent?.map((friendRequest) => {
        return friendRequest._id
      })
      setFriendRequestedUser(requestedUser)
    }
  }, [friendRequestsSent])

  function sendFriendRequest(receiverId: string) {
    axios
      .post(
        "http://localhost:3000/findfriends",
        { receiverId },
        { withCredentials: true },
      )
      .then((res) => {
        setFriendRequestedUser([...friendRequestedUser, receiverId])
        console.log("after sending a friend request", res.data)
      })
      .catch((error) => {
        console.log("error while sending friend request", error)
      })
  }

  function cancelFriendRequest(receiverId: string) {
    axios
      .post(
        "http://localhost:3000/findfriends",
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
    <div style={{ display: visible ? "none" : "block" }}>
      {" "}
      <div className="findFriends-header">
        <span className="findFriends-title">Find Friends</span>
      </div>
      <div className="findFriends-searchbar-container">
        <input
          className="findFriends-input"
          type="text"
          placeholder="Search your friend's name..."
        />
      </div>
      <div className="findFriends-friendlist-container">
        {allUsers &&
          allUsers.map((user) => (
            <div
              className="flex align-center space-between friend-container"
              key={user._id}
            >
              <div className="flex align-center">
                <img
                  src={userIcon}
                  className="friend-photo"
                  alt="friend photo"
                />
                <Link
                  className="findFriends-friendName"
                  to={`/user/${user._id}`}
                >
                  {user.name}
                </Link>
              </div>
              <button
                className="flex align-center findFriend-add-btn"
                onClick={() => {
                  if (friendRequestedUser?.includes(user._id)) {
                    cancelFriendRequest(user._id)
                  } else {
                    sendFriendRequest(user._id)
                  }
                }}
              >
                {friendRequestedUser?.includes(user._id)
                  ? "Cancle Request"
                  : "Add Friend"}

                <PersonAddIcon
                  style={{ paddingLeft: "5px", fontSize: "1.5rem" }}
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SearchFriend
