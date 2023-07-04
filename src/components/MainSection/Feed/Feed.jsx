import { useContext } from "react"
import { FeedPost } from "../FeedPost/FeedPost"

import { PostContext } from "../../../contexts/PostContext"
import { PostCard } from "../PostCard/PostCard"
import { UserContext } from "../../../contexts/UserContext"
import { useLocation } from "react-router-dom"
import { FeedChangeBtns } from "../../ProfileSection/FeedChangeBtns/FeedChangeBtns"
import { FeedFilter } from "../FeedFilter/FeedFilter"
import { getFilteredFeeds } from "../../../utils/getFilteredFeeds"
import { SideMenuProfile } from "../../SideMenuProfile/SideMenuProfile"
import { UserStories } from "../UserStories/UserStories"
import { EmptyFeed } from "../EmptyFeed/EmptyFeed"

import "./Feed.css"
import { PostCardSkeleton } from "../PostCardSkeleton/PostCardSkeleton"

export const Feed = () => {
  const {postState} = useContext(PostContext)
  const {userState} = useContext(UserContext)
  const location = useLocation()

  const getFeeds = () => {
    if(location.pathname.includes("profile")){
      switch(userState.feedOnUserProfile){
        case "my":
          return postState?.posts.filter(({username}) => username === userState?.user?.username)
        case "liked":
          return postState?.posts?.filter(({likes}) => likes?.likedBy?.some(user => user.id === userState?.user?.id))
        case "bookmarked":
          return postState?.posts?.filter(({id}) => userState?.user?.bookmarks?.some(bk => bk._id === id))
      }
    }
    switch(location.pathname){
      case "/bookmarks":
        return postState?.posts?.filter(({id}) => userState?.user?.bookmarks?.some(bk => bk._id === id))
      case "/liked":
        return postState?.posts?.filter(({likes}) => likes?.likedBy?.some(user => user.id === userState?.user?.id))
    }
    return postState.exploreFeed === "yes" ? postState?.posts : postState?.posts.filter(({username}) => (userState?.user?.following?.some(foll => foll.username === username)) || username === userState?.user?.username)
  }

  const allFeeds = getFeeds()
  const filteredFeeds = getFilteredFeeds(postState.filters, allFeeds)

  if(postState?.isLoading){
    return <div className="feed-skeleton-container">
      {
        [1,2,3].map(index => 
          <PostCardSkeleton key={index} />
        )
      }
    </div>
  }

  return (
    <div className="feed-container">
      {location.pathname.includes("profile") && <div className="side-menu-profile-mobile">
        <SideMenuProfile />
      </div>}
      <div className="feed-list-container">
        {!location.pathname.includes("profile") && 
          <div className="feed-header">
            <UserStories />
            <FeedFilter />
          </div>
        }
        {location.pathname.includes("profile") ? <FeedChangeBtns /> : <FeedPost />}
        {
          filteredFeeds.length > 0 ? <>
            {
              filteredFeeds.map((post) =>
                <PostCard key={post.id} {...post} />
              )
            }
          </> : <>
            <EmptyFeed />
          </>
        }
      </div>
    </div>
  )
}