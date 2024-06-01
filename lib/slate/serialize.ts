import { Text } from 'slate'
import escapeHtml from 'escape-html'
import { CustomElement, CustomText } from './slateTypes'

export const serialize = (node: CustomElement | CustomText): string => {
  console.log('NODE in serialize', node)
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    if (node.italic) {
      string = `<em>${string}</em>`
    }
    if (node.underline) {
      string = `<u>${string}</u>`
    }
    return string
  }

  

  const children = node.children.map(n => serialize(n)).join('')
  console.log('CHILDREN in serialize', children)
  // Some incompatibility with the naming in the CustomEditor for right / end alignment
  const alignStyles = node.align ? `text-align:${node.align}` : ''

  switch (node.type) {
    case 'list-item':
      return `<li style="padding-left:0.25rem;${alignStyles}">${children}</li>`
    case 'unordered-list':
      return `<ul style="list-style-type:disc;padding-left:1.25rem;list-style-position: inside;">${children}</ul>`
    case 'ordered-list':
      return `<ol style="list-style-type:number;padding-left:2rem;list-style-position: inside;">${children}</ol>`
    case 'code-block':
      return `<pre style="background-color:black;color:white"><code>${children}</code></pre>`
    case 'heading-one':
      return `<h1 style="font-size:1.5rem;">${children}</h1>`
    case 'heading-two':
      return `<h2 style="font-size:1.25rem">${children}</h2>`
    case 'block-quote':
      return `<blockquote style="border-left-width:4px; font-style: italic"><p style="padding:16px">${children}</p></blockquote>`
    case 'paragraph':
      return `<p style="${alignStyles}">${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}
