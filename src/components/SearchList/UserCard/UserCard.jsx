import "./UserCard.css"

export const UserCard = ({profileImg, firstName, lastName, username}) => {
  return (
    <div>
      <div className="search-card-container">
        { profileImg 
          ? <img src={profileImg} className="search-card-img" /> 
          : <span><i className="fa-solid fa-circle-user search-card-img"></i></span>
        }
        <div>
          <p className="search-card-fullname">{firstName} {lastName}</p>
          <p className="search-card-username">@{username}</p>
        </div>
      </div>
    </div>  
  )
}