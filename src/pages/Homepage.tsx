import Navbar from "../Components/Navbar"
import YourFriends from "../Components/YourFriends"
import Feed from "../Components/Feed"
import FindNewFriends from "../Components/FindNewFriends"

function Homepage() {
  return (
    <>
      <Navbar />
      <div className="flex body-container">
        <YourFriends />
        <Feed />
        <FindNewFriends />
      </div>
    </>
  )
}

export default Homepage
