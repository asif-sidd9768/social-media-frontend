import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

export const PostCardSkeleton = () => {
  return (
    <div>
       <SkeletonTheme color="#f2f2f2" highlightColor="#e0e0e0">
        <div className="post-card-container">
          <div className="post-card-header">
            <div className="post-card-user">
              <span className="post-card-profile">
                <Skeleton circle={true} height={24} width={24} />
              </span>
              <span className="post-card-header-text">
                <Skeleton count={2} />
              </span>
            </div>
          </div>
          <div className="post-card-img-container">
            <Skeleton height={100}  />
          </div>
          <div className="post-card-content">
            <Skeleton count={2} />
          </div>
          <div className="post-card-bottom-btns">
            <span>
              <Skeleton height={24} width={24} /> 
            </span>
            <span>
              <Skeleton height={24} width={24} /> 
            </span>
            <span>
              <Skeleton height={24} width={24} /> 
            </span>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  )
}