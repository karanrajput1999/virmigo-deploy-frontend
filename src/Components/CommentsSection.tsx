import React from "react"
import SendIcon from "@mui/icons-material/Send"
import userIcon from "../assets/user-icon.png"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

interface CommentType {
  _id: string
  commenterId: string
  postId: string
  commentText: string
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
    .max(50, "Comment can not be more than 50 chars!")
    .required("Write something!"),
})

function CommentsSection({
  openCommentsSection,
  postId,
  comments,
}: CommentsSectionType) {
  console.log("comments from comment.tsx", comments)

  const formik = useFormik({
    initialValues,
    onSubmit: (values: formValues) => {
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
          console.log("while commenting", res.data)
        })
    },
    validationSchema,
  })

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
            <img
              src={userIcon}
              className="post-user-icon"
              alt="user-photo"
              style={{ marginRight: ".5rem" }}
            />
            <input
              type="text"
              id="commentText"
              {...formik.getFieldProps("name")}
              name="commentText"
              style={{ width: "100%", paddingInline: "1rem" }}
              placeholder="Write a comment..."
            />
            <div className="error-container">
              {formik.touched.commentText && formik.errors.commentText ? (
                <span> {formik.errors.commentText}</span>
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
            {comments &&
              comments.map((comment) => (
                <div className="flex comment" key={comment._id}>
                  <img
                    src={userIcon}
                    className="post-user-icon"
                    alt="user-photo"
                    style={{ marginRight: ".5rem" }}
                  />
                  <div className="flex flex-column user-comment-container">
                    <span className="comment-user-name">
                      {comment.commentOwner[0].name}
                    </span>
                    <span className="comment-text">{comment.commentText}</span>
                  </div>
                </div>
              ))}

            {/* <div className="flex comment">
              <img
                src={userIcon}
                className="post-user-icon"
                alt="user-photo"
                style={{ marginRight: ".5rem" }}
              />
              <div className="flex flex-column user-comment-container">
                <span className="comment-user-name">Karan Nayak</span>
                <span className="comment-text">
                  Yo Anshu ! What is up my man?
                </span>
              </div>
            </div> */}
            {/****************************  second comment ***********************/}
            {/* <div className="flex comment">
              <img
                src={userIcon}
                className="post-user-icon"
                alt="user-photo"
                style={{ marginRight: ".5rem" }}
              />
              <div className="flex flex-column user-comment-container">
                <span className="comment-user-name">Anshu Upadhyay</span>
                <span className="comment-text">
                  Ae laude ke baal apna kaam kr na, kanpur ki public bole to
                  taplik.
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
