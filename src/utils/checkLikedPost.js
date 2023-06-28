export const checkLikedPost = (post, userId) => {
  return post?.likes?.likedBy?.find(({id}) => id === userId)
}