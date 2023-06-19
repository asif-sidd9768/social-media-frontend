import { Feed } from "./Feed/Feed"
import "./MainSection.css"
import { Menu } from "./Menu/Menu"
import { RightSideBar } from "./RightSideBar/RightSideBar"

export const MainSection = () => {
  return (
    <div>
      <Menu />
      <div className="main-section">
        <Feed />
        <RightSideBar />
      </div>
    </div>
  )
}