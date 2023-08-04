import React, { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
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

function YourFriends() {
  const [friends, setFriends] = useState<UserType[] | null | undefined>(null)

  useEffect(() => {
    axios
      .get("http://localhost:3000/", { withCredentials: true })
      .then((res) => {
        setFriends(res.data.userAllFriends)
      })
  }, [])

  function unfriend(unfriendId: string) {
    axios
      .post("http://localhost:3000/", { unfriendId }, { withCredentials: true })
      .then((res) => {
        console.log("your friends here", res.data)
        setFriends(friends?.filter((friend) => friend._id !== unfriendId))
      })
  }

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
            {friends &&
              friends.map((friend: UserType) => (
                <div
                  className="flex align-center space-between friend"
                  key={friend._id}
                >
                  <div className="flex align-center  friend-left">
                    <img src={userIcon} className="icon" alt="user-icon" />
                    <span className="friends-name">{friend.name}</span>
                  </div>

                  <button
                    className="flex align-center unfriend-btn"
                    onClick={() => {
                      unfriend(friend._id)
                    }}
                  >
                    Unfriend <PersonRemoveIcon style={{ paddingLeft: "5px" }} />
                  </button>
                </div>
              ))}

            {/* <div className="flex align-center space-between friend">
              <div className="flex align-center  friend-left">
                <img src={userIcon} className="icon" alt="user-icon" />
                <span className="friends-name">Anshu</span>
              </div>

              <button className="flex align-center unfriend-btn">
                Unfriend <PersonRemoveIcon style={{ paddingLeft: "5px" }} />
              </button>
            </div> */}
            {/************************************** EXTRAAAAAAAAAAAAAAA ******************************************/}
            {/************************************** EXTRAAAAAAAAAAAAAAA ******************************************/}
            {/************************************** EXTRAAAAAAAAAAAAAAA ******************************************/}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default YourFriends
