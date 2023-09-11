import React, { useEffect, useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import userIcon from "../assets/user-icon.png"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import URL from "../url"
import { Link } from "react-router-dom"
import { UserType, CommentType } from "../Types/types"

interface CommentsSectionType {
  openCommentsSection: boolean
  postId: string
  comments: CommentType[]
  user: UserType
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
          URL,
          {
            commentText: values.commentText,
            postId,
          },
          { withCredentials: true },
        )
        .then((res) => {
          updateLatestComment([...latestComments, res.data.comment])
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
            {latestComments?.length === 0 ? (
              <div
                className="flex align-center content-center"
                style={{
                  height: "100%",
                  width: "100%",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#b5b5b5",
                }}
              >
                <span>No comments yet!</span>
              </div>
            ) : (
              latestComments &&
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
                    <Link
                      to={`/user/${comment.commentOwner[0]._id}`}
                      style={{ color: "black" }}
                      className="comment-user-name"
                    >
                      {comment.commentOwner[0].name}
                    </Link>
                    <span className="comment-text">{comment.commentText}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
