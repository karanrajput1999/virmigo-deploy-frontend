import { useState } from "react"
import CottageIcon from "@mui/icons-material/Cottage"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

const menuIcon = {
  fontSize: "35px",
  color: "white",
}

function Navbar() {
  const [navClose, setNavClose] = useState(true)

  return (
    <div className="navbar-container">
      <nav className="flex space-between align-center container" id="navbar">
        <h1 className="logo">Virmigo</h1>
        {/* removed from ul className="flex align-center" */}
        <ul className={`${navClose ? "navClose" : ""}`}>
          <li className="flex align-center">
            <CottageIcon style={menuIcon} />
          </li>
          <li className="flex align-center">
            <PeopleAltIcon style={menuIcon} />
          </li>
          <li className="flex align-center">
            <NotificationsIcon style={menuIcon} />
          </li>
        </ul>

        <div className="user-menu flex align-center">
          <AccountCircleIcon style={menuIcon} />
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
