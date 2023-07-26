import React, { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import userIcon from "../assets/user-icon.png"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import postImg from "../assets/post-media.jpg"
import postImg2 from "../assets/post-media-2.jpg"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ModeCommentIcon from "@mui/icons-material/ModeComment"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CommentsSection from "./CommentsSection"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getUser } from "../app/features/userSlice"

function Post() {
  const [openDelete, setOpenDelete] = useState(false)
  const [openCommentsSection, setOpenCommentsSection] = useState(false)
  const [posts, setPosts] = useState([])

  let user = useSelector((state: any) => state.user.adminUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setPosts(res.data.userWithAllPosts[0].userAllPosts)
          dispatch(getUser(res.data.userWithAllPosts[0]))

          navigate("/")
        } else {
          navigate("/login")
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="flex flex-column align-center post-container">
      {posts &&
        posts.map((post: any) => (
          <div style={{ width: "90%", height: "100%" }} key={post._id}>
            <Paper
              className="container flex content-center flex-column"
              elevation={2}
              style={{ paddingInline: "1.5rem", paddingBottom: "1rem" }}
            >
              <div className="flex align-center space-between post-user-info-container">
                <div className="flex align-center post-user-info">
                  <img
                    src={userIcon}
                    className="post-user-icon"
                    alt="user-photo"
                  />
                  <div className="flex flex-column post-username-container">
                    <span className="post-username">{post.username}</span>
                    <span className="post-time">2 min ago</span>
                  </div>
                </div>
                <div className="post-actions" style={{ position: "relative" }}>
                  <IconButton onClick={() => setOpenDelete(!openDelete)}>
                    <MoreVertIcon />
                  </IconButton>

                  <Paper
                    elevation={4}
                    className="content-center align-center"
                    style={{
                      width: "100px",
                      height: "40px",
                      // backgroundColor: "green",
                      position: "absolute",
                      right: "1rem",
                      top: "2.1rem",
                      cursor: "pointer",
                      borderRadius: "3px",
                      userSelect: "none",
                      display: openDelete ? "flex" : "none",
                    }}
                  >
                    <div className="flex align-center">
                      <DeleteIcon style={{ color: "red" }} />{" "}
                      <span style={{ paddingLeft: ".5rem" }}>Delete</span>
                    </div>
                  </Paper>
                </div>
              </div>

              <div className="post-caption-container">
                <span className="post-caption">{post.description}</span>
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
                  <IconButton
                    className="like-container"
                    style={{ padding: "0" }}
                  >
                    <ThumbUpOffAltIcon
                      style={{ color: "#5600ac", fontSize: "2rem" }}
                    />
                  </IconButton>
                  <IconButton
                    className="comment-container"
                    onClick={() => setOpenCommentsSection(!openCommentsSection)}
                    style={{ padding: "0" }}
                  >
                    <ModeCommentIcon
                      style={{ color: "#5600ac", fontSize: "1.8rem" }}
                    />
                  </IconButton>
                </div>
              </div>

              {/* Comments section */}
              <CommentsSection openCommentsSection={openCommentsSection} />
            </Paper>
          </div>
        ))}

      {/******************************************************************************************************************/}
      {/************************************************** second post below ********************************************/}
      {/******************************************************************************************************************/}
      <div style={{ width: "90%", height: "100%" }}>
        <Paper
          className="container flex content-center flex-column"
          elevation={2}
          style={{ paddingInline: "1.5rem", paddingBottom: "1rem" }}
        >
          <div className="flex align-center space-between post-user-info-container">
            <div className="flex align-center post-user-info">
              <img src={userIcon} className="post-user-icon" alt="user-photo" />
              <div className="flex flex-column post-username-container">
                <span className="post-username">Anshu Upadhyay</span>
                <span className="post-time">2 min ago</span>
              </div>
            </div>
            <div className="post-actions" style={{ position: "relative" }}>
              <IconButton onClick={() => setOpenDelete(!openDelete)}>
                <MoreVertIcon />
              </IconButton>

              <Paper
                elevation={4}
                className="content-center align-center"
                style={{
                  width: "100px",
                  height: "40px",
                  // backgroundColor: "green",
                  position: "absolute",
                  right: "1rem",
                  top: "2.1rem",
                  cursor: "pointer",
                  borderRadius: "3px",
                  userSelect: "none",
                  display: openDelete ? "flex" : "none",
                }}
              >
                <div className="flex align-center">
                  <DeleteIcon style={{ color: "red" }} />{" "}
                  <span style={{ paddingLeft: ".5rem" }}>Delete</span>
                </div>
              </Paper>
            </div>
          </div>

          <div className="post-caption-container">
            <span className="post-caption">This is some less text post</span>
          </div>

          <div className="post-media-container">
            <img src={postImg2} alt="" />
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
              <IconButton className="like-container" style={{ padding: "0" }}>
                <ThumbUpOffAltIcon
                  style={{ color: "#5600ac", fontSize: "2rem" }}
                />
              </IconButton>
              <IconButton
                className="comment-container"
                onClick={() => setOpenCommentsSection(!openCommentsSection)}
                style={{ padding: "0" }}
              >
                <ModeCommentIcon
                  style={{ color: "#5600ac", fontSize: "1.8rem" }}
                />
              </IconButton>
            </div>
          </div>

          {/* Comments section */}
          <CommentsSection openCommentsSection={openCommentsSection} />
        </Paper>
      </div>
    </div>
  )
}

export default Post
