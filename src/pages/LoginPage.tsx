import React from "react"
import Login from "../Components/Login"

function LoginPage({ setHasLoggedInUser }) {
  return (
    <div className="flex align-center content-center login-page-container">
      <Login setHasLoggedInUser={setHasLoggedInUser} />
    </div>
  )
}

export default LoginPage
