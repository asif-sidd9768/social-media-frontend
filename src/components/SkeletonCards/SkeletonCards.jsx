import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import "./SkeletonCards.css"

export const SkeletonCards = ({cardCount}) => {
  return (
    <>
      {Array.from({ length: cardCount }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <Skeleton width={175} height={200} />
        </div>
      ))}
    </>
  )
}