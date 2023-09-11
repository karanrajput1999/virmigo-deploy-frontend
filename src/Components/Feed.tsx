import { useEffect, useState } from "react"
import PostForm from "./PostForm"
import Post from "./Post"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getUser } from "../app/features/userSlice"
import nopost from "../assets/nopost.svg"
import { NewPostType, PostType } from "../Types/types"
import URL from "../url"

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([])

  let user = useSelector((state: any) => state.user.adminUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(URL, { withCredentials: true })
      .then((res) => {
        if (res.data) {
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
    /* added postComments and likedUsers because the structure of post object is different than the 
    backend and if I don't match the structure then like message (Become first one to like) shows undefined */

    setPosts([{ ...newPost, postComments: [], likedUsers: [] }, ...posts])
  }

  function deletePost(deletePostId: string) {
    axios
      .delete(URL, {
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

      {posts.length === 0 ? (
        <div className="flex flex-column align-center nopost-img-container">
          <h1 style={{ color: "#5600ac" }}>New to Virmigo ?</h1>
          <span style={{ color: "#636363" }}>
            Share some posts or make some friends.
          </span>
          <img src={nopost} alt="" className="nopost-img" />
        </div>
      ) : (
        posts.map((post: any) => (
          <Post
            post={post}
            deletePost={deletePost}
            likedUsers={post?.likedUsers}
            likedUsersId={post?.likes}
            key={post?._id}
          />
        ))
      )}
    </div>
  )
}

export default Feed
