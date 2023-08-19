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

function FindFriend() {
  const [openFriendRequestTab, setOpenFriendRequestTab] = useState(false)
  const [allUsers, setAllUsers] = useState<UserType[] | null>(null)
  const [friendRequests, setFriendRequests] = useState<UserType[] | null>(null)
  const [friendRequestsSent, setFriendRequestsSent] = useState<
    UserType[] | null
  >(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  allUsers
  let user = useSelector((state: any) => state.user.adminUser)

  useEffect(() => {
    axios
      .get("http://localhost:3000/findfriends", { withCredentials: true })
      .then((res) => {
        console.log("inside find friend", res.data)

        dispatch(getUser(res.data.loggedInUser))
        setAllUsers(res.data.allUsers)
        setFriendRequests(res.data.allFriendRequests)
        setFriendRequestsSent(res.data.allFriendRequestsSent)
      })
      .catch((error) => {
        console.log("error while making get request to get allUsers", error)
      })
  }, [])

  const acceptFriendRequest = (senderId: string) => {
    const remainingRequests =
      friendRequests?.filter((sender) => sender._id !== senderId) || []
    setFriendRequests(remainingRequests)
  }

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

                {friendRequests && friendRequests.length !== 0 ? (
                  <div className="friend-requests-count flex align-center content-center">
                    {friendRequests.length}
                  </div>
                ) : null}
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="findFriends-container">
        <div className="findFriends-container-wrapper">
          <Paper className="findFriends-paper" elevation={2}>
            <SearchFriend
              visible={openFriendRequestTab}
              allUsers={allUsers}
              friendRequestsSent={friendRequestsSent}
            />

            <FriendRequests
              visible={openFriendRequestTab}
              friendRequests={friendRequests}
              acceptFriendRequest={acceptFriendRequest}
            />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default FindFriend
