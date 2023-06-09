import CottageIcon from "@mui/icons-material/Cottage"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const menuIcon = {
  fontSize: "30px",
  color: "white",
}

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="flex space-between align-center container">
        <h1 className="logo">Virmigo</h1>
        <ul className="flex align-center">
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
        <div className="flex align-center">
          <AccountCircleIcon style={menuIcon} />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
