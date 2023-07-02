import { calculateTimeDiff } from "../../../../utils/calculateTimeDiff"
import "./CommentCard.css"

export const CommentCard = ({postUser, commentUser, content, createdAt, commentImage}) => {
  return (
    <div className="comment-container">
      <div className="comment-header">
        <span className="comment-icon">
          <img className="comment-icon" src={commentImage} />
          {/* <i className="fa-solid fa-circle-user"></i>} */}
        </span>
        <span className="comment-username">@{commentUser}</span>
        <span className="card-circle"><i className="fa-solid fa-circle"></i></span>
        <span className="card-post-time">{calculateTimeDiff(createdAt)}</span>
      </div>
      <span className="comment-replying-to">Replying to <span className="card-username">@{postUser}</span></span>
      <p className="comment-content">
        {content}
      </p>
      <hr className="post-divider" />
    </div>
    // <div>
    //   <div className="post-card-comment">
    //     <span className="comment-profile">
    //       <i className="fa-solid fa-circle-user"></i>
    //     </span>
    //     <span className="comment-text-container">
    //       <span className="comment-username">Jack P:</span>
    //       <span className="comment-text"> well done jackob majc is the workds person to be not here so be bo isnt' it is greatest of all.</span>
    //     </span>
    //   </div>
    // </div>
  )
}