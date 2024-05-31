'use client'
import { RenderElementProps } from 'slate-react'

const CustomImageRTE: React.FC<RenderElementProps> = props => (
  <div {...props.attributes}>
    <div contentEditable={false}>
      <img {...props.attributes} src={props.element.url} alt='img' />
    </div>
    {props.children}
  </div>
)

export default CustomImageRTE
