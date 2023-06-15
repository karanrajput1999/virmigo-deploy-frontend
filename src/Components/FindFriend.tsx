import React from "react"
import { Paper } from "@mui/material"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SearchFriend from "./SearchFriend"
import FriendRequests from "./FriendRequests"

function FindFriend() {
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
              <div className="flex align-center find-new-friend-container">
                <PeopleAltIcon
                  style={{
                    marginInline: "0.8rem",
                    fontSize: "1.8rem",
                    color: "#5600ac",
                  }}
                />
                <span className="make-friends-tab-title">Find Friends</span>
              </div>
              <div className="flex align-center friend-request-container">
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
            {/* <SearchFriend /> */}
            <FriendRequests />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default FindFriend
