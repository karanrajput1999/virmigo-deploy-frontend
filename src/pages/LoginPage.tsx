import React from "react"
import Login from "../Components/Login"

interface setHasLoggedInUserType {
  setHasLoggedInUser: (hasLoggedInUser: boolean) => void
}

function LoginPage({ setHasLoggedInUser }: setHasLoggedInUserType) {
  return (
    <div className="flex align-center content-center login-page-container">
      <Login setHasLoggedInUser={setHasLoggedInUser} />
    </div>
  )
}

export default LoginPage
