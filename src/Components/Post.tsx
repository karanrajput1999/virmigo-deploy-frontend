import React from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import PermMediaIcon from "@mui/icons-material/PermMedia"
import SendIcon from "@mui/icons-material/Send"
import GifBoxIcon from "@mui/icons-material/GifBox"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import postImg from "../assets/post-media.jpg"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ModeCommentIcon from "@mui/icons-material/ModeComment"

function Post() {
  return (
    <div className="flex flex-column align-center post-container">
      <div style={{ width: "90%", height: "100%" }}>
        <Paper
          className="container flex content-center flex-column"
          elevation={2}
          style={{ paddingInline: "1.5rem" }}
        >
          <div className="flex align-center space-between post-user-info-container">
            <div className="flex align-center post-user-info">
              <img src={userIcon} className="post-user-icon" alt="user-photo" />
              <div className="flex flex-column post-username-container">
                <span className="post-username">John Doe</span>
                <span className="post-time">2 min ago</span>
              </div>
            </div>
            <div className="post-actions">
              <MoreVertIcon />
            </div>
          </div>

          <div className="post-caption-container">
            <span className="post-caption">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
              adipisci eius facere ea beatae. Neque eaque numquam officiis
              minima, blanditiis iusto natus laborum provident laboriosam maxime
              necessitatibus inventore molestiae obcaecati, assumenda officia
              ullam quis voluptatibus autem nesciunt minus. Earum vero voluptas
              voluptate nesciunt tenetur ex consequatur odio quod ipsam debitis.
            </span>
          </div>

          <div className="post-media-container">
            <img src={postImg} alt="" />
          </div>

          <div className=" post-interaction-container">
            <div className="flex align-center post-reactors-info-container">
              <ThumbUpAltIcon
                style={{ color: "#5600ac", fontSize: "1.3rem" }}
              />

              <div className="post-reactors-container">
                <span className="post-reactors">
                  Brock Lesnar and 40 others
                </span>
              </div>
            </div>

            <div className="flex align-center space-between post-reaction-container">
              <div className="like-container">
                <ThumbUpOffAltIcon
                  style={{ color: "#5600ac", fontSize: "2rem" }}
                />
              </div>
              <div className="comment-container">
                <ModeCommentIcon
                  style={{ color: "#5600ac", fontSize: "1.8rem" }}
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>

      {/******************************************************************************************************************/}
      {/************************************************** second post below ********************************************/}
      {/******************************************************************************************************************/}

      <Box style={{ width: "90%", height: "100%" }}>
        <Paper
          className="container flex content-center flex-column"
          elevation={2}
          style={{ paddingInline: "1.5rem" }}
        >
          <div className="flex align-center space-between post-user-info-container">
            <div className="flex align-center post-user-info">
              <img src={userIcon} className="post-user-icon" alt="user-photo" />
              <div className="flex flex-column post-username-container">
                <span className="post-username">John Doe</span>
                <span className="post-time">2 min ago</span>
              </div>
            </div>
            <div className="post-actions">
              <MoreVertIcon />
            </div>
          </div>

          <div className="post-caption-container">
            <span className="post-caption">
              This is some text is that is going to be caption
            </span>
          </div>

          <div className="post-media-container">
            <img src={postImg} alt="" />
          </div>

          <div className=" post-interaction-container">
            <div className="flex align-center post-reactors-info-container">
              <ThumbUpAltIcon
                style={{ color: "#5600ac", fontSize: "1.3rem" }}
              />

              <div className="post-reactors-container">
                <span className="post-reactors">
                  Brock Lesnar and 40 others
                </span>
              </div>
            </div>

            <div className="flex align-center space-between post-reaction-container">
              <div className="like-container">
                <ThumbUpOffAltIcon
                  style={{ color: "#5600ac", fontSize: "2rem" }}
                />
              </div>
              <div className="comment-container">
                <ModeCommentIcon
                  style={{ color: "#5600ac", fontSize: "1.8rem" }}
                />
              </div>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  )
}

export default Post
