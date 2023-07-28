import "./scss/style.scss"
import Homepage from "./pages/Homepage"
import FindFriends from "./pages/FindFriends"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import UserProfile from "./pages/UserProfile"
import NotificationsPage from "./pages/NotificationsPage"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/findfriends" element={<FindFriends />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* previously -  /user/:username */}
      <Route path="/user/:userId" element={<UserProfile />} />
    </Routes>
  )
}

export default App
