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
import { Link } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"

interface NewPostType {
  _id: string
  description: string
  image: string | null
  likes: []
  comments: []
  userId: string
  username: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface PostPropType {
  posts: NewPostType[]
  deletePost: (deletePost: string) => void
}

function Post({ posts, deletePost }: PostPropType) {
  const [openDelete, setOpenDelete] = useState(false)
  const [openCommentsSection, setOpenCommentsSection] = useState(false)
  const [liked, setLiked] = useState<boolean>(false)
  const user = useSelector((state: any) => state.user.adminUser)

  function likePost(likedPostId: string) {
    axios
      .post(
        "http://localhost:3000/",
        { likedPostId },
        { withCredentials: true },
      )
      .then((res) => {
        setLiked(!liked)
      })
      .catch((error) => {
        console.log("error while liking the post", error)
      })
  }

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
                    <Link className="post-username" to={`/user/${post.userId}`}>
                      {post.username}
                    </Link>
                    <span className="post-time">2 min ago</span>
                  </div>
                </div>

                {user?._id === post.userId ? (
                  <div
                    className="post-actions"
                    style={{ position: "relative" }}
                  >
                    <IconButton onClick={() => setOpenDelete(!openDelete)}>
                      <MoreVertIcon />
                    </IconButton>

                    <Paper
                      elevation={4}
                      className="content-center align-center"
                      style={{
                        width: "100px",
                        height: "40px",
                        position: "absolute",
                        right: "1rem",
                        top: "2.1rem",
                        cursor: "pointer",
                        borderRadius: "3px",
                        userSelect: "none",
                        display: openDelete ? "flex" : "none",
                      }}
                    >
                      <div
                        className="flex align-center"
                        style={{ padding: ".4rem" }}
                        onClick={() => {
                          deletePost(post._id)
                        }}
                      >
                        <DeleteIcon style={{ color: "red" }} />{" "}
                        <span style={{ paddingLeft: ".5rem" }}>Delete</span>
                      </div>
                    </Paper>
                  </div>
                ) : null}
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
                    onClick={() => likePost(post._id)}
                  >
                    {liked ? (
                      <ThumbUpAltIcon
                        style={{ color: "#5600ac", fontSize: "2rem" }}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        style={{ color: "#5600ac", fontSize: "2rem" }}
                      />
                    )}
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
              <CommentsSection
                openCommentsSection={openCommentsSection}
                postId={post._id}
                comments={post.postComments}
              />
            </Paper>
          </div>
        ))}
    </div>
  )
}

export default Post
