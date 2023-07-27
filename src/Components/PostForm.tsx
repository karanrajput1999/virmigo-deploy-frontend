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

interface PostType {
  description: string
}

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
  userAllPosts: NewPostType[]
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

  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // const user = useSelector((state: any) => {
  //   return state.user.adminUser
  // })

  const formik = useFormik<PostType>({
    initialValues,
    onSubmit: (value: FormikValues) => {
      if (!value.description) {
        return
      }
      console.log("user id while  posting a post", user)

      axios
        .post("http://localhost:3000/", {
          ...value,
          userId: user._id,
          username: user.name,
        })
        .then((res) => {
          addNewPost(res.data)
        })
    },
  })

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

  return (
    <div className="flex content-center post-form-container">
      <div style={{ width: "90%", height: "100%" }}>
        <Paper elevation={2} style={{ paddingBlock: ".5rem" }}>
          <form
            className="container flex align-center flex-column"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex align-center post-input-section">
              <img src={userIcon} alt="user-photo" className="user-icon" />
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
                  style={{ float: "right" }}
                  onClick={() => setPreviewImg("")}
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
                  style={{ display: "none" }}
                  onChange={previewPost}
                />

                <GifBoxIcon
                  className="media-icon"
                  style={{ color: "#5600ac", cursor: "pointer" }}
                />
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
  )
}

export default PostForm
