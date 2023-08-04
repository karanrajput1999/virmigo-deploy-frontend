import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import axios from "axios"

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/", { withCredentials: true })
      .then((res) => {
        setAllUsers(res.data.allUsers)
      })
  }, [])

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
                    <span className="friends-name">{user.name}</span>
                  </div>

                  <button className="flex align-center find-new-friends-add-btn">
                    Add <PersonAddIcon style={{ paddingLeft: "5px" }} />
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
