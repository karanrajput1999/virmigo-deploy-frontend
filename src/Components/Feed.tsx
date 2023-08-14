import React, { useEffect, useState } from "react"
import PostForm from "./PostForm"
import Post from "./Post"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getUser } from "../app/features/userSlice"

interface UserType {
  _id: string
  name: string
  email: string
  bio: string
  livesIn: string
  profilePic: string | null
  coverPic: string | null
  posts: string[]
  comments: string[]
  friends: string[]
  createdAt: string
  updatedAt: string
  __v: number
  userAllPosts: NewPostType[]
}

interface NewPostType {
  _id: string
  description: string
  image: string | null
  likes: []
  comments: []
  userId: string
  likedUsers: UserType[]
  username: string
  createdAt: string
  updatedAt: string
  __v: number
}

function Feed() {
  // Post. tsx below
  const [posts, setPosts] = useState<NewPostType[]>([])

  let user = useSelector((state: any) => state.user.adminUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          console.log("user all posts testing", res.data.userWithAllPosts[0])

          setPosts(res.data.userWithAllPosts[0].allPostsCombined)
          dispatch(getUser(res.data.userWithAllPosts[0]))

          navigate("/")
        } else {
          navigate("/login")
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const addNewPost = (newPost: NewPostType) => {
    setPosts([newPost, ...posts])
  }

  function deletePost(deletePostId: string) {
    axios
      .delete("http://localhost:3000/", {
        data: { deletePostId },
        withCredentials: true,
      })
      .then((res) => {
        const remainingPosts = posts.filter((post) => post._id !== deletePostId)
        setPosts([...remainingPosts])
      })
  }

  return (
    <div className="flex flex-column content-center feed-container">
      <PostForm addNewPost={addNewPost} user={user} />

      {posts &&
        posts.map((post: any) => (
          <Post post={post} deletePost={deletePost} key={post._id} />
        ))}
    </div>
  )
}

export default Feed
