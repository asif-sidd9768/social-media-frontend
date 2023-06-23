import { useContext } from "react"
import "./FeedFilter.css"
import { PostContext } from "../../../main"
import { togglePostFilterAction } from "../../../actions/postActions"

export const FeedFilter = () => {
  const {postState, postDispatch} = useContext(PostContext)

  const handleFilterToggle = (event, type) => {
    console.log(postState.filters)
    const toSend = {
      [type]: event.target.type === "checkbox" ? event.target.checked : event.target.value
    }
    postDispatch(togglePostFilterAction(toSend))
  }

  return (
    <div className="feed-filter-container">
      <div className="feed-date-filter-container">
        <p className="feed-filter-text">SHOW</p>
        <div className="trending-container"><input onChange={(event) => handleFilterToggle(event, "showTrending")} className="trending-checkbox" type="checkbox" /> <span>Trending</span></div>
      </div>
      <div className="feed-date-filter-container">
        <p className="feed-filter-text">SHOW ME</p>
        <select className="feed-date-filter" onChange={(event) => handleFilterToggle(event, "showDate")}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  )
}