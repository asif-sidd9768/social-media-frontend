import { Feed } from "../MainSection/Feed/Feed"
import { Menu } from "../MainSection/Menu/Menu"

import "./ProfileSection.css"

export const ProfileSection = () => {
  return (
    <div className="profile-section-container">
      {/* <Menu /> */}
      <div className="scroll-feeds">
        <Feed />
      </div>
    </div>
  )
}