import React, { useState } from "react"
import userIcon from "../assets/user-icon.png"
import userCover from "../assets/profile-cover.jpg"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Paper from "@mui/material/Paper"
import Post from "./Post"
import EditIcon from "@mui/icons-material/Edit"
// partition
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

function Profile() {
  const isAdmin = true

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
                <span className="profile-username">Anshu Upadhyay</span>
                <span className="profile-friends">170 Friends</span>
              </div>
              <div className="profile-addfriend">
                {isAdmin ? (
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
                        <button className="flex align-center content-center updateProfile-btn">
                          Update Profile
                          <CheckCircleIcon
                            style={{ paddingLeft: "5px", fontSize: "2rem" }}
                          />
                        </button>
                        <button className="flex align-center content-center cancleUpdateProfile-btn">
                          Cancel
                          <CloseIcon
                            style={{ paddingLeft: "5px", fontSize: "2rem" }}
                          />
                        </button>
                      </DialogActions>
                    </Dialog>
                  </>
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
            <div className="tab post-tab active">
              <span>Posts</span>
            </div>
            <div className="tab friends-tab">
              <span>Friends</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex content-center profile-body-container">
        <div className="flex profile-body-wrapper">
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
      </div>
    </div>
  )
}

export default Profile
