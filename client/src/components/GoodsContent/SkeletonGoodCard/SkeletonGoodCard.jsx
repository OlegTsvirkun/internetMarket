
import React from "react"
import ContentLoader from "react-content-loader"
import './SkeletonGoodCard.scss'
export const SkeletonGoodCard = (props) => (
  <ContentLoader 
  className='SkeletonGoodCard'
  speed={2}
  width={300}
  height={500}
  viewBox="0 0 300 500"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  {...props}
>
  <rect x="0" y="0" rx="2" ry="2" width="350" height="332" /> 
  <rect x="0" y="386" rx="0" ry="0" width="300" height="23" /> 
  <rect x="78" y="345" rx="0" ry="0" width="150" height="25" /> 
  <rect x="0" y="417" rx="0" ry="0" width="300" height="23" /> 
  <rect x="0" y="455" rx="0" ry="0" width="115" height="34" /> 
  <rect x="181" y="457" rx="0" ry="0" width="113" height="34" />
</ContentLoader>
)

// export default SkeletonCat

