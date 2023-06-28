import { useContext } from "react"
import "./FeedToggleBtns.css"
import { PostContext } from "../../../../contexts/PostContext"
import { toggleExploreFeedAction } from "../../../../actions/postActions"

export const FeedToggleBtns = () => {
  const {postState, postDispatch} = useContext(PostContext)

  const handleFeedTypeToggle = (type) => {
    if((type==="explore" && postState.exploreFeed) || (type==="myfeeds" && !postState.exploreFeed)){
      return
    }
    postDispatch(toggleExploreFeedAction())
  }

  return (
    <span className="feed-toggle-btn-container">
      <span onClick={() => handleFeedTypeToggle("explore")} className={`${postState.exploreFeed && "active-feed-toggle-type"}`}>
        Explore
      </span>
      <span onClick={() => handleFeedTypeToggle("myfeeds")} className={`${!postState.exploreFeed && "active-feed-toggle-type"}`}>
        My Feeds
      </span>
    </span>
  )
}