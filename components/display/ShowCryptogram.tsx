'use client'
import React from 'react'

interface ShowCryptogram {
  title: string
  content: any
}

const ShowCryptogram = ({ content }: ShowCryptogram) => {
  console.log('content', content)

  // Idea: Use state to show some options like name, date, class, teacher...

  return (
    <div className='mx-3 mt-4 flex flex-col rounded-lg border text-center align-middle'>
      {/* <h2>Preview Output</h2> */}
      <div className='p-10'>
        {/* <div>
          <p>Name:_____________ </p>
        </div> */}
        {content.content.map((subArray: [], idx: number) => {
          return (
            <div
              key={idx}
              className='mt-8 flex flex-row justify-center gap-4 text-center text-xl '
            >
              {subArray.map((element, subIdx) => {
                if (element === '  ') {
                  return (
                    <div key={`${idx}${subIdx}`}>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div>
                  )
                } else if (typeof element === 'string') {
                  return (
                    <div key={`${idx}${subIdx}`}>
                      <p>{element}</p>
                      <p>__</p>
                    </div>
                  )
                } else {
                  return (
                    <div key={`${idx}${subIdx}`}>
                      <p>{element}</p>
                      <p>__</p>
                    </div>
                  )
                }
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShowCryptogram
