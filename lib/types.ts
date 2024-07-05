export interface AccountProfileFormProps {
  name: string
  email: string
  image: string
  username: string
  bio: string | null
}

export interface UserProfileProps {
  id: string
  objectId?: string
  username: string
  name: string
  bio: string | null
  image: string
}

export interface UpdateUser {
  userId: string
  username: string
  name: string
  bio: string | null
  image: string | null
  path?: string
}

export interface NewCourseProps {
  id?: string
  courseName: string
  description: string
  image: string | null
  createdBy: string | undefined
  path: string
}

export interface EditCourseUserProps {
  courseId: string
  userId: string
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

export interface FetchedCommentAuthorProps {
  _id: string
  id: string
  image: string
  username: string
}

export interface FetchedCommentProps {
  _id: string
  text: string
  authorMongoId: FetchedCommentAuthorProps
  authorClerkId: string
  authorUsername: string
  authorImage: string
  parentId: string
  children: FetchedCommentProps
  createdAt: Date
}

export interface CommentFormProps {
  commentText: string
}

export interface AddMembersProps {
  addMembersUsernames?: string
  membersRole: 'student' | 'teacher' | 'staff'
}

export interface ICourseMembersData {
  user: ICourseUserData
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
