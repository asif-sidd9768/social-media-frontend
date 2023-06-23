export const getFilteredFeeds = (filters, posts) => {
  // posts.filter(post => {
  //   return true
  // })

  return posts
    .sort((prodA, prodB) => {
      if(filters.showDate){
        const dateDiff = filters.showDate === 'oldest' ? new Date(prodA.createdAt).getTime() - new Date(prodB.createdAt).getTime() : new Date(prodB.createdAt).getTime() - new Date(prodA.createdAt).getTime();
        if(dateDiff !== 0){
          return dateDiff
        }
      }
      return 0; // Default return value when conditions are not met
    })
    .sort((prodA, prodB) => {
      if(filters.showTrending){
        const likesDiff = prodB?.likes?.likeCount - prodA?.likes?.likeCount
        if(likesDiff !== 0){
          return likesDiff
        }
      }
      return 0
    })
}