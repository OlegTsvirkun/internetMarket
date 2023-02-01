
import React from "react"
import ContentLoader from "react-content-loader"
import './SkeletonCat.scss'
export const SkeletonCat = (props) => (
  <ContentLoader 
  className='skeletonCat'
    speed={2}
    width={300}
    height={350}
    viewBox="0 0 220 270"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="60" y="20" rx="2" ry="2" width="100" height="24" /> 
    <rect x="0" y="65" rx="0" ry="0" width="250" height="130" /> 
    <rect x="0" y="200" rx="2" ry="2" width="250" height="14" /> 
    <rect x="0" y="220" rx="2" ry="2" width="250" height="14" /> 
    <rect x="0" y="240" rx="2" ry="2" width="250" height="14" /> 
    {/* <rect x="0" y="260" rx="2" ry="2" width="250" height="14" />  */}
    {/* <rect x="0" y="277" rx="2" ry="2" width="300" height="20" /> */}
  </ContentLoader>
)

// export default SkeletonCat

