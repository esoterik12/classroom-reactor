import React from 'react'
import classes from './Loading.module.css'

const Loading = ({ text }: { text: string }) => {
  return (
    <div className='flex flex-col items-center justify-center pt-24 align-middle'>
      <p>{text}</p>
      <div className={classes.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
