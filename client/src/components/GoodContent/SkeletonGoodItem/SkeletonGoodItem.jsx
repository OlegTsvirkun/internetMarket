
import React from "react"
import ContentLoader from "react-content-loader"
import './SkeletonGoodItem.scss'
export const SkeletonGoodItem = (props) => (
  <ContentLoader 
  className='SkeletonGoodItem'
    speed={2}
    width={1100}
    height={1020}
    viewBox="0 0 1100 1020"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
    >
    {/* <rect x="0" y="0" rx="0" ry="0" width="115" height="26" />  */}
    <rect x="0" y="65" rx="0" ry="0" width="500" height="23" /> 
    <rect x="0" y="130" rx="2" ry="2" width="500" height="500" /> 
    <rect x="570" y="130" rx="0" ry="0" width="115" height="25" /> 
    <rect x="570" y="172" rx="0" ry="0" width="400" height="16" /> 
    <rect x="570" y="193" rx="0" ry="0" width="300" height="16" /> 
    <rect x="570" y="219" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="239" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="259" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="279" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="299" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="319" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="337" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="357" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="377" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="397" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="417" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="437" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="456" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="476" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="496" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="516" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="536" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="556" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="574" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="594" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="614" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="634" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="654" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="674" rx="0" ry="0" width="430" height="14" /> 
    <rect x="570" y="713" rx="0" ry="0" width="150" height="45" />
    <rect x="150" y="655" rx="0" ry="0" width="200" height="34" /> 
    <rect x="115" y="720" rx="0" ry="0" width="270" height="230" /> 
    <rect x="80" y="720" rx="0" ry="0" width="16" height="16" /> 
    <rect x="402" y="720" rx="0" ry="0" width="16" height="16" /> 
  </ContentLoader>
)

// export default SkeletonCat

