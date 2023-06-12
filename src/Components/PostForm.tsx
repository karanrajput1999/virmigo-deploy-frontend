import React from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import PermMediaIcon from "@mui/icons-material/PermMedia"
import SendIcon from "@mui/icons-material/Send"
import GifBoxIcon from "@mui/icons-material/GifBox"

function PostForm() {
  return (
    <div className="flex content-center post-form-container">
      <Box style={{ width: "90%", height: "100%" }}>
        <Paper
          className="container flex align-center flex-column"
          elevation={2}
          style={{ paddingBlock: ".5rem" }}
        >
          <div className="flex align-center post-input-section">
            <img src={userIcon} alt="user-photo" className="user-icon" />
            <input
              type="text"
              className="post-input"
              placeholder="Share your thoughts..."
            />
          </div>
          <div className="flex align-center space-between post-action-section">
            <div className="post-media-container">
              <PermMediaIcon
                className="media-icon"
                style={{ color: "#5600ac", cursor: "pointer" }}
              />
              <GifBoxIcon
                className="media-icon"
                style={{ color: "#5600ac", cursor: "pointer" }}
              />
            </div>
            <div className="post-button-container">
              <button className="flex align-center post-btn">
                Share it!{" "}
                <SendIcon
                  style={{
                    paddingLeft: "5px",
                  }}
                />
              </button>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  )
}

export default PostForm
