import React from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"

function YourFriends() {
  return (
    <div
      className="flex content-center mx your-friends-container"
      id="your-friends-container"
    >
      <div>
        <Paper
          elevation={4}
          style={{
            width: "300px",
            height: "400px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div className="title-container">
            <span className="title">Your Friends</span>
          </div>

          <div className="flow friends-container">
            <div className="flex align-center space-between friend">
              <div className="flex align-center  friend-left">
                <img src={userIcon} className="icon" alt="user-icon" />
                <span className="friends-name">Hardik Patel</span>
              </div>

              <button className="flex align-center unfriend-btn">
                Unfriend <PersonRemoveIcon style={{ paddingLeft: "5px" }} />
              </button>
            </div>
            <div className="flex align-center space-between friend">
              <div className="flex align-center  friend-left">
                <img src={userIcon} className="icon" alt="user-icon" />
                <span className="friends-name">Anshu</span>
              </div>

              <button className="flex align-center unfriend-btn">
                Unfriend <PersonRemoveIcon style={{ paddingLeft: "5px" }} />
              </button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default YourFriends
