import React from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

function FindNewFriends() {
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
            <div className="flex align-center space-between friend">
              <div className="flex align-center  friend-left">
                <img src={userIcon} className="icon" alt="user-icon" />
                <span className="friends-name">Himanshu Sharma</span>
              </div>

              <button className="flex align-center find-new-friends-add-btn">
                Add <PersonAddIcon style={{ paddingLeft: "5px" }} />
              </button>
            </div>
            <div className="flex align-center space-between friend">
              <div className="flex align-center  friend-left">
                <img src={userIcon} className="icon" alt="user-icon" />
                <span className="friends-name">Vinay Pandit</span>
              </div>

              <button className="flex align-center find-new-friends-add-btn">
                Add <PersonAddIcon style={{ paddingLeft: "5px" }} />
              </button>
            </div>
            <div className="flex align-center space-between friend">
              <div className="flex align-center  friend-left">
                <img src={userIcon} className="icon" alt="user-icon" />
                <span className="friends-name">Sonu Verma</span>
              </div>

              <button className="flex align-center find-new-friends-add-btn">
                Add <PersonAddIcon style={{ paddingLeft: "5px" }} />
              </button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default FindNewFriends
