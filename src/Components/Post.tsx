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
import moment from "moment"
import { NewPostType, UserType } from "../Types/types"
import URL from "../url"

interface PostPropType {
  post: NewPostType
  deletePost: (deletePost: string) => void
  likedUsers: UserType[]
  likedUsersId: string[]
}

function Post({ post, deletePost, likedUsers, likedUsersId }: PostPropType) {
  const [openDelete, setOpenDelete] = useState(false)
  const [openCommentsSection, setOpenCommentsSection] = useState(false)
  const [liked, setLiked] = useState<boolean>(false)
  const [likedUsersList, setLikedUsersList] = useState<UserType[] | null>(null)
  const [likedUsersIdList, setLikedUsersIdList] = useState<string[] | null>(
    null,
  )
  const user = useSelector((state: any) => state.user.adminUser)

  useEffect(() => {
    setLikedUsersList(likedUsers)
    setLikedUsersIdList(likedUsersId)
  }, [likedUsers, likedUsersId])

  function updateUnlike(user) {
    const updatedLikes = likedUsersList?.filter(
      (likedUser) => user._id !== likedUser._id,
    )
    const updatedLikedUsersId = likedUsersIdList?.filter(
      (likedUserId) => likedUserId !== user?._id,
    )
    setLikedUsersIdList(updatedLikedUsersId)
    setLikedUsersList(updatedLikes)
  }
  function udpateLike(user) {
    setLikedUsersIdList([...likedUsersIdList, user._id])
    setLikedUsersList([...likedUsersList, user])
  }

  function likePost(likedPostId: string) {
    axios
      .post(URL, { likedPostId }, { withCredentials: true })
      .then((res) => {
        setLiked(!liked)
      })
      .catch((error) => {
        console.log("error while liking the post", error)
      })
  }

  return (
    <div className="flex flex-column align-center post-container">
      <div style={{ width: "90%", height: "100%" }}>
        <Paper
          className="container flex content-center flex-column"
          elevation={2}
          style={{ paddingInline: "1.5rem", paddingBottom: "1rem" }}
        >
          <div className="flex align-center space-between post-user-info-container">
            <div className="flex align-center post-user-info">
              <div className="post-user-icon-container">
                <img
                  src={post?.userProfilePic || userIcon}
                  className="post-user-icon"
                  alt="user-photo"
                />
              </div>

              <div className="flex flex-column post-username-container">
                <Link
                  className="post-username"
                  to={`/user/${post?.userId}`}
                  style={{ color: "black" }}
                >
                  {post?.username}
                </Link>
                {/* <span className="post-time">2 min ago</span> */}
                <span className="post-time">
                  {moment(post.createdAt).fromNow()}
                </span>
              </div>
            </div>

            {user?._id === post?.userId ? (
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

          {post?.description ? (
            <div className="post-caption-container">
              <span className="post-caption">{post?.description}</span>
            </div>
          ) : null}

          {post?.image ? (
            <div
              className="post-media-container"
              style={{ marginTop: ".5rem" }}
            >
              {/* <img src={postImg} alt="" /> */}
              <img src={post?.image} alt="" />
            </div>
          ) : null}

          <div className=" post-interaction-container">
            <div className="flex align-center post-reactors-info-container">
              <ThumbUpAltIcon
                style={{ color: "#5600ac", fontSize: "1.3rem" }}
              />

              <div className="post-reactors-container">
                {/* <span className="post-reactors">
                      Brock Lesnar and 40 others
                    </span> */}
                {/* <span className="post-reactors">
                  {post.likedUsers?.length === 0
                    ? "Become first one to like"
                    : post.likedUsers?.length === 1
                    ? `Liked by ${post.likedUsers[0]?.name}`
                    : post.likedUsers?.length === 2
                    ? `Liked by ${post.likedUsers[0]?.name} and ${post.likedUsers[1]?.name}`
                    : `Liked by ${post.likedUsers[0]?.name} and ${
                        post.likedUsers[1]?.name
                      } and ${post.likedUsers?.length - 2} others`}
                </span> */}
                <span className="post-reactors">
                  {likedUsersList && likedUsersList?.length === 0
                    ? "Become first one to like"
                    : likedUsersList?.length === 1
                    ? `Liked by ${likedUsersList[0]?.name}`
                    : likedUsersList?.length === 2
                    ? `Liked by ${
                        likedUsersList && likedUsersList[0]?.name
                      } and ${likedUsersList[1]?.name}`
                    : likedUsersList?.length === 3
                    ? `Liked by ${likedUsersList && likedUsersList[0]?.name}, ${
                        likedUsersList[1]?.name
                      } and ${likedUsersList[2]?.name}`
                    : `Liked by ${
                        likedUsersList && likedUsersList[0]?.name
                      } and ${likedUsersList && likedUsersList[1]?.name} and ${
                        likedUsersList && likedUsersList?.length - 2
                      } others`}
                </span>
              </div>
            </div>

            <div className="flex align-center space-between post-reaction-container">
              <div className="flex align-center">
                <IconButton
                  className="like-container"
                  style={{ padding: "0" }}
                  onClick={() => {
                    if (likedUsersIdList.includes(user._id)) {
                      updateUnlike(user)
                      likePost(post?._id)
                    } else {
                      udpateLike(user)
                      likePost(post?._id)
                    }
                  }}
                >
                  {likedUsersIdList?.includes(user._id) ? (
                    <ThumbUpAltIcon
                      style={{ color: "#5600ac", fontSize: "2rem" }}
                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      style={{ color: "#5600ac", fontSize: "2rem" }}
                    />
                  )}
                </IconButton>
                {likedUsersIdList?.includes(user._id) ? (
                  <span style={{ marginLeft: ".5rem", color: "#5600ac" }}>
                    {" "}
                    Liked !
                  </span>
                ) : null}
              </div>
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
            postId={post?._id}
            comments={post?.postComments}
            user={user}
          />
        </Paper>
      </div>
    </div>
  )
}

export default Post
