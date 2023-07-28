import React from "react"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Paper } from "@mui/material"
import { Link } from "react-router-dom"

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
  console.log("this is users from search friend", allUsers)

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
            <Link
              className="flex align-center space-between friend-container"
              key={user._id}
              to={`/user/${user._id}`}
            >
              <div className="flex align-center">
                <img
                  src={userIcon}
                  className="friend-photo"
                  alt="friend photo"
                />
                <span className="findFriends-friendName">{user.name}</span>
              </div>
              <button className="flex align-center findFriend-add-btn">
                Add Friend{" "}
                <PersonAddIcon
                  style={{ paddingLeft: "5px", fontSize: "1.5rem" }}
                />
              </button>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default SearchFriend
