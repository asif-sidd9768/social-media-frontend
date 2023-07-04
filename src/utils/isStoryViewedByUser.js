export const isStoryViewedByUser = (story, userId) => {
  return story?.viewers?.find(({userId: sUserId}) => sUserId === userId)
}