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
  friendRequestsSent: string[]
  friendRequests: string[]
  createdAt: string
  updatedAt: string
  __v: number
  userAllPosts: NewPostType[]
}

interface CommentType {
  _id: string
  commenterId: string
  postId: string
  commentText: string
  commentOwner: UserType[]
}
interface PostType {
  _id: string
  description: string
  image: string | null
  likes: []
  comments: []
  userId: string
  likedUsers: UserType[]
  username: string
  userProfilePic: string | null
  createdAt: string
  updatedAt: string
  postComments: CommentType[]
  __v: number
}

export { NewPostType, UserType, PostType, CommentType }
