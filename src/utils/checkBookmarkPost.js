export const checkBookmarkPost = (post, userBookmarks) => {
  return userBookmarks?.find((bm) => (bm?.id ?? bm?._id) === post?.id)
}