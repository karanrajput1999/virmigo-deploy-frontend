import React from "react"

function Login() {
  return (
    <div className="flex flex-column ailgn-center login-container">
      <div className="flex content-center  login-title-container">
        <span className="login-title">Virmigo</span>
      </div>

      <div className="flex content-center login-input-field-container">
        <div className="flex flex-column">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="johndoe@gmail.com" />
        </div>
      </div>
      <div className="flex content-center login-input-field-container">
        <div className="flex flex-column">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Type your password..." />
        </div>
      </div>

      <div className="flex content-center join-btn-container">
        <button className="join-btn">Login</button>
      </div>
    </div>
  )
}

export default Login
