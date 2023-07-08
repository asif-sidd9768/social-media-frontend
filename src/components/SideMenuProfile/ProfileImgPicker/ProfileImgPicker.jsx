import { useContext, useRef } from "react"

import { updateUserProfileImgService } from "../../../services/userService"
import { UserContext } from "../../../main"
import { updateUserProfileAction } from "../../../actions/userActions"

import "./ProfileImgPicker.css"
import { AVATAR_IMAGES } from "../../../db/avatarImages"

export const ProfileImgPicker = ({toggleImagePicker}) => {
  const { userDispatch } = useContext(UserContext)
  const fileInputRef = useRef(null);

  const getFile = async (isEvent, event, img) => {
    if(isEvent){
      return event?.target?.files[0]
    }else {
      const imgNew = await fetch(img.url)
      const blob = await imgNew.blob()
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
      return file
    }
  }

  const handleProfileImageChange = async (event, img=null) => {
    const file = await getFile(img===null, event, img)
    const formData = new FormData()
    formData.append("profileImage", file)
    try {
      const result = await updateUserProfileImgService(formData)
      console.log(result)
      userDispatch(updateUserProfileAction(result.data))
      toggleImagePicker()
    }catch(error){
      console.log(error)
    }
    // Perform necessary operations with the selected image file
  };
  return (
    <div className="img-picker-container">
      <div onClick={toggleImagePicker} className="img-picker-close">
        <i className="fa-solid fa-x"></i>
      </div>
      <div className="img-picker">
        {
          AVATAR_IMAGES.map((img, index) => 
          <div key={index}>
            <img  src={img.url} className="img-picker-img" onClick={(event) => handleProfileImageChange(event, img)}/> 
          </div>
             
          )
        }
      </div>
      <button type="button" onClick={() => fileInputRef.current.click()} className="img-picker-new-btn">Choose a new one</button>
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