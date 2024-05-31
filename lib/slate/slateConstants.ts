import { MarkButtonsArray, ToggleBlockButtonArray } from './slateTypes'
export const markButtons: MarkButtonsArray[] = [
  {
    markFormat: 'bold',
    icon: 'boldRTE'
  },
  {
    markFormat: 'italic',
    icon: 'italicRTE'
  },
  {
    markFormat: 'underline',
    icon: 'underlineRTE'
  }
]

export const toggleBlockButtons: ToggleBlockButtonArray[] = [
  {
    formatButton: 'left',
    icon: 'leftRTE'
  },
  {
    formatButton: 'center',
    icon: 'centerRTE'
  },
  {
    formatButton: 'right',
    icon: 'rightRTE'
  },
  {
    formatButton: 'justify',
    icon: 'justifyRTE'
  },
  {
    formatButton: 'block-quote',
    icon: 'quoteRTE'
  },
  {
    formatButton: 'unordered-list',
    icon: 'unorderedRTE'
  },
  {
    formatButton: 'ordered-list',
    icon: 'orderedRTE'
  },
  {
    formatButton: 'code-block',
    icon: 'codeRTE'
  },
  {
    formatButton: 'heading-one',
    buttonText: 'H1'
  },
  {
    formatButton: 'heading-two',
    buttonText: 'H2'
  }
]
