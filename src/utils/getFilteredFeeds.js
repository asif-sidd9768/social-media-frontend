export const getFilteredFeeds = (filters, posts) => {
  return posts
    .sort((prodA, prodB) => {
      if(filters.sortType === "newest"){
        const dateDiff = new Date(prodB.createdAt).getTime() - new Date(prodA.createdAt).getTime();
        if(dateDiff !== 0){
          return dateDiff
        }
      }
      return 0; // Default return value when conditions are not met
    })
    .sort((prodA, prodB) => {
      if(filters.sortType === "trending"){
        const likesDiff = prodB?.likes?.likeCount - prodA?.likes?.likeCount
        if(likesDiff !== 0){
          return likesDiff
        }
      }
      return 0
    })
}