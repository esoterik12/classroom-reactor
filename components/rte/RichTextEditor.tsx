'use client'
import { useCallback, useState } from 'react'
import {
  createEditor,
  BaseEditor,
} from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { RenderElementProps, RenderLeafProps } from 'slate-react'
import withEmbeds from '@/lib/slate/withEmbeds'
import CustomEditor from './CustomEditor'
import YouTubeVideoRTE from './YouTubeVideo'
import CustomImageRTE from './CustomImage'
import SelectIcon from '../icons/SelectIcon'
import { useEffect } from 'react'
import { CustomElement, CustomText } from '@/lib/slate/slateTypes'
import { markButtons } from '@/lib/slate/slateConstants'
import { toggleBlockButtons } from '@/lib/slate/slateConstants'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const DefaultElement: React.FC<RenderElementProps> = ({
  attributes,
  children,
  element
}) => {
  // Dynamic class for text alignment
  const textAlignClass = element.align ? `text-${element.align}` : ''

  // Base classes for each element type
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          {...attributes}
          className={`border-neutral-500 bg-neutral-100 text-neutral-600 border-l-4 p-4 italic ${textAlignClass}`}
        >
          {children}
        </blockquote>
      )
    case 'unordered-list':
      return (
        <ul
          {...attributes}
          className={`list-disc space-y-2 pl-5 ${textAlignClass}`}
        >
          {children}
        </ul>
      )
    case 'ordered-list':
      return (
        <ol
          {...attributes}
          className={`list-decimal space-y-2 pl-5 ${textAlignClass}`}
        >
          {children}
        </ol>
      )
    case 'list-item':
      return (
        <li {...attributes} className={`pl-2 ${textAlignClass}`}>
          {children}
        </li>
      )
    case 'heading-one':
      return (
        <h1 {...attributes} className={`text-2xl ${textAlignClass}`}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 {...attributes} className={`text-xl ${textAlignClass}`}>
          {children}
        </h2>
      )
    case 'code-block':
      return (
        <pre
          {...attributes}
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          <code>{children}</code>
        </pre>
      )
    default:
      return (
        <p {...attributes} className={`${textAlignClass}`}>
          {children}
        </p>
      )
  }
}

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const RichTextEdiotor = () => {
  const [editor] = useState(() => withEmbeds(withReact(createEditor())))
  const [initialValue, setInitialValue] = useState<CustomElement[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ])

  useEffect(() => {
    const content = localStorage.getItem('content')
    if (content) {
      setInitialValue(JSON.parse(content))
    }
  }, [])

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'image':
        return <CustomImageRTE {...props} />
      case 'youtube':
        return <YouTubeVideoRTE {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  return (
    <main className='flex flex-col'>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={value => {
          // Do nothing if change is just a selection
          const isAstChange = editor.operations.some(
            op => op.type !== 'set_selection'
          )

          if (isAstChange) {
            // Save value to local storage
            const content = JSON.stringify(value)
            localStorage.setItem('content', content)
          }
        }}
      >
        {/* Toolbar Div */}
        <div className='mb-2 flex flex-row flex-wrap gap-1'>
          {/* Mark Buttons */}
          {markButtons.map(item => (
            <button
              key={item.markFormat}
              className='rounded-md p-1 transition-colors duration-300 hover:text-gray-500'
              onMouseDown={event => {
                event.preventDefault()
                CustomEditor.toggleMark(editor, item.markFormat)
              }}
              onClick={event => {
                event.preventDefault()
              }}
            >
              <SelectIcon iconClasses='h-7 w-7 p-1' iconSelection={item.icon} />
            </button>
          ))}

          {toggleBlockButtons.map(item => (
            <button
              key={item.formatButton}
              className='rounded-md transition-colors duration-300 hover:text-gray-500'
              onMouseDown={event => {
                event.preventDefault()
                CustomEditor.toggleBlock(editor, item.formatButton)
              }}
              onClick={event => {
                event.preventDefault()
              }}
            >
              {item.icon ? (
                <SelectIcon
                  iconClasses='h-7 w-7 p-1'
                  iconSelection={item.icon}
                />
              ) : (
                <p className='rounded-md bg-jet-900 px-1 py-1  text-xs font-bold text-offWhite-500 transition-colors duration-300 hover:bg-gray-500'>
                  {item.buttonText}
                </p>
              )}
            </button>
          ))}

        </div>

        {/* Editable Div */}
        <Editable
          className='focus:border-transparent ml-1 block rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-secondary-500'
          onChange={value => {
            console.log('onchange', value)
          }}
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }

            // Adding shortcuts
            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }

              case 'b': {
                event.preventDefault()
                CustomEditor.toggleMark(editor, 'bold')
                break
              }
            }
          }}
          onPaste={event => {
            CustomEditor.handlePaste(editor, event)
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </main>
  )
}

export default RichTextEdiotor
