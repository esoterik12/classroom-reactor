
export type CustomElement = {
  type: string | null
  children: CustomText[]
  align?: string | null
  url?: string
  youtubeId?: string
}
export type CustomText = {
  text: string
  bold?: string
  italic?: string
  underline?: string
}

export type MarkFormatTypes = 'bold' | 'underline' | 'italic'

export type MarkButtonsArray = {
  markFormat: MarkFormatTypes
  icon: string
}

export type ToggleBlockTypes =
  | 'left'
  | 'center'
  | 'right'
  | 'justify'
  | 'block-quote'
  | 'code-block'
  | 'unordered-list'
  | 'ordered-list'
  | 'heading-one'
  | 'heading-two'

  export type ToggleBlockButtonArray = {
    formatButton: ToggleBlockTypes
    icon?: string
    buttonText?: string
  }
  