export interface IAccountProfileForm {
  name: string
  email: string
  image: string
  username: string
  bio: string
}

export interface IUserProfile {
  id: string
  objectId?: string
  username: string;
  name: string;
  bio: string;
  image: string;
}

export interface INewCourse {
  id?: string
  courseName: string
  description: string
  image: string | null
  createdBy: string | undefined
  path: string
}

export interface INewModule {
  courseId?: string
  moduleId?: string
  moduleTitle: string
  unit: number
  lesson: number
  createdBy: string | undefined
  path: string
}

export type ICourseCreatedBy = {
  _id: string
  id: string
  username: string
}

export type ICourseContainer = {
  courseId: string
  courseName: string
  image: string
  description: string
  createdBy: ICourseCreatedBy
  createdAt: string
  modules: ModuleDisplayProps[][]
}

export type ModuleDisplayProps = {
  _id: string
  moduleTitle: string
  unit: number
  lesson: number
}

export type AddCommentProps = {
  clerkUserId: string
  createId?: string
  courseId?: string
}

export interface CommentFormProps {
  commentText: string
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

export interface IAddMembers {
  addMembersUsernames: string
  membersRole: 'student' | 'teacher' | 'staff'
}

export interface ICourseMembersData {
  user:ICourseUserData
  role: 'student' | 'teacher' | 'staff'
  _id: string
}

interface ICourseUserData {
  _id: string
  id: string
  name: string
  image: string
  username: string
}
