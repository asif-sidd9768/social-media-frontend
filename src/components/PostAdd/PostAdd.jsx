import { useContext, useEffect, useRef } from "react";
import { FeedPost } from "../MainSection/FeedPost/FeedPost"
import "./PostAdd.css"
import { PostContext } from "../../main";
import { addNewPostAction } from "../../actions/postActions";

export const PostAdd = () => {
  const {postDispatch} = useContext(PostContext)
  const addBtnRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      console.log(event, addBtnRef.current)
      if (addBtnRef.current && addBtnRef.current.contains(event.target)) {
        return
      }
      postDispatch(addNewPostAction(false))
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="add-container" ref={addBtnRef}>
      <div className="add-content">
        <FeedPost />
      </div>
    </div>
  )
}