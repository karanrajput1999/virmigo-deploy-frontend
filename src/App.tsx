import "./scss/style.scss"
import { useEffect, useState } from "react"
import Homepage from "./pages/Homepage"
import MainHomepage from "./pages/MainHomepage"
import FindFriends from "./pages/FindFriends"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import UserProfile from "./pages/UserProfile"
import NotificationsPage from "./pages/NotificationsPage"
import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import axios from "axios"
import URL from "./url"

function App() {
  const [hasLoggedInUser, setHasLoggedInUser] = useState<boolean>(false)
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    setProfileLoading(true)
    axios
      .get(URL, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setHasLoggedInUser(true)
          setProfileLoading(false)
        } else {
          setProfileLoading(false)
        }
      })
      .catch((error) => console.log(error))
  }, [hasLoggedInUser])

  return (
    <Routes>
      <Route
        path="/"
        element={
          hasLoggedInUser ? (
            <Homepage />
          ) : profileLoading ? (
            <div
              style={{
                textAlign: "center",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "2rem" }}>Fetching user details...</span>
              <CircularProgress style={{ color: "#5600ac" }} />
            </div>
          ) : (
            <MainHomepage />
          )
        }
      />
      <Route path="/findfriends" element={<FindFriends />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route
        path="/login"
        element={<LoginPage setHasLoggedInUser={setHasLoggedInUser} />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user/:userId" element={<UserProfile />} />
    </Routes>
  )
}

export default App
