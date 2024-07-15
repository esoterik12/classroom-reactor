import mongoose from 'mongoose'

export const grammarContentArray = [
  JSON.stringify([
    {
      type: 'paragraph',
      children: [
        { text: 'Coordinating Conjunctions', bold: true, underline: true }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Coordinating conjunctions connect words, phrases, or clauses that are of equal importance in a sentence. The most common coordinating conjunctions can be remembered by the acronym FANBOYS:'
        }
      ]
    },
    {
      type: 'unordered-list',
      children: [
        { type: 'list-item', children: [{ text: 'For' }] },
        { type: 'list-item', children: [{ text: 'And' }] },
        { type: 'list-item', children: [{ text: 'Nor' }] },
        { type: 'list-item', children: [{ text: 'But' }] },
        { type: 'list-item', children: [{ text: 'Or' }] },
        { type: 'list-item', children: [{ text: 'Yet' }] },
        { type: 'list-item', children: [{ text: 'So' }] }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [{ text: 'Example Sentences:', bold: true, underline: true }]
    },
    {
      type: 'unordered-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: 'I wanted to go for a walk, but it was raining.' }]
        },
        {
          type: 'list-item',
          children: [{ text: 'She can have tea or coffee.' }]
        },
        {
          type: 'list-item',
          children: [{ text: 'He studied hard, so he passed the exam.' }]
        }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Usage Tip: A comma is often used before the conjunction in compound sentences.',
          italic: true
        }
      ]
    }
  ]),
  JSON.stringify([
    {
      type: 'paragraph',
      children: [
        { text: 'Subordinating Conjunctions', bold: true, underline: true }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Subordinating conjunctions connect a dependent clause to an independent clause, showing a relationship such as cause, time, or condition.'
        }
      ]
    },
    {
      type: 'unordered-list',
      children: [
        { type: 'list-item', children: [{ text: 'Because' }] },
        { type: 'list-item', children: [{ text: 'Although' }] },
        { type: 'list-item', children: [{ text: 'Since' }] },
        { type: 'list-item', children: [{ text: 'If' }] },
        { type: 'list-item', children: [{ text: 'When' }] },
        { type: 'list-item', children: [{ text: 'While' }] }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [{ text: 'Example Sentences:', bold: true, underline: true }]
    },
    {
      type: 'unordered-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: 'She was late because she missed the bus.' }]
        },
        {
          type: 'list-item',
          children: [{ text: 'Although it was raining, we went for a hike.' }]
        },
        {
          type: 'list-item',
          children: [{ text: 'If you finish your homework, you can watch TV.' }]
        }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Usage Tip: The dependent clause can come at the beginning or end of a sentence. When it comes at the beginning, use a comma to separate the clauses.',
          italic: true
        }
      ]
    }
  ]),
  JSON.stringify([
    {
      type: 'paragraph',
      children: [
        { text: 'Correlative Conjunctions', bold: true, underline: true }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Correlative conjunctions work in pairs to join equal elements in a sentence.'
        }
      ]
    },
    {
      type: 'unordered-list',
      children: [
        { type: 'list-item', children: [{ text: 'Both...and' }] },
        { type: 'list-item', children: [{ text: 'Either...or' }] },
        { type: 'list-item', children: [{ text: 'Neither...nor' }] },
        { type: 'list-item', children: [{ text: 'Not only...but also' }] }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [{ text: 'Example Sentences:', bold: true, underline: true }]
    },
    {
      type: 'unordered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'Both the teacher and the students were excited about the project.'
            }
          ]
        },
        {
          type: 'list-item',
          children: [
            { text: 'Either you can come with us, or you can stay home.' }
          ]
        },
        {
          type: 'list-item',
          children: [{ text: 'She is not only smart but also hardworking.' }]
        }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Usage Tip: Ensure that the elements connected by correlative conjunctions are parallel in structure.',
          italic: true
        }
      ]
    }
  ]),
  JSON.stringify([
    {
      type: 'paragraph',
      children: [{ text: 'Conjunctions of Time', bold: true, underline: true }]
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Conjunctions of time are used to connect events in time, indicating when something happens.'
        }
      ]
    },
    {
      type: 'unordered-list',
      children: [
        { type: 'list-item', children: [{ text: 'After' }] },
        { type: 'list-item', children: [{ text: 'Before' }] },
        { type: 'list-item', children: [{ text: 'When' }] },
        { type: 'list-item', children: [{ text: 'While' }] },
        { type: 'list-item', children: [{ text: 'Until' }] },
        { type: 'list-item', children: [{ text: 'As soon as' }] }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [{ text: 'Example Sentences:', bold: true, underline: true }]
    },
    {
      type: 'unordered-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: 'I will call you after I finish my work.' }]
        },
        {
          type: 'list-item',
          children: [{ text: 'Before you leave, please close the door.' }]
        },
        {
          type: 'list-item',
          children: [{ text: 'We can go out when the rain stops.' }]
        }
      ]
    },
    { type: 'paragraph', children: [{ text: '' }] },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Usage Tip: Conjunctions of time help to show the order of events. Use them to make your writing clearer.',
          italic: true
        }
      ]
    }
  ])
]

type CourseContent = {
  moduleTitle: string
  createdBy: string | mongoose.Types.ObjectId
  htmlContent: string
  unit: number
  lesson: number
}

export function createCourseContent(
  numOfUnits: number,
  lessonsPerUnit: number
) {
  const newArray = []
  let contentIndex = 0
  let weekCount = 1

  for (let unit = 1; unit <= numOfUnits; unit++)
    for (let lesson = 1; lesson <= lessonsPerUnit; lesson++) {
      const newModule: CourseContent = {
        moduleTitle: `Grammar Week ${weekCount}`,
        createdBy: '',
        htmlContent:
          grammarContentArray[contentIndex % grammarContentArray.length],
        unit: unit,
        lesson: lesson
      }
      newArray.push(newModule)
      contentIndex++
      weekCount++
    }

  return newArray
}

createCourseContent(10, 2)
