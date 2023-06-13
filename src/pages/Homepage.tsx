import Navbar from "../Components/Navbar"
import YourFriends from "../Components/YourFriends"
import Feed from "../Components/Feed"
import FindNewFriends from "../Components/FindNewFriends"
import UserProfile from "./UserProfile"

function Homepage() {
  return (
    <>
      <Navbar />
      <div className="flex body-container">
        {/* <YourFriends />
        <Feed />
        <FindNewFriends /> */}
        <UserProfile />
      </div>
    </>
  )
}

export default Homepage
