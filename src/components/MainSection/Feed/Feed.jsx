import { useContext } from "react"
import { FeedPost } from "../FeedPost/FeedPost"

import "./Feed.css"
import { PostContext } from "../../../contexts/PostContext"
import { PostCard } from "../PostCard/PostCard"
import { UserContext } from "../../../contexts/UserContext"
import { useLocation } from "react-router-dom"
import { FeedChangeBtns } from "../../ProfileSection/FeedChangeBtns/FeedChangeBtns"
import { FeedFilter } from "../FeedFilter/FeedFilter"
import { getFilteredFeeds } from "../../../utils/getFilteredFeeds"

export const Feed = () => {
  const {postState} = useContext(PostContext)
  const {userState} = useContext(UserContext)
  const location = useLocation()

  const getFeeds = () => {
    if(location.pathname === "/profile"){
      switch(userState.feedOnUserProfile){
        case "my":
          return postState?.posts.filter(({username}) => username === userState?.user?.username)
        case "liked":
          return postState?.posts?.filter(({likes}) => likes?.likedBy.some(user => user.id === userState?.user?.id))
        case "bookmarked":
          return postState?.posts?.filter(({id}) => userState?.user?.bookmarks.some(bk => bk._id === id))
      }
    }
    switch(location.pathname){
      case "/bookmarks":
        return postState?.posts?.filter(({id}) => userState?.user?.bookmarks.some(bk => bk._id === id))
      case "/liked":
        return postState?.posts?.filter(({likes}) => likes?.likedBy.some(user => user.id === userState?.user?.id))
    }
    return postState.exploreFeed ? postState?.posts : postState?.posts.filter(({username}) => (userState.user.following.some(foll => foll.username === username)) || username === userState?.user?.username)
  }

  const allFeeds = getFeeds()
  const filteredFeeds = getFilteredFeeds(postState.filters, allFeeds)

  return (
    <div className="feed-container">
      <FeedFilter />
      {location.pathname === "/profile" ? <FeedChangeBtns /> : <FeedPost />}
      {
        filteredFeeds.map((post) =>
          <PostCard key={post.id} {...post} />
        )
      }
    </div>
  )
}