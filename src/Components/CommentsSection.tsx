import React, { useEffect, useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import userIcon from "../assets/user-icon.png"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

interface NewPostType {
  _id: string
  description: string
  image: string | null
  likes: []
  comments: []
  userId: string
  username: string
  userProfilePic: string | null
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
  createdAt: string
  userAllPosts: NewPostType[]
}

interface CommentType {
  _id: string
  commenterId: string
  postId: string
  commentText: string
  commentOwner: UserType[]
}

interface CommentsSectionType {
  openCommentsSection: boolean
  postId: string
  comments: CommentType[]
}

interface formValues {
  commentText: string
}

const initialValues = {
  commentText: "",
}

const validationSchema = Yup.object({
  commentText: Yup.string()
    .min(3, "Comment can not less than 3 chars! ")
    .max(300, "Comment can not be more than 300 chars!")
    .required("Write something!"),
})

function CommentsSection({
  openCommentsSection,
  postId,
  comments,
  user,
}: CommentsSectionType) {
  const [latestComments, setLatestComments] = useState<CommentType[] | null>(
    null,
  )

  useEffect(() => {
    setLatestComments(comments)
  }, [comments])

  function updateLatestComment(latestComment: CommentType[]) {
    setLatestComments(latestComment)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values: formValues) => {
      resetCommentInputValue()
      axios
        .post(
          "http://localhost:3000/",
          {
            commentText: values.commentText,
            postId,
          },
          { withCredentials: true },
        )
        .then((res) => {
          updateLatestComment([...latestComments, res.data.comment])
          console.log("while commenting", res.data)
        })
    },
    validationSchema,
  })

  function resetCommentInputValue() {
    formik.setFieldValue("commentText", "")
    // to get rid of formik error for touched field
    formik.setTouched({}, false)
  }
  return (
    <div
      className="comments-section-container"
      style={{ display: openCommentsSection ? "block" : "none" }}
    >
      <div className="comments-section-wrapper">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-column content-center comments-section-form-container"
        >
          <div className="flex comments-section-user">
            <div className="comment-user-icon">
              <img
                // src={userIcon}
                src={user.profilePic || userIcon}
                alt="user-photo"
                style={{ marginRight: ".5rem" }}
              />
            </div>

            <div style={{ width: "98%", paddingLeft: "1rem" }}>
              <input
                type="text"
                id="commentText"
                {...formik.getFieldProps("commentText")}
                name="commentText"
                style={{ width: "100%", paddingInline: "1rem", height: "40px" }}
                placeholder="Write a comment..."
              />

              {formik.touched.commentText && formik.errors.commentText ? (
                <div className="error-container">
                  <span> {formik.errors.commentText}</span>
                </div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="flex comment-btn"
            style={{ marginLeft: "auto" }}
          >
            Comment <SendIcon style={{ marginLeft: ".3rem" }} />
          </button>
        </form>
        <div className="comments-container">
          <span className="comments-title">Comments:</span>
          <div className="comments-wrapper">
            {latestComments &&
              latestComments.map((comment) => (
                <div className="flex comment" key={comment._id}>
                  <div className="comment-user-icon">
                    <img
                      src={comment.commentOwner[0].profilePic || userIcon}
                      alt="user-photo"
                      style={{ marginRight: ".5rem" }}
                    />
                  </div>
                  <div className="flex flex-column user-comment-container">
                    <span className="comment-user-name">
                      {comment.commentOwner[0].name}
                    </span>
                    <span className="comment-text">{comment.commentText}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
