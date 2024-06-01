import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms
} from 'slate'
import { ToggleBlockTypes, CustomText, CustomElement, MarkFormatTypes } from '@/lib/slate/slateTypes'

const LIST_TYPES = ['ordered-list', 'unordered-list', 'list-item']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const embedRegexes = [
  {
    regex: /https:\/\/www\.youtube\.com\/watch\?v=([-\w]+)/,
    type: 'youtube'
  }
]

const CustomEditor = {
  handleEmbed(editor: Editor, event: React.ClipboardEvent<HTMLDivElement>) {
    const text = event.clipboardData.getData('text/plain')

    embedRegexes.some(({ regex, type }) => {
      const match = text.match(regex)
      if (text.match(regex) && match) {
        console.log('match', type, match[1])
        event.preventDefault()

        Transforms.insertNodes(editor, {
          children: [{ text: '' }],
          type,
          youtubeId: match[1]
        })

        return true
      }

      return false
    })
  },

  // Currently only logs pasted text
  handlePaste(editor: Editor, event: React.ClipboardEvent<HTMLDivElement>) {
    CustomEditor.handleEmbed(editor, event)
    console.log('onPaste', event.clipboardData.getData('text/plain'))
  },

  // Dynamic Mark Functions Development Start //
  isMarkActive(editor: Editor, format: MarkFormatTypes) {
    const marks = Editor.marks(editor)
    if (marks) {
      return marks[format] ? true : false
    }
    return
  },

  toggleMark(editor: Editor, format: MarkFormatTypes) {
    const isActive = CustomEditor.isMarkActive(editor, format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  },
  // Dynamic Mark Functions Development End //

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes<CustomElement>(editor, {
      // Requires edit to tsconfig - "downlevelIteration": true,
      match: n => (n as CustomElement).type === 'code'
    })

    return !!match
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
    )
  },

  isAlignBlockActive(editor: Editor, format: ToggleBlockTypes) {
    const [match] = Editor.nodes<CustomElement>(editor, {
      match: n => (n as CustomElement).align === format
    })

    return !!match
  },

  toggleAlignBlock(editor: Editor, format: ToggleBlockTypes) {
    const isActive = CustomEditor.isAlignBlockActive(editor, format)
    Transforms.setNodes(
      editor,
      { align: isActive ? null : format },
      { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
    )
  },

  isListBlockActive(editor: Editor, format: 'numbered-list' | 'bulleted-list') {
    const [match] = Editor.nodes<CustomElement>(editor, {
      match: n => (n as CustomElement).type === format
    })

    return !!match
  },

  isBlockActive(
    editor: Editor,
    format: string,
    blockType: 'type' | 'align' = 'type'
  ) {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format
      })
    )

    return !!match
  },

  toggleBlock(editor: Editor, format: string) {
    // Check is current selection already has specified format applied
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    // removes the current block type wrapper if it's a list type
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        !!n.type &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true
    })

    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
      // Toggles alignment property
      newProperties = {
        align: isActive ? undefined : format
      }
    } else {
      // Switches block type to paragraph, list item or other
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format
      }
    }

    // Apply new properties
    Transforms.setNodes<SlateElement>(editor, newProperties)

    // Wrapping list types
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
}

export default CustomEditor
