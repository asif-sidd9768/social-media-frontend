import { useContext } from "react"
import "./EmptyFeed.css"
import { PostContext } from "../../../main"
import { toggleExploreFeedAction } from "../../../actions/postActions"

export const EmptyFeed = () => {
  const { postState, postDispatch } = useContext(PostContext)

  const handleExploreFeed = () => {
    console.log('clicked == ', postState?.exploreFeed)
    postDispatch(toggleExploreFeedAction("yes"))
  }

  return (
    <div className="empty-container">
      <p className="empty-main-line">Empty feed, endless possibilities! ✨</p>
      <p className="empty-secondary-line">Fill it with your unique story and shine bright! 🌟</p>
      <div className="empty-btn-container">
        {postState.exploreFeed === "no" && <button onClick={handleExploreFeed} className="empty-btn">Explore Feed</button>}
      </div>
    </div>
  )
}