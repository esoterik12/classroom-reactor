import { Editor } from 'slate'
const withEmbeds = (editor: Editor) => {
  const { insertData } = editor

  editor.insertData = data => {
    // Overwriting insertData method
    console.log('Data', data.getData('text/plain'))

    return insertData(data)
  }

  return editor
}

export default withEmbeds
