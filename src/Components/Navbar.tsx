import { useState } from "react"
import CottageIcon from "@mui/icons-material/Cottage"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { IconButton } from "@mui/material"
import Paper from "@mui/material/Paper"
import PersonPinIcon from "@mui/icons-material/PersonPin"
import LogoutIcon from "@mui/icons-material/Logout"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const menuIcon = {
  fontSize: "35px",
  color: "white",
}

function Navbar() {
  const [navClose, setNavClose] = useState(true)
  const [openProfileMenu, setOpenProfileMenu] = useState(false)
  const navigate = useNavigate()

  let user = useSelector((state: any) => state.user.adminUser)

  function logout() {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        navigate("/login")
      })
      .catch((error) => {
        console.log("error while logging out from frontend", error)
      })
  }

  return (
    <div className="navbar-container">
      <nav className="flex space-between align-center container" id="navbar">
        {" "}
        <h1 className="logo">
          {" "}
          <Link
            to="/"
            className="flex align-center "
            style={{ width: "100%", color: "white" }}
          >
            {" "}
            Virmigo{" "}
          </Link>
        </h1>
        {/* removed from ul className="flex align-center" */}
        <ul className={`${navClose ? "navClose" : ""}`}>
          <li className="flex align-center">
            <Link to="/">
              <CottageIcon style={menuIcon} />
            </Link>
          </li>
          <li className="flex align-center">
            <Link to="/findfriends">
              <PeopleAltIcon style={menuIcon} />
            </Link>
          </li>
          <li className="flex align-center">
            <Link to="/notifications">
              <NotificationsIcon style={menuIcon} />
            </Link>
          </li>
        </ul>
        <div className="user-menu flex align-center">
          <IconButton onClick={() => setOpenProfileMenu(!openProfileMenu)}>
            <AccountCircleIcon style={menuIcon} />
          </IconButton>

          <Paper
            elevation={4}
            className="content-center align-center profile-menu"
            style={{
              width: "130px",
              height: "65px",
              position: "absolute",
              right: "2rem",
              top: "3rem",
              cursor: "pointer",
              borderRadius: "3px",
              userSelect: "none",
              display: openProfileMenu ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="flex align-center content-center"
              style={{ width: "70%" }}
            >
              <Link
                to={`/user/${user?._id}`}
                className="flex align-center "
                style={{ width: "100%" }}
              >
                {/* <div className="flex align-center " style={{ width: "100%" }}> */}
                <AccountCircleIcon style={{ color: "#5600ac" }} />{" "}
                <span style={{ paddingLeft: ".5rem" }}>Profile</span>
                {/* </div> */}
              </Link>
            </div>
            <div
              className="flex align-center  content-center"
              style={{ width: "70%" }}
              onClick={logout}
            >
              <a
                // to="/login"
                className="flex align-center "
                style={{ width: "100%" }}
              >
                {/* <div className="flex align-center " style={{ width: "100%" }}> */}
                <LogoutIcon style={{ color: "#5600ac" }} />{" "}
                <span style={{ paddingLeft: ".5rem", color: "#5600ac" }}>
                  Log out
                </span>
              </a>
              {/* </div> */}
            </div>
          </Paper>
        </div>
        <div
          className="flex align-center"
          id="hamburger"
          onClick={() => {
            setNavClose(!navClose)
          }}
        >
          {navClose ? (
            <MenuIcon style={menuIcon} />
          ) : (
            <CloseIcon style={menuIcon} />
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
