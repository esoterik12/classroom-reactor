import cryptogramGenerator from './cryptogramGenerator'
import { wordScrambleGenerator } from './wordScrambleGenerator'

interface ISelectGenerator {
  createType: string
  // UNFINISHED any used given dynamic nature of content
  content: any
}

export default function selectGenerator({
  content,
  createType
}: ISelectGenerator) {
  switch (createType) {
    case 'cryptogram':
      return cryptogramGenerator(content.text, content.givenLetters)
    case 'wordscramble':
      return wordScrambleGenerator(content.text)
    default:
      console.log('Unrecognized Create Type: ', createType)
  }
}
