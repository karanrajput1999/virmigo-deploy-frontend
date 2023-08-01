import React, { useState, useEffect } from "react"
import { Paper } from "@mui/material"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SearchFriend from "./SearchFriend"
import FriendRequests from "./FriendRequests"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../app/features/userSlice"
import { useNavigate } from "react-router-dom"

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

function FindFriend() {
  const [openFriendRequestTab, setOpenFriendRequestTab] = useState(false)
  const [allUsers, setAllUsers] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  allUsers
  let user = useSelector((state: any) => state.user.adminUser)

  useEffect(() => {
    axios
      .get("http://localhost:3000/findfriends", { withCredentials: true })
      .then((res) => {
        setAllUsers(res.data.allUsers)
      })
      .catch((error) => {
        console.log("error while making get request to get allUsers", error)
      })
  }, [])

  return (
    <div className="flex find-friend-container">
      <div className="make-friends-container">
        <div className="make-friends-wrapper">
          <Paper
            elevation={2}
            style={{
              width: "280px",
              height: "180px",
            }}
          >
            <div className="make-friends-header">
              <span className="make-friends-title">Make Friends</span>
            </div>
            <div className="make-friends-body">
              <div
                className="flex align-center find-new-friend-container"
                onClick={() => setOpenFriendRequestTab(false)}
              >
                <PeopleAltIcon
                  style={{
                    marginInline: "0.8rem",
                    fontSize: "1.8rem",
                    color: "#5600ac",
                  }}
                />
                <span className="make-friends-tab-title">Find Friends</span>
              </div>
              <div
                className="flex align-center friend-request-container"
                onClick={() => setOpenFriendRequestTab(true)}
              >
                <AccountCircleIcon
                  style={{
                    marginInline: "0.8rem",
                    fontSize: "1.8rem",
                    color: "#5600ac",
                  }}
                />
                <span className="make-friends-tab-title">Friend Requests</span>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="findFriends-container">
        <div className="findFriends-container-wrapper">
          <Paper className="findFriends-paper" elevation={2}>
            <SearchFriend visible={openFriendRequestTab} allUsers={allUsers} />

            <FriendRequests visible={openFriendRequestTab} />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default FindFriend
