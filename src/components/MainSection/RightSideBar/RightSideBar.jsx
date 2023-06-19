import "./RightSideBar.css"

export const RightSideBar = () => {
  return (
    <div>
      <p className="suggestions-heading">Suggestions For You</p>
      <div className="suggestions-container">
        <div className="suggestions">
          <div className="suggestions-user">
            <span className="suggestions-user-icon">
              <i className="fa-solid fa-circle-user"></i>
            </span>
            <span className="suggestions-text">
              <p>test</p>
              <p className="suggestion-username">@test</p>
            </span>
          </div>
          <div>
            <button className="suggestions-follow-btn">Follow</button>
          </div>
        </div>

        <div className="suggestions">
          <div className="suggestions-user">
            <span className="suggestions-user-icon">
              <i className="fa-solid fa-circle-user"></i>
            </span>
            <span className="suggestions-text">
              <p>Asif Siddique</p>
              <p className="suggestion-username">@asifs98768</p>
            </span>
          </div>
          <div>
            <button className="suggestions-follow-btn">Follow</button>
          </div>
        </div>
      </div>
    </div>
  )
}