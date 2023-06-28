import { Feed } from "./Feed/Feed"
import "./MainSection.css"
import { Menu } from "./Menu/Menu"
import { RightSideBar } from "./RightSideBar/RightSideBar"

export const MainSection = () => {
  return (
    <div className="main-section">
      {/* <Menu /> */}
      <div>
        <div className="scroll-feeds">
          <Feed />
        </div>
      </div>
    </div>
  )
}