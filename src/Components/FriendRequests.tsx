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
  userProfilePic: string | null
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
  friendRequests: UserType[] | null
  acceptFriendRequest: (senderId: string) => void
}

function FriendRequests({
  visible,
  friendRequests,
  acceptFriendRequest,
}: FriendReqeustsType) {
  console.log("friend requests user inside friend request .tsx", friendRequests)

  function acceptFriendReqeuest(senderId: string) {
    axios
      .post(
        "http://localhost:3000/findfriends",
        { senderId },
        { withCredentials: true },
      )
      .then((res) => {
        console.log("accepted friend request", res.data.senderId)
        acceptFriendRequest(res.data.senderId)
      })
      .catch((error) => {
        console.log("error while accepting friend request", error)
      })
  }
  function declineFriendRequest(rejectSenderId: string) {
    axios
      .post(
        "http://localhost:3000/findfriends",
        { rejectSenderId },
        { withCredentials: true },
      )
      .then((res) => {
        console.log("reject friend request", res.data.rejectSenderId)
        acceptFriendRequest(res.data.rejectSenderId)
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
        {friendRequests ? (
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
            <span>No friend requests!</span>
          </div>
        ) : (
          friendRequests &&
          friendRequests.map((friendRequest) => (
            <div
              className="flex align-center space-between friend-container"
              key={friendRequest._id}
            >
              <div className="flex align-center">
                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={friendRequest.profilePic || userIcon}
                    className="friend-photo"
                    alt="friend photo"
                  />
                </div>
                <span className="findFriends-friendName">
                  {friendRequest.name}
                </span>
              </div>

              <div className="flex friend-requests-btn-container">
                <button
                  className="flex align-center findFriend-add-btn"
                  onClick={() => acceptFriendReqeuest(friendRequest._id)}
                >
                  Accept{" "}
                  <CheckIcon
                    style={{ paddingLeft: "2px", fontSize: "1.5rem" }}
                  />
                </button>
                <button
                  className="flex align-center findFriend-decline-btn"
                  onClick={() => declineFriendRequest(friendRequest._id)}
                >
                  Decline{" "}
                  <CloseIcon
                    style={{ paddingLeft: "2px", fontSize: "1.5rem" }}
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FriendRequests
