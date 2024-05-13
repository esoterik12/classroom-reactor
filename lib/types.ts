export interface IAccountProfileForm {
  name: string
  email: string
  image: string
  username: string
  bio: string
}

export interface IUserProfile {
  id: string
  username: string;
  name: string;
  bio: string;
  image: string;
}

// Form  types:
export interface ICryptogram {
  title: string
  text: string
  givenLetters: string
}

// Dummy not used
interface Quiz {
  questions: Array<{
    question: string;
    options: string[];
    answer: number;
  }>;
}

// Dummy not used
interface Activity {
  summary: string;
  duration: number;
}

type CreateContent = ICryptogram | Quiz | Activity;

export interface IPostCreate {
  content: any // PLACEHOLDER - Until form of content becomes more rigid
  createType: string
  creator: string // Mongo ID
  creatorClerkId: string // Clerk ID
  course: string | null
  creatorUsername: string
  creatorImage: string
}

export interface IComment {
  commentText: string
}