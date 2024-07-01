'use client'

import { useEffect, useState } from 'react'

// UNFINISHED: TYPES ANYS
interface ShowSpotItProps {
  title: string
  content: any
}

// Put these functions in lib
export function prepareWords(wordsArray: string[]) {
  const outputArray = [...wordsArray]
  const randomIndex = Math.floor(Math.random() * outputArray.length)
  const duplicatedWord = outputArray[randomIndex]
  outputArray.push(duplicatedWord)

  for (let i = 0; i < 20; i++) {
    outputArray.push('blankSpace')
  }

  const shuffledArray = shuffleArray(outputArray)

  return shuffledArray
}
function shuffleArray(wordsArray: string[]) {
  const outputArray = [...wordsArray]
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]]
  }
  return outputArray
}

const ShowSpotIt = ({ content }: ShowSpotItProps) => {
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    setWords(prepareWords(content))
  }, [])

  console.log('words', words)

  return (
    <div className='mx-3 mt-4 flex flex-col rounded-lg border text-center align-middle'>
      <div className='p-10 grid grid-cols-6'>
        {words.map((word: string, idx: number) => {
          if (word === 'blankSpace') {
            return <p className='m-4' key={idx}>&nbsp;</p>
          } else {
            return (
              <p className='m-4' key={idx}>
                {word}
              </p>
            )
          }
        })}
      </div>
    </div>
  )
}

export default ShowSpotIt
