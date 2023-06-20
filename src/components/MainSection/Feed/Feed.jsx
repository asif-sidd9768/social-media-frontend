import { useContext } from "react"
import { FeedPost } from "../FeedPost/FeedPost"

import "./Feed.css"
import { PostContext } from "../../../contexts/PostContext"
import { PostCard } from "../PostCard/PostCard"
import { UserContext } from "../../../contexts/UserContext"

export const Feed = () => {
  const {postState} = useContext(PostContext)
  const {userState} = useContext(UserContext)

  const filteredFeeds = postState.exploreFeed ? postState?.posts : postState?.posts.filter(({username}) => (userState.user.following.some(foll => foll.username === username)) || username === userState?.user?.username)
  return (
    <div className="feed-container">
      <FeedPost />
      {
        filteredFeeds.map((post) =>
          <PostCard key={post.id} {...post} />
        )
      }
    </div>
  )
}