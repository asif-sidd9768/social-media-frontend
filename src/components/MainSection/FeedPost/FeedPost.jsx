import { useContext, useEffect, useRef, useState } from "react"
import EmojiPicker, {
  EmojiStyle,
} from "emoji-picker-react";

import { UserContext } from "../../../contexts/UserContext"
import { feedPostService } from "../../../services/postService"
import { PostContext } from "../../../contexts/PostContext"
import { addPostAction, createNewPostAction, createNewPostSuccessAction, setPostAction, toggleEmojiPickerAction } from "../../../actions/postActions"

import "./FeedPost.css"

export const FeedPost = () => {
  const {userState} = useContext(UserContext)
  const { postState, postDispatch } = useContext(PostContext)
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const handleFeedSubmit = async (event) => {
    event.preventDefault()
    const imageFile = postState?.newPost?.selectedImage
    const formData = new FormData()
    formData.append("postImage", imageFile)
    formData.append("content", event.target[0].value); // Add content field to formData
    try {
      const {status, data} = await feedPostService(formData)
      if(status === 200){
        postDispatch(addPostAction(data))
        postDispatch(createNewPostSuccessAction())
      }
    }catch(error){
      console.log(error)
    }
  }

  const handlePostImage = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      postDispatch(createNewPostAction({selectedImage: files[0]}))
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideEmojiPicker);
    return () => {
      document.removeEventListener("click", handleClickOutsideEmojiPicker);
    };
  }, []);

  const handleClickOutsideEmojiPicker = (event) => {
    // Check if the click occurred outside the emoji picker element and emoji icon
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target) &&
      event.target.id !== "emoji-picker-btn" && 
      event.target.id !== "emoji-picker-icon"
    ) {
      postDispatch(toggleEmojiPickerAction(false));
    }
  };


  const onEmojiClick = (emojiData) => {
    console.log(postState?.newPost)
    console.log(emojiData)
    postDispatch(createNewPostAction({content: `${postState.newPost.content}${emojiData.emoji}`}))
  }

  return (
    <div className="feed-post-container">
      <form onSubmit={handleFeedSubmit}>
        <div className="feed-post-input-container">
          <span className="feed-post-profile">
            {userState?.user?.profileImg ? <img src={userState?.user?.profileImg} className="feed-post-profile-img" /> : <i className="fa-solid fa-circle-user"></i>}
          </span>
          <textarea onChange={(event) => postDispatch(createNewPostAction({content: event.target.value}))} value={postState?.newPost?.content}  placeholder="What's in your mind?" className="feed-post-input" />
        </div>
        {postState?.newPost?.selectedImage && <div>
          <img className="feed-post-select-img" id="selectedImage" src={URL.createObjectURL(postState?.newPost?.selectedImage)} alt="Select image to show" />
        </div>}
        <div className="feed-post-btns">
          <div>
            {
              <input
                type="file"
                accept="image/*,  video/*"
                className="file-input"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handlePostImage}
                multiple
              />
            }
            <span className="feed-post-btn-icon" onClick={() => fileInputRef.current.click()}><i className="fa-solid fa-image"></i></span>
            {/* <span className="feed-post-btn-icon" onClick={() => fileInputRef.current.click()}><i className="fa-solid fa-video"></i></span> */}
            <span className="feed-post-btn-icon"><i className="fa-solid fa-location-dot"></i></span>
            <span id="emoji-picker-btn" onClick={() => postDispatch(toggleEmojiPickerAction(!postState?.showEmoji))} className="feed-post-btn-icon"><i className="fa-regular fa-face-smile" id="emoji-picker-icon"></i></span>
            {postState?.showEmoji && <div className="emoji-picker" ref={emojiPickerRef}>
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
                emojiStyle={EmojiStyle.APPLE}
                height={350}
              />
            </div>}
          </div>
          <div>
            <button type="submit" className="feed-post-btn">Post</button>
          </div>
        </div>
      </form>
    </div>
  )
}