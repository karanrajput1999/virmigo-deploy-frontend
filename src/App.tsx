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
import axios from "axios"
import URL from "./url"

function App() {
  const [hasLoggedInUser, setHasLoggedInUser] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(URL, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setHasLoggedInUser(true)
        }
      })
      .catch((error) => console.log(error))
  }, [hasLoggedInUser])

  return (
    <Routes>
      <Route
        path="/"
        element={hasLoggedInUser ? <Homepage /> : <MainHomepage />}
      />
      {/* <Route path="/home" element={<MainHomepage />} /> */}
      <Route path="/findfriends" element={<FindFriends />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route
        path="/login"
        element={<LoginPage setHasLoggedInUser={setHasLoggedInUser} />}
      />
      <Route path="/signup" element={<SignupPage />} />
      {/* previously -  /user/:username */}
      <Route path="/user/:userId" element={<UserProfile />} />
    </Routes>
  )
}

export default App
