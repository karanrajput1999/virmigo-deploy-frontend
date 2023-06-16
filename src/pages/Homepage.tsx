import Navbar from "../Components/Navbar"
import YourFriends from "../Components/YourFriends"
import Feed from "../Components/Feed"
import FindNewFriends from "../Components/FindNewFriends"
import UserProfile from "./UserProfile"
import FindFriends from "./FindFriends"
import SignupPage from "./SignupPage"

function Homepage() {
  return (
    <>
      <Navbar />
      <div className="flex body-container">
        {/* <YourFriends />
        <Feed />
        <FindNewFriends /> */}
        {/* <UserProfile /> */}
        {/* <FindFriends /> */}
        <SignupPage />
      </div>
    </>
  )
}

export default Homepage
