import { useContext } from "react"
import { FeedPost } from "../FeedPost/FeedPost"

import "./Feed.css"
import { PostContext } from "../../../contexts/PostContext"
import { PostCard } from "../PostCard/PostCard"

export const Feed = () => {
  const {postState} = useContext(PostContext)

  return (
    <div className="feed-container">
      <FeedPost />
      {
        postState?.posts.map((post) =>
          <PostCard key={post._id} {...post} />
        )
      }
    </div>
  )
}