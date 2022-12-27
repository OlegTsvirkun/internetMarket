import React from 'react';
import  './Tooltip.scss';

export const Tooltip = ({error, className}) =>{
  return (
  <div className={`tooltip ${className}`}>
{error}
 </div>
)};

