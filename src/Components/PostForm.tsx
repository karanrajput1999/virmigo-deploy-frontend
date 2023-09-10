import React, { ChangeEvent, useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import userIcon from "../assets/user-icon.png"
import PermMediaIcon from "@mui/icons-material/PermMedia"
import SendIcon from "@mui/icons-material/Send"
import GifBoxIcon from "@mui/icons-material/GifBox"
import axios from "axios"
import { FormikValues, useFormik } from "formik"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUser } from "../app/features/userSlice"
import CircularProgress from "@mui/material/CircularProgress"
import { NewPostType, UserType } from "../Types/types"
import URL from "../url"

interface PostType {
  description: string
}

interface PostFormType {
  user: UserType
  addNewPost: (post: NewPostType) => void
}

const initialValues = {
  description: "",
}

function PostForm({ user, addNewPost }: PostFormType) {
  const [previewImg, setPreviewImg] = useState<string>("")
  const [postImage, setPostImage] = useState(null)
  const [newPostLoading, setNewPostLoading] = useState(false)

  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // const user = useSelector((state: any) => {
  //   return state.user.adminUser
  // })

  // showing image's preview
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

  function setPost(event) {
    setPostImage(event.target.files[0])

    previewPost(event)
  }

  const formik = useFormik<PostType>({
    initialValues,
    onSubmit: (values: FormikValues) => {
      if (!values.description && !postImage) {
        return
      }

      const formData = new FormData()

      formData.append("description", values.description)
      formData.append("userId", user._id)
      formData.append("username", user.name)
      formData.append("userProfilePic", user.profilePic)

      if (postImage) {
        formData.append("postImage", postImage)
      }
      deletePostPreview()
      setNewPostLoading(true)

      axios
        .post(
          URL,
          // {
          //   ...values,
          //   userId: user._id,
          //   username: user.name,
          // },
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then((res) => {
          setNewPostLoading(false)
          resetFormInputValue()
          addNewPost(res.data)
        })
        .catch((error) => {
          setNewPostLoading(false)
          console.log("error while posting a post from postForm", error)
        })
    },
  })

  function resetFormInputValue() {
    formik.setFieldValue("description", "")
  }
  function deletePostPreview() {
    setPreviewImg("")
    setPostImage(null)
  }
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/", { withCredentials: true })
  //     .then((res) => {
  //       if (res.data) {
  //         dispatch(getUser(res.data.userWithAllPosts[0]))
  //         navigate("/")
  //       } else {
  //         navigate("/login")
  //       }
  //     })
  //     .catch((error) => console.log(error))
  // }, [])

  return (
    <>
      <div className="flex content-center post-form-container">
        <div style={{ width: "90%", height: "100%" }}>
          <Paper elevation={2} style={{ paddingBlock: ".5rem" }}>
            <form
              className="container flex align-center flex-column"
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
            >
              <div className="flex align-center post-input-section">
                <div className="user-icon-container">
                  <img
                    src={user?.profilePic || userIcon}
                    alt="user-photo"
                    className="user-icon"
                  />
                </div>

                <input
                  type="text"
                  {...formik.getFieldProps("description")}
                  id="description"
                  name="description"
                  className="post-input"
                  placeholder="Share your thoughts..."
                />
              </div>

              {/* preview post image */}
              {previewImg && (
                <div className="post-preview">
                  <button
                    className="delete-photo-btn"
                    style={{ float: "right" }}
                    onClick={deletePostPreview}
                  >
                    Delete photo
                  </button>
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
                    name="postImage"
                    style={{ display: "none" }}
                    onChange={setPost}
                  />

                  {/* <GifBoxIcon
                  className="media-icon"
                  style={{ color: "#5600ac", cursor: "pointer" }}
                /> */}
                </div>
                <div className="post-button-container">
                  <button type="submit" className="flex align-center post-btn">
                    Share it!{" "}
                    <SendIcon
                      style={{
                        paddingLeft: "5px",
                      }}
                    />
                  </button>
                </div>
              </div>
            </form>
          </Paper>
        </div>
      </div>
      {newPostLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress style={{ color: "#5600ac" }} />
        </div>
      ) : null}
    </>
  )
}

export default PostForm
