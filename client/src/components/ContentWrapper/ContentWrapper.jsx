import React from 'react'
import styles from './ContentWrapper.module.scss'

export const ContentWrapper = ({ children, className = '' }) => {
  return (
    <div className={`${styles.contentWrapper} ${className}`}>{ children }</div>
  )
}