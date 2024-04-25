import React from 'react'
import classes from './Loading.module.css'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className={classes.ldsRipple}><div></div><div></div></div>
  )
}

export default Loading