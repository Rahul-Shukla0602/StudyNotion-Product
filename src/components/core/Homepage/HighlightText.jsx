import React from 'react'
import './HighlightText.css'
const HighlightText = ({text}) => {
  return (
    <span className='gradient-text'>
     {" "} 
        {text}
    </span>
  )
}

export default HighlightText
