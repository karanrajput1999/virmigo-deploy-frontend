import React, { useEffect, useState } from "react"
import axios from "axios"
import userIcon from "../assets/user-icon.png"
import userCover from "../assets/profile-cover.jpg"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Paper from "@mui/material/Paper"
import Post from "./Post"
import EditIcon from "@mui/icons-material/Edit"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useParams } from "react-router-dom"

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

function Profile() {
  const [open, setOpen] = useState(false)
  const [postTabVisible, setPostTabVisible] = useState(true)
  const [user, setUser] = useState<UserType | null>(null)
  const [loggedInuser, setLoggedInUser] = useState<UserType | null>(null)
  const [friends, setFriends] = useState<string[] | null>(null)
  const { userId } = useParams()

  console.log("lets see if we got this now ", friends)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${userId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setLoggedInUser(res.data.loggedInUser)
        setUser(res.data.userProfile)
        friendIds(res.data.userAllFriends)
      })
      .catch((error) => {
        console.log("erorr while fetching profile", error.message)
      })
  }, [userId])

  function friendIds(userFriend: UserType[]) {
    const userIds = userFriend.map((user: UserType) => {
      return user._id
    })
    setFriends(userIds)
  }

  return (
    <div className="profile-container">
      <div className="flex content-center flex-column profile-header-container">
        <div className="mx-auto profile-header-wrapper">
          <div>
            <div className="profile-cover">
              <img className="cover-img" src={userCover} alt="" />
            </div>
            <div className="flex profile-user-info">
              <img src={userIcon} alt="" className="profile-user-pic" />
              <div className="flex flex-column profile-username-container">
                <span className="profile-username">{user?.name}</span>
                <span className="profile-friends">170 Friends</span>
              </div>
              <div className="profile-addfriend">
                {loggedInuser?._id === userId ? (
                  <>
                    <button
                      className="flex align-center content-center editProfile-btn"
                      onClick={handleClickOpen}
                    >
                      Edit Profile
                      <EditIcon
                        style={{ paddingLeft: "5px", fontSize: "2rem" }}
                      />
                    </button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle
                        className="updateProfile-title"
                        style={{
                          fontSize: "2rem",
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        Update profile details!
                      </DialogTitle>
                      <DialogContent>
                        {/* <DialogContentText>
                          To subscribe to this website, please enter your email
                          address here. We will send updates occasionally.
                        </DialogContentText> */}
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Name"
                          type="text"
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                        <TextField
                          margin="dense"
                          id="email"
                          label="Email Address"
                          type="email"
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                        <TextField
                          margin="dense"
                          id="bio"
                          label="Bio"
                          type="text"
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                        <TextField
                          margin="dense"
                          id="name"
                          label="State / Country"
                          type="text"
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          className="flex align-center content-center updateProfile-btn"
                          onClick={handleClose}
                        >
                          Update Profile
                          <CheckCircleIcon
                            style={{ paddingLeft: "5px", fontSize: "2rem" }}
                          />
                        </button>
                        <button
                          className="flex align-center content-center cancleUpdateProfile-btn"
                          onClick={handleClose}
                        >
                          Cancel
                          <CloseIcon
                            style={{ paddingLeft: "5px", fontSize: "2rem" }}
                          />
                        </button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : user && friends?.includes(user._id) ? (
                  <button className="flex align-center content-center unfriendProfile-btn">
                    Unfriend
                    <PersonRemoveIcon
                      style={{ paddingLeft: "5px", fontSize: "2rem" }}
                    />
                  </button>
                ) : (
                  <button className="flex align-center content-center addfriend-btn">
                    Add Friend
                    <PersonAddIcon
                      style={{ paddingLeft: "5px", fontSize: "2rem" }}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex tabs-container">
            <div
              className={`tab post-tab ${postTabVisible ? "active" : ""}`}
              onClick={() => {
                setPostTabVisible(true)
              }}
            >
              <span>Posts</span>
            </div>

            <div
              className={`tab friends-tab ${postTabVisible ? "" : "active"}`}
              onClick={() => {
                setPostTabVisible(false)
              }}
            >
              <span>Friends</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex content-center profile-body-container">
        <div
          className="flex profile-body-wrapper"
          style={{
            display: postTabVisible ? "flex" : "none",
          }}
        >
          <div className="profile-info-container">
            <div style={{ marginTop: "2rem" }}>
              <Paper
                elevation={2}
                className="profile-info-paper"
                style={{ height: "20rem", width: "300px" }}
              >
                <div className="profile-info-title">
                  <span className="profile-info-title-text">Information</span>
                </div>

                <div className="profile-info-text">
                  <div className="profile-info-live">
                    <span className="profile-info-live-title information-title">
                      Lives in -{" "}
                    </span>
                    <span className="profile-info-live-text">
                      Lahore, India 🚩
                    </span>
                  </div>
                  <div className="profile-info-bio">
                    <span className="profile-info-bio-title information-title">
                      Bio -{" "}
                    </span>
                    <span className="profile-info-bio-text">
                      This is some bio text 😎
                    </span>
                  </div>
                </div>
              </Paper>
            </div>
          </div>

          <div className="profile-posts-container">
            <div className="profile-posts-wrapper">
              <div className="profile-posts-title">
                <span>Posts</span>
              </div>
              <div className="profile-posts-post-container">
                <Post />
              </div>
            </div>
          </div>
        </div>

        {/********************************************* second wrapper *************************************/}
        <div
          className="flex profile-body-wrapper"
          style={{
            display: postTabVisible ? "none" : "flex",
          }}
        >
          <div className="profile-info-container">
            <div style={{ marginTop: "2rem" }}>
              <div className="flex flex-column profile-body-friends-container">
                {/* first friend */}
                <div className="flex align-center profile-body-friend">
                  <img
                    src={userIcon}
                    alt="friend"
                    className="profile-body-icon"
                  />
                  <span className="profile-body-friend-name">
                    Anshu Upadhyay
                  </span>
                </div>
                {/* second friend */}
                <div className="flex align-center profile-body-friend">
                  <img
                    src={userIcon}
                    alt="friend"
                    className="profile-body-icon"
                  />
                  <span className="profile-body-friend-name">Vinay Pandit</span>
                </div>
                {/* third friend */}
                <div className="flex align-center profile-body-friend">
                  <img
                    src={userIcon}
                    alt="friend"
                    className="profile-body-icon"
                  />
                  <span className="profile-body-friend-name">Hardik Patel</span>
                </div>
                {/* fourth friend */}
                <div className="flex align-center profile-body-friend">
                  <img
                    src={userIcon}
                    alt="friend"
                    className="profile-body-icon"
                  />
                  <span className="profile-body-friend-name">Sonu Verma</span>
                </div>
                {/* fifth friend */}
                <div className="flex align-center profile-body-friend">
                  <img
                    src={userIcon}
                    alt="friend"
                    className="profile-body-icon"
                  />
                  <span className="profile-body-friend-name">
                    Himanshu Sharma
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
