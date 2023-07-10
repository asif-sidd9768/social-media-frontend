import { Feed } from "./Feed/Feed"

import "./MainSection.css"

export const MainSection = () => {
  return (
    <div className="main-section">
      <div>
        <div className="scroll-feeds">
          <Feed />
        </div>
      </div>
    </div>
  )
}