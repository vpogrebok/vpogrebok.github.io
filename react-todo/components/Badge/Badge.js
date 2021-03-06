import React from 'react'
import classNames from 'classnames'
import './Badge.scss'

const Badge = ({ color, onClick, className }) => 
  <div 
     onClick={onClick} 
     className={classNames('badge', {[`badge--${color}`] : color}, className)}></div>

export default Badge