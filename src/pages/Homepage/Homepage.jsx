import { MainSection } from "../../components/MainSection/MainSection"
import { Menu } from "../../components/MainSection/Menu/Menu"
import { RightSideBar } from "../../components/MainSection/RightSideBar/RightSideBar"
import { MenuBar } from "../../components/MenuBar/MenuBar"
import { SideMenu } from "../../components/SideMenu/SideMenu"

import "./Homepage.css"

export const Homepage = () => {
  return (
    <div className="homepage-main">
      <div className="homepage-menu">
        <Menu />
      </div>
      <div className="homepage-container" >
        <div className="scroll-test">
          <MainSection />
        </div>
        <div className="homepage-right-bar">
          <RightSideBar />
        </div>      
        <MenuBar />
      </div>
    </div>
  )
}

<div className="homepage-main">
      <div>
        <Menu />
      </div>
      <div className="homepage-container" >
        <div className="scroll-test">
          <MainSection />
        </div>
        <div className="homepage-right-bar">
          <RightSideBar />
        </div>      
        <MenuBar />
      </div>
    </div>