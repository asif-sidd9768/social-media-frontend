import { useContext, useState } from "react"
import "./FeedPost.css"
import { UserContext } from "../../../contexts/UserContext"
import { feedPostService } from "../../../services/postService"
import { PostContext } from "../../../contexts/PostContext"
import { setPostAction } from "../../../actions/postActions"

export const FeedPost = () => {
  const {userState} = useContext(UserContext)
  const { postDispatch } = useContext(PostContext)

  const handleFeedSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target[0].value)
    try {
      const postData = {
        content: event.target[0].value
      }
      const {status, data} = await feedPostService({postData})
      if(status === 201){
        console.log(data)
        postDispatch(setPostAction(data.posts))
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="feed-post-container">
      <form onSubmit={handleFeedSubmit}>
        <div className="feed-post-input-container">
          <span className="feed-post-profile">
            <i className="fa-solid fa-circle-user"></i>
          </span>
          <input placeholder="What's in your mind?" className="feed-post-input" />
        </div>
        <div className="feed-post-btns">
          <div>
            <span className="feed-post-btn-icon"><i className="fa-solid fa-image"></i></span>
            <span className="feed-post-btn-icon"><i className="fa-solid fa-paperclip"></i></span>
            <span className="feed-post-btn-icon"><i className="fa-solid fa-location-dot"></i></span>
            <span className="feed-post-btn-icon"><i className="fa-regular fa-face-smile"></i></span>
          </div>
          <div>
            <button type="submit" className="feed-post-btn">Post</button>
          </div>
        </div>
      </form>
    </div>
  )
}