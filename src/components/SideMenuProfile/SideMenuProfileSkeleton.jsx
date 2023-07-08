import Skeleton from "react-loading-skeleton"

export const SideMenuProfileSkeleton = () => {
  return (
    <aside className="side-menu-profile-container">
    {/* <Skeleton height={100} width={100} className="side-menu-profile-logo" /> */}
    <form onSubmit={() => {}}>
      <div className="side-menu-profile-user">
        <div className="profile-bg-container">
          <Skeleton height={200} className="profile-bg" />
        </div>
        <span className="profile-edit-btn">
          <Skeleton width={30} height={15} />
        </span>
        <div className="profile-foll-container">
          <div className="profile-followers">
            <p>
              <Skeleton width={40} />
            </p>
            <p>Followers</p>
          </div>
          <div className="profile-img-container">
            <Skeleton circle={true} height={80} width={80} className="profile-img" />
          </div>
          <div className="profile-following">
            <p>
              <Skeleton width={40} />
            </p>
            <p>Following</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-name">
            <input type="text" className="profile-not-editing-text" readOnly={true} />
            <input type="text" className="profile-not-editing-text" readOnly={true} />
          </div>
          <p className="profile-username">
            <Skeleton width={100} />
          </p>
          <textarea type="text" className="profile-bio profile-not-editing-text" readOnly={true} />
        </div>
        <div className="profile-url profile-url-radius">
          <a href="#" target="_blank">
            <Skeleton width={150} />
          </a>
        </div>
        <div className="profile-save-btn">
          <Skeleton width={80} height={30} />
        </div>
      </div>
    </form>
  </aside>
  )
}