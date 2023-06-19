export const checkLikedPost = (post) => {
  return post?.likes?.likedBy?.find(({_id}) => _id === JSON.parse(localStorage.getItem("user")).user?._id)
}