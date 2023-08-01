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

interface FriendReqeustsType {
  visible: boolean
}

function FriendRequests({ visible }: FriendReqeustsType) {
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <div className="findFriends-header">
        <span className="findFriends-title">Friend Requests</span>
      </div>

      <div className="findFriends-friendlist-container friend-requests-container">
        <div className="flex align-center space-between friend-container">
          <div className="flex align-center">
            <img src={userIcon} className="friend-photo" alt="friend photo" />
            <span className="findFriends-friendName">someone</span>
          </div>

          <div className="flex friend-requests-btn-container">
            <button className="flex align-center findFriend-add-btn">
              Accept{" "}
              <CheckIcon style={{ paddingLeft: "2px", fontSize: "1.5rem" }} />
            </button>
            <button className="flex align-center findFriend-decline-btn">
              Decline{" "}
              <CloseIcon style={{ paddingLeft: "2px", fontSize: "1.5rem" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendRequests
