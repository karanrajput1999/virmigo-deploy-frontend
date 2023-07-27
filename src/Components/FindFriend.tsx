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
  // const [posts, setPosts] = useState<NewPostType[]>([])
  const [allUsers, setAllUsers] = useState<UserType[] | null>(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let user = useSelector((state: any) => state.user.adminUser)

  useEffect(() => {
    axios
      .get("http://localhost:3000/findfriends", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          // setPosts(res.data.userWithAllPosts[0].userAllPosts)
          setAllUsers(res.data.allUsers)
          dispatch(getUser(res.data.loggedInUser))
          navigate("/findfriends")
        } else {
          navigate("/login")
        }
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    console.log("this user is form another useEffect", user)

    // axios
    //   .post("http://localhost:3000/makefriends", {
    //     adminUserId: user._id,
    //   })
    //   .then((res) => {
    //     console.log("make friends response", res.data)
    //   })
  }, [user])

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
