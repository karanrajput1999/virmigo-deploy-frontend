import React from "react"
import SendIcon from "@mui/icons-material/Send"
import userIcon from "../assets/user-icon.png"

type CommentsSectionType = {
  openCommentsSection: boolean
}

function CommentsSection({ openCommentsSection }: CommentsSectionType) {
  return (
    <div
      className="comments-section-container"
      style={{ display: openCommentsSection ? "block" : "none" }}
    >
      <div className="comments-section-wrapper">
        <div className="flex flex-column content-center comments-section-form-container">
          <div className="flex comments-section-user">
            <img
              src={userIcon}
              className="post-user-icon"
              alt="user-photo"
              style={{ marginRight: ".5rem" }}
            />
            <input
              type="text"
              style={{ width: "100%", paddingInline: "1rem" }}
              placeholder="Write a comment..."
            />
          </div>

          <button className="flex comment-btn" style={{ marginLeft: "auto" }}>
            Comment <SendIcon style={{ marginLeft: ".3rem" }} />
          </button>
        </div>
        <div className="comments-container">
          <span className="comments-title">Comments:</span>
          <div className="comments-wrapper">
            <div className="flex comment">
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
            </div>
            {/****************************  second comment ***********************/}
            <div className="flex comment">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
