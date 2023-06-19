export const checkBookmarkPost = (post, userBookmarks) => {
  console.log('test=== ',userBookmarks);
  return userBookmarks.find(({_id}) => _id === post._id)
}