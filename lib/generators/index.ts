import cryptogramGenerator from './cryptogramGenerator'

interface ISelectGenerator {
  createType: string
  content: any
}

export default function selectGenerator({
  content,
  createType
}: ISelectGenerator) {
  switch (createType) {
    case 'cryptogram':
      return cryptogramGenerator(content.text, content.givenLetters)
    default:
      console.log('Unrecognized Create Type: ', createType)
  }
}
