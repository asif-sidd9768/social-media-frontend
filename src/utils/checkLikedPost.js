export const checkLikedPost = (post) => {
  return post?.likes?.likedBy?.find(({id}) => id === JSON.parse(localStorage.getItem("user")).user?.id)
}