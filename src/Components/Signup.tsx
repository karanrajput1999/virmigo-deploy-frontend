import React from "react"

function Signup() {
  return (
    <div className="flex flex-column ailgn-center signup-container">
      <div className="flex content-center  signup-title-container">
        <span className="signup-title">Virmigo</span>
      </div>

      <div className="flex content-center input-field-container">
        <div className="flex flex-column">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="John Doe" />
        </div>
      </div>
      <div className="flex content-center input-field-container">
        <div className="flex flex-column">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="johndoe@gmail.com" />
        </div>
      </div>
      <div className="flex content-center input-field-container">
        <div className="flex flex-column">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Type your password..." />
        </div>
      </div>
      <div className="flex content-center input-field-container">
        <div className="flex flex-column">
          <label htmlFor="cofirm-password">Confirm Password</label>
          <input type="password" placeholder="Confirm your password..." />
        </div>
      </div>

      <div className="flex align-center flex-column pic-btn-container">
        <div className="flex pic-info-container">
          <span>* Profile pic and cover pic are optional.</span>
        </div>
        <div className="flex content-center pic-btn-wrapper">
          <button className="pic-btn">Choose profile pic</button>
          <button className="pic-btn">Choose cover pic</button>
        </div>
      </div>

      <div className="flex content-center join-btn-container">
        <button className="join-btn">Join Virmigo!</button>
      </div>
    </div>
  )
}

export default Signup
