import React, { ChangeEvent, useState } from "react"
import Paper from "@mui/material/Paper"
import userIcon from "../assets/user-icon.png"
import PermMediaIcon from "@mui/icons-material/PermMedia"
import SendIcon from "@mui/icons-material/Send"
import GifBoxIcon from "@mui/icons-material/GifBox"

function PostForm() {
  const [previewImg, setPreviewImg] = useState<string>("")

  function previewPost(e: ChangeEvent<HTMLInputElement>): void {
    const previewPic = e.target.files?.[0]
    if (previewPic) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImg(reader.result as string)
      }
      reader.readAsDataURL(previewPic)
    } else {
      setPreviewImg("")
    }
  }

  return (
    <div className="flex content-center post-form-container">
      <div style={{ width: "90%", height: "100%" }}>
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

          {previewImg && (
            <div className="post-preview">
              <img src={previewImg} alt="preview image" />
            </div>
          )}
          <div className="flex align-center space-between post-action-section">
            <div className="post-media-container">
              <label htmlFor="media-icon">
                <PermMediaIcon
                  className="media-icon"
                  name="media-icon"
                  style={{ color: "#5600ac", cursor: "pointer" }}
                />
              </label>
              <input
                type="file"
                id="media-icon"
                style={{ display: "none" }}
                onChange={previewPost}
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
      </div>
    </div>
  )
}

export default PostForm
