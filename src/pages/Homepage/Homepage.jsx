import { MainSection } from "../../components/MainSection/MainSection"
import { MenuBar } from "../../components/MenuBar/MenuBar"
import { SideMenu } from "../../components/SideMenu/SideMenu"

import "./Homepage.css"

export const Homepage = () => {
  return (
    <div >
      {/* <SideMenu /> */}
      <MainSection />
      <MenuBar />
    </div>
  )
}