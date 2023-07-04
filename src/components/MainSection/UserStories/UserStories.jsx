import { useContext, useEffect, useRef, useState } from "react";
import "./UserStories.css"
import { getAllStoriesService, storyPostService, storyViewService } from "../../../services/userService";
import { UserContext } from "../../../main";
import { StoryView } from "./StoryView/StoryView";
import { isStoryViewedByUser } from "../../../utils/isStoryViewedByUser";
import { userReducer } from "../../../reducers/UserReducer";
import { storyViewAction } from "../../../actions/userActions";

const avatarImages = [
  {
    id:1,
    url: "https://i.ibb.co/BBm8N6q/avatar6.png"
  },
  {
    id:2,
    url: "https://i.ibb.co/mJm6fx9/avatar5.png"
  },
  {
    id:3,
    url: "https://i.ibb.co/bP848Gy/avatar4.png"
  },
  {
    id:4,
    url: "https://i.ibb.co/GHgNx8f/avatar3.jpg"
  },
  {
    id:5,
    url: "https://i.ibb.co/z4Mcn1t/avatar1.jpg"
  },
  {
    id:6,
    url: "https://i.ibb.co/3m7tHBQ/avatar2.jpg"
  }
]

export const UserStories = () => {
  const { userState, userDispatch } = useContext(UserContext)
  const [story, setStory] = useState({selected:false, selectedData: ""})
  const fileInputRef = useRef(null);
  const storyBtnRef = useRef(null)

  const handleStoryClose = () => {
    setStory(({selected: false, selectedData: ""}))
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (storyBtnRef.current && storyBtnRef.current.contains(event.target)) {
        setStory(({selected: false, selectedData: ""}));
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleStoryImage = async (event) => {
    console.log(event.target.files[0])
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("storyImage", file)
    try {
      const result = await storyPostService(userState?.user?.id, formData)
      console.log(result)
    }catch(error){
      console.log(error)
    }
  }

  const handleStoryView = async (story) => {
    isStoryViewedByUser(story, userState?.user?.id)
    try{
      const result = await storyViewService(userState?.user?.id, story.id)
      console.log(result)
      userDispatch(storyViewAction(result.data))
      setStory(prev => ({selected: true, selectedData:story}))
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="stories-container">
      <div className="stories-list">
        {
          userState?.userStories.slice(0,5).map(storyData => 
            <div key={storyData.id} className="story-item" onClick={() => handleStoryView(storyData)}>
              {storyData.userImage 
                ? <img src={storyData.userImage} className={`stories-img ${!isStoryViewedByUser(storyData, userState?.user?.id) ? "stories-viewed" : "stories-not-viewed"}`} /> 
                : <i className={`fa-solid fa-circle-user stories-img ${!isStoryViewedByUser(storyData, userState?.user?.id) ? "stories-viewed" : "stories-not-viewed"} `}></i>}
            </div>  
          )
        }
      </div>
      <div>
        { story.selected && <div ref={storyBtnRef}>
          <StoryView storyData={story.selectedData} handleStoryClose={handleStoryClose} />
        </div>}
        <span className="stories-add-btn stories-not-viewed" onClick={() => fileInputRef.current.click()} >
          <i className="fa-solid fa-plus"></i>
        </span>
        <input
          type="file"
          accept="image/*"
          className="file-input"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleStoryImage}
        />
      </div>
    </div>
  )
}