import { useEffect, useState } from "react"
import axios from "axios"
import userIcon from "../assets/user-icon.png"
import userCover from "../assets/profile-cover.jpg"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Paper from "@mui/material/Paper"
import Post from "./Post"
import EditIcon from "@mui/icons-material/Edit"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Link, useParams } from "react-router-dom"
import { getUser } from "../app/features/userSlice"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import { NewPostType, UserType } from "../Types/types"
import Loading from "./Loading"
import URL from "../url"

interface formValues {
  name: string
  email: string
  bio: string
  state: string
}

const initialValues = {
  name: "",
  email: "",
  bio: "",
  state: "",
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be atleast 3 chars long!")
    .max(25, "Name can not be more than 25 chars!"),
  email: Yup.string().email("Invalid email format!"),
  bio: Yup.string()
    .min(3, "Bio must be atleast 3 chars long!")
    .max(100, "Bio can not be more than 100 chars!"),
  state: Yup.string()
    .min(3, "State/Country name must be atleast 3 chars long!")
    .max(30, "State/Country name can not be more than 100 chars!"),
})

function Profile() {
  const [open, setOpen] = useState(false)
  const [postTabVisible, setPostTabVisible] = useState(true)
  // const [user, setUser] = useState<UserType | null>(null)
  const [user, setUser] = useState<UserType | null>(null)
  const [loggedInuser, setLoggedInUser] = useState<UserType | null>(null)
  const [friendsId, setFriendsId] = useState<string[] | null | undefined>(null)
  const [friends, setFriends] = useState<UserType[] | null | undefined>(null)
  const { userId } = useParams()
  const [friendRequestedUser, setFriendRequestedUser] = useState<string[]>([])
  const [posts, setPosts] = useState<NewPostType[]>([])
  const [postsLoading, setPostsLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    setPostsLoading(true)
    axios
      .get(`${URL}/user/${userId}`, { withCredentials: true })
      .then((res) => {
        setPosts(res.data.userAllPosts[0].userPosts)
        setLoggedInUser(res.data.loggedInUser)
        setFriends(res.data.userAllFriends)
        setUser(res.data.userProfile)
        setFriendsId(res.data.loggedInUser.friends)
        getFriendRequestedUserId(res.data.allFriendRequestsSent)
        dispatch(getUser(res.data.loggedInUser))
        setPostsLoading(false)
      })
      .catch((error) => {
        console.log("erorr while fetching profile", error.message)
      })
  }, [userId])

  function unfriend(unfriendId: string) {
    axios
      .post(`${URL}/user/${userId}`, { unfriendId }, { withCredentials: true })
      .then((res) => {
        setFriendsId(friendsId?.filter((friendId) => friendId !== unfriendId))
      })
  }

  function getFriendRequestedUserId(friendRequestedUser: UserType[]) {
    const requestedUsers = friendRequestedUser.map((user) => {
      return user._id
    })
    setFriendRequestedUser(requestedUsers)
  }

  function sendFriendRequest(friendRequestReceiverId: string) {
    axios
      .post(
        `${URL}/user/${userId}`,
        { friendRequestReceiverId },
        { withCredentials: true },
      )
      .then((res) => {
        setFriendRequestedUser([
          ...friendRequestedUser,
          friendRequestReceiverId,
        ])
      })
      .catch((error) => {
        console.log("error while sending friend request", error)
      })
  }

  function cancelFriendRequest(receiverId: string) {
    axios
      .post(
        `${URL}/user/${userId}`,
        { cancelRequestId: receiverId },
        { withCredentials: true },
      )
      .then((res) => {
        setFriendRequestedUser(
          friendRequestedUser.filter(
            (friendRequest) => friendRequest !== receiverId,
          ),
        )
      })
      .catch((error) => {
        console.log("error while sending friend request", error)
      })
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

  const formik = useFormik<formValues>({
    initialValues,
    onSubmit: (values: formValues) => {
      axios
        .patch(
          `${URL}/user/${userId}`,
          { ...values },
          { withCredentials: true },
        )
        .then((res) => {
          window.location.reload()
        })
        .catch((error) => {
          console.log("error while updating profile", error)
        })
    },
    validationSchema,
  })

  return (
    <div className="profile-container">
      <div className="flex content-center flex-column profile-header-container">
        <div className="mx-auto profile-header-wrapper">
          <div className="profile-header">
            <div className="profile-cover">
              <img
                className="cover-img"
                src={user?.coverPic || userCover}
                alt=""
              />
            </div>
            <div className="flex profile-user-info">
              <div className="profile-user-pic">
                <img src={user?.profilePic || userIcon} alt="" />
              </div>

              <div className="flex flex-column profile-username-container">
                <span className="profile-username">{user?.name}</span>
                <span className="profile-friends">
                  {user?.friends && user?.friends.length > 0
                    ? `${user?.friends.length} Friends`
                    : ""}
                </span>
              </div>
              <div className="profile-addfriend">
                {loggedInuser?._id === userId ? (
                  <>
                    <button
                      className="flex align-center content-center editProfile-btn"
                      onClick={handleClickOpen}
                    >
                      Edit Profile
                      <EditIcon
                        style={{ paddingLeft: "5px", fontSize: "2rem" }}
                      />
                    </button>
                    <Dialog open={open} onClose={handleClose}>
                      <form onSubmit={formik.handleSubmit}>
                        <DialogTitle
                          className="updateProfile-title"
                          style={{
                            fontSize: "2rem",
                            fontWeight: "700",
                            textAlign: "center",
                          }}
                        >
                          Update profile details!
                        </DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            {...formik.getFieldProps("name")}
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            size="small"
                            variant="outlined"
                          />
                          <div className="error-container">
                            {formik.touched.name && formik.errors.name ? (
                              <span> {formik.errors.name}</span>
                            ) : null}
                          </div>
                          <TextField
                            margin="dense"
                            id="email"
                            {...formik.getFieldProps("email")}
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            size="small"
                            variant="outlined"
                          />
                          <div className="error-container">
                            {formik.touched.email && formik.errors.email ? (
                              <span> {formik.errors.email}</span>
                            ) : null}
                          </div>
                          <TextField
                            margin="dense"
                            id="bio"
                            {...formik.getFieldProps("bio")}
                            name="bio"
                            label="Bio"
                            type="text"
                            fullWidth
                            size="small"
                            variant="outlined"
                          />
                          <div className="error-container">
                            {formik.touched.bio && formik.errors.bio ? (
                              <span> {formik.errors.bio}</span>
                            ) : null}
                          </div>
                          <TextField
                            margin="dense"
                            id="state"
                            {...formik.getFieldProps("state")}
                            name="state"
                            label="State / Country"
                            type="text"
                            fullWidth
                            size="small"
                            variant="outlined"
                          />
                          <div className="error-container">
                            {formik.touched.state && formik.errors.state ? (
                              <span> {formik.errors.state}</span>
                            ) : null}
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <button
                            type="submit"
                            className="flex align-center content-center updateProfile-btn"
                            onClick={handleClose}
                          >
                            Update Profile
                            <CheckCircleIcon
                              style={{ paddingLeft: "5px", fontSize: "2rem" }}
                            />
                          </button>
                          <button
                            className="flex align-center content-center cancleUpdateProfile-btn"
                            onClick={handleClose}
                          >
                            Cancel
                            <CloseIcon
                              style={{ paddingLeft: "5px", fontSize: "2rem" }}
                            />
                          </button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </>
                ) : user && friendsId?.includes(user._id) ? (
                  <button
                    className="flex align-center content-center unfriendProfile-btn"
                    onClick={() => unfriend(user._id)}
                  >
                    Unfriend
                    <PersonRemoveIcon
                      style={{ paddingLeft: "5px", fontSize: "2rem" }}
                    />
                  </button>
                ) : (
                  <button
                    className="flex align-center content-center addfriend-btn"
                    onClick={() => {
                      if (user && friendRequestedUser?.includes(user?._id)) {
                        cancelFriendRequest(user?._id)
                      } else {
                        user && sendFriendRequest(user?._id)
                      }
                    }}
                  >
                    {user && friendRequestedUser.includes(user?._id)
                      ? "Cancel Request"
                      : "Add Friend"}

                    <PersonAddIcon
                      style={{ paddingLeft: "5px", fontSize: "2rem" }}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex tabs-container">
            <div
              className={`tab post-tab ${postTabVisible ? "active" : ""}`}
              onClick={() => {
                setPostTabVisible(true)
              }}
            >
              <span>Posts</span>
            </div>

            <div
              className={`tab friends-tab ${postTabVisible ? "" : "active"}`}
              onClick={() => {
                setPostTabVisible(false)
              }}
            >
              <span>Friends</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex content-center profile-body-container">
        <div
          className="flex profile-body-wrapper"
          style={{
            display: postTabVisible ? "flex" : "none",
          }}
        >
          <div className="profile-info-container">
            <div style={{ marginTop: "2rem" }}>
              <Paper
                elevation={2}
                className="profile-info-paper"
                style={{
                  minHeight: "10rem",
                  width: "300px",
                  paddingBottom: "1rem",
                }}
              >
                <div className="profile-info-title">
                  <span className="profile-info-title-text">Information</span>
                </div>

                <div className="profile-info-text">
                  <div className="profile-info-container profile-info-live">
                    <span className="profile-info-live-title information-title">
                      Lives in -{" "}
                    </span>
                    <span className="profile-info-live-text">
                      {user?.livesIn ? user?.livesIn : "Update profile details"}
                    </span>
                  </div>
                  <div className="profile-info-container profile-info-bio">
                    <span className="profile-info-bio-title information-title">
                      Bio -{" "}
                    </span>
                    <span className="profile-info-bio-text">
                      {user?.bio ? user?.bio : "Update profile details"}
                    </span>
                  </div>
                </div>
              </Paper>
            </div>
          </div>

          <div className="profile-posts-container">
            <div className="profile-posts-wrapper">
              <div className="profile-posts-title">
                <span>Posts</span>
              </div>
              <div className="profile-posts-post-container">
                {posts &&
                  posts.map((post: any) => (
                    <Post
                      post={post}
                      deletePost={deletePost}
                      likedUsers={post?.likedUsers}
                      likedUsersId={post?.likes}
                      key={post?._id}
                    />
                  ))}
                {postsLoading ? <Loading /> : null}
              </div>
            </div>
          </div>
        </div>

        {/********************************************* second wrapper *************************************/}
        <div
          className="flex profile-body-wrapper"
          style={{
            display: postTabVisible ? "none" : "flex",
          }}
        >
          <div className="profile-info-container">
            <div style={{ marginTop: "2rem" }}>
              <div className="flex flex-column profile-body-friends-container">
                {/* first friend */}
                {friends?.length === 0 ? (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#b5b5b5",
                    }}
                  >
                    <span>No friends!</span>
                  </div>
                ) : (
                  friends &&
                  friends.map((friend) => (
                    <div
                      className="flex align-center profile-body-friend"
                      key={friend._id}
                    >
                      <img
                        src={userIcon}
                        alt="friend"
                        className="profile-body-icon"
                      />
                      <Link
                        className="profile-body-friend-name"
                        to={`/user/${friend._id}`}
                        style={{ color: "black" }}
                      >
                        {friend.name}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
