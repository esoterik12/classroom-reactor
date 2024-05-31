'use client'
import { RenderElementProps } from 'slate-react'

const YouTubeVideoRTE: React.FC<RenderElementProps> = props => {
  const { attributes, children, element } = props
  const { youtubeId } = element

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <iframe
          width='560'
          height='315'
          title='Youtube Video Player'
          src={`https://www.youtube.com/embed/${youtubeId}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
        />
        {children}
      </div>
    </div>
  )
}

export default YouTubeVideoRTE
