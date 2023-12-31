export interface NewPostType {
  _id: string
  description: string
  image: string | null
  likes: []
  comments: []
  userId: string
  username: string
  userProfilePic: string | null
  postComments: CommentType[]
  createdAt: string
  updatedAt: string
  __v: number
}
export interface UserType {
  _id: string
  name: string
  email: string
  livesIn: string
  bio: string
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

export interface CommentType {
  _id: string
  commenterId: string
  postId: string
  commentText: string
  commentOwner: UserType[]
}
export interface PostType {
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
