import React from "react"
import userIcon from "../assets/user-icon.png"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Paper } from "@mui/material"

function SearchFriend() {
  return (
    <>
      {" "}
      <div className="findFriends-header">
        <span className="findFriends-title">Find Friends</span>
      </div>
      <div className="findFriends-searchbar-container">
        <input
          className="findFriends-input"
          type="text"
          placeholder="Search your friend's name..."
        />
      </div>
      <div className="findFriends-friendlist-container">
        <div className="flex align-center space-between friend-container">
          <div className="flex align-center">
            <img src={userIcon} className="friend-photo" alt="friend photo" />
            <span className="findFriends-friendName">Walter White</span>
          </div>
          <button className="flex align-center findFriend-add-btn">
            Add Friend{" "}
            <PersonAddIcon style={{ paddingLeft: "5px", fontSize: "1.5rem" }} />
          </button>
        </div>
      </div>
    </>
  )
}

export default SearchFriend
