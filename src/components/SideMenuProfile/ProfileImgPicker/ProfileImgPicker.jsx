import "./ProfileImgPicker.css"
import avatarImg1 from "../../../assets/images/avatar1.jpg"
import avatarImg2 from "../../../assets/images/avatar2.jpg"
import avatarImg3 from "../../../assets/images/avatar3.jpg"
import avatarImg4 from "../../../assets/images/avatar4.png"
import avatarImg5 from "../../../assets/images/avatar5.png"
import avatarImg6 from "../../../assets/images/avatar6.png"
import { useContext, useRef } from "react"
import { updateUserProfileImgService } from "../../../services/userService"
import { UserContext } from "../../../main"
import { updateUserProfileAction } from "../../../actions/userActions"

const avatarImages = [
  {
    id:1,
    url: avatarImg1
  },
  {
    id:2,
    url: avatarImg2
  },
  {
    id:3,
    url: avatarImg3
  },
  {
    id:4,
    url: avatarImg4
  },
  {
    id:5,
    url: avatarImg5
  },
  {
    id:6,
    url: avatarImg6
  }
]
export const ProfileImgPicker = ({toggleImagePicker}) => {
  const { userDispatch } = useContext(UserContext)
  const fileInputRef = useRef(null);

  const handleProfileImageChange = async (event, img=null) => {
    // const file = event?.target?.files[0] ?? null;
    console.log( img)
    const formData = new FormData()
    formData.append("profileImage")
    // try {
    //   const result = await updateUserProfileImgService(formData)
    //   console.log(result)
    //   userDispatch(updateUserProfileAction(result.data))
    // }catch(error){
    //   console.log(error)
    // }
    // Perform necessary operations with the selected image file
  };
  return (
    <div className="img-picker-container">
      <div className="img-picker">
        {
          avatarImages.map((img, index) => 
          <div key={index}>
            <img  src={img.url} className="img-picker-img" onClick={(event) => handleProfileImageChange(event, img)}/> 
            <input
                type="file"
                accept="image/*"
                className="file-input"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileImageChange}
              />
          </div>
             
          )
        }
      </div>
      <button type="button" onClick={() => fileInputRef.current.click()} className="img-picker-new-btn">Choose a new one</button>
    </div>
  )
}