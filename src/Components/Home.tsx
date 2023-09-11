function Home() {
  return (
    <div className="flex flex-column align-center main-container">
      <div className="flex align-center nav-container">
        <nav className="flex align-center space-between navbar">
          <a className="logo-text">Virmigo</a>
          <div className="flex nav-btn-container">
            <a
              href="/signup"
              className="flex content-center align-center nav-btn"
            >
              <span>Signup</span>
            </a>
            <a
              href="/login"
              className="flex content-center align-center nav-btn login"
            >
              <span>Login</span>
            </a>
          </div>
        </nav>
      </div>
      <div className="flex flex-column align-center hero-container">
        <div className="flex flex-column heading-container">
          <span className="hero-heading">You Online Social Hub</span>
          <span className="hero-sub-heading">
            Discover, Connect, Share, Repeat
          </span>
        </div>
        <div className="flex body-btn-container">
          <a
            href="/login"
            className="flex content-center align-center nav-btn login hero-btn"
          >
            <span>Already a member ?</span>
          </a>
          <a
            href="/signup"
            className="flex content-center align-center nav-btn hero-btn"
          >
            <span>New Here ?</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
