import { useContext, useEffect } from "react"
import "./FeedToggleBtns.css"
import { PostContext } from "../../../../contexts/PostContext"
import { toggleExploreFeedAction } from "../../../../actions/postActions"
import { UserContext } from "../../../../main"

export const FeedToggleBtns = () => {
  const { userState } = useContext(UserContext)
  const {postState, postDispatch} = useContext(PostContext)

  const handleFeedTypeToggle = (type) => {
    // if((type==="explore" && postState.exploreFeed) || (type==="myfeeds" && !postState.exploreFeed)){
    //   return
    // }
    const toSet = type === "explore" ? "yes" : "no"
    console.log(toSet)
    postDispatch(toggleExploreFeedAction(toSet))
  }

  useEffect(() => {
    if(!userState?.token){
      handleFeedTypeToggle("explore")
    }
  }, [])

  return (
    <span className="feed-toggle-btn-container">
      <span onClick={() => handleFeedTypeToggle("explore")} className={`${postState.exploreFeed === "yes" && "active-feed-toggle-type"}`}>
        Explore
      </span>
      {userState?.token && <span onClick={() => handleFeedTypeToggle("myfeeds")} className={`${postState.exploreFeed === "no" && "active-feed-toggle-type"}`}>
        My Feeds
      </span>}
    </span>
  )
}