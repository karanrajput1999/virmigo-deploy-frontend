import React from "react"
import PostForm from "./PostForm"
import Post from "./Post"

function Feed() {
  return (
    <div className="flex flex-column content-center feed-container">
      <PostForm />
      <Post />
    </div>
  )
}

export default Feed
