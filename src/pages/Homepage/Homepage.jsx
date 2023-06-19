import { MainSection } from "../../components/MainSection/MainSection"
import { SideMenu } from "../../components/SideMenu/SideMenu"

import "./Homepage.css"

export const Homepage = () => {
  return (
    <div className="homepage-container">
      <SideMenu />
      <MainSection />
    </div>
  )
}