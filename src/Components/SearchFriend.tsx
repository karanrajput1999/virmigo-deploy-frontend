import React, { useEffect, useState } from "react"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Paper } from "@mui/material"
import { Link } from "react-router-dom"
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
  allUsers: UserType[]
}

function SearchFriend({ visible, allUsers }: SearchFriendType) {
  // const [friendId, setFriendId] = useState(null)

  async function sendFriendRequest(friendId: string) {
    axios
      .post(
        "http://localhost:3000/findfriends",
        { friendId },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data)
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
                onClick={() => sendFriendRequest(user._id)}
              >
                Add Friend{" "}
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
