import React, { useEffect, useState } from "react"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { Paper } from "@mui/material"
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

interface FriendReqeustsType {
  visible: boolean
  friendRequests: UserType[]
  addFriend: (newFriend: UserType) => void
}

function FriendRequests({
  visible,
  friendRequests,
  addFriend,
}: FriendReqeustsType) {
  async function acceptRequest(acceptFriendId: string) {
    axios
      .post(
        "http://localhost:3000/findfriends",
        {
          acceptFriendId,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log("friend requests axios called", res.data.newFriendId)

        addFriend(res.data.newFriendId)
      })
      .catch((error) => {
        console.log("error while accepting friend request", error)
      })
  }
  async function declineRequest(declineFriendId: string) {
    axios
      .post(
        "http://localhost:3000/findfriends",
        {
          declineFriendId,
        },
        { withCredentials: true },
      )
      .then((res) => {
        addFriend(res.data.declineFriendId)
      })
      .catch((error) => {
        console.log("error while accepting friend request", error)
      })
  }

  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <div className="findFriends-header">
        <span className="findFriends-title">Friend Requests</span>
      </div>

      <div className="findFriends-friendlist-container friend-requests-container">
        {friendRequests &&
          friendRequests.map((friendRequestUser) => (
            <div
              className="flex align-center space-between friend-container"
              key={friendRequestUser._id}
            >
              <div className="flex align-center">
                <img
                  src={userIcon}
                  className="friend-photo"
                  alt="friend photo"
                />
                <span className="findFriends-friendName">
                  {friendRequestUser.name}
                </span>
              </div>

              <div className="flex friend-requests-btn-container">
                <button
                  className="flex align-center findFriend-add-btn"
                  onClick={() => acceptRequest(friendRequestUser._id)}
                >
                  Accept{" "}
                  <CheckIcon
                    style={{ paddingLeft: "2px", fontSize: "1.5rem" }}
                  />
                </button>
                <button
                  className="flex align-center findFriend-decline-btn"
                  onClick={() => declineRequest(friendRequestUser._id)}
                >
                  Decline{" "}
                  <CloseIcon
                    style={{ paddingLeft: "2px", fontSize: "1.5rem" }}
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default FriendRequests
