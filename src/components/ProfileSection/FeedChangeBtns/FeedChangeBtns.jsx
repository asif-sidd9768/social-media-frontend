import { useContext } from "react"
import "./FeedChangeBtns.css"
import { UserContext } from "../../../main"
import { changeFeedTypeOnProfileAction } from "../../../actions/userActions"

export const FeedChangeBtns = () => {
  const { userState, userDispatch } = useContext(UserContext)
  
  const handleProfileFeedChange = (type) => {
    userDispatch(changeFeedTypeOnProfileAction(type))
  }
  return (
    <div>
      <span className="feed-change-btn-container">
          <span onClick={() =>handleProfileFeedChange("my") } className={`${userState.feedOnUserProfile === "my" && "active-feed-type"}`}>
            My Posts
          </span>
          <span onClick={() =>handleProfileFeedChange("liked")} className={`${userState.feedOnUserProfile === "liked" && "active-feed-type"}`}>
            Liked Posts
          </span>
          <span onClick={() =>handleProfileFeedChange("bookmarked")} className={`${userState.feedOnUserProfile === "bookmarked" && "active-feed-type"}`}>
            Bookmarked Posts
          </span>
        </span>
    </div>
  )
}