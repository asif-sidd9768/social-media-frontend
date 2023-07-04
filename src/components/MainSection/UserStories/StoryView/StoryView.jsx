import "./StoryView.css"

export const StoryView = ({storyData, handleStoryClose}) => {
  return (
    <div className="story-container">
      <div className="story-content">
        <span onClick={handleStoryClose} className="story-close-btn">
          <i className="fa-solid fa-x"></i>
        </span>
        <img src={storyData.content} className="story-img" />
      </div>
    </div>
  )
}