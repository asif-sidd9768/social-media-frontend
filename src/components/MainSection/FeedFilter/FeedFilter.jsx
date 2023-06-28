import { useContext } from "react"
import "./FeedFilter.css"
import { PostContext } from "../../../main"
import { togglePostFilterAction } from "../../../actions/postActions"

export const FeedFilter = () => {
  const {postDispatch} = useContext(PostContext)

  const handleFilterToggle = (event, type) => {
    const toSend = {
      [type]: event.target.type === "checkbox" ? event.target.checked : event.target.value
    }
    postDispatch(togglePostFilterAction(toSend))
  }

  return (
    <div className="feed-filter-container">
      <div className="feed-date-filter-container">
        <p className="feed-filter-text">SHOW ME</p>
        <select className="feed-date-filter" onChange={(event) => handleFilterToggle(event, "sortType")}>
          <option value="newest">Latest</option>
          <option value="trending">Trending</option>
        </select>
      </div>
    </div>
  )
}