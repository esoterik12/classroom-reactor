'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import { IPostCreate } from '../types'
import User from '../models/user.models'
import Create from '../models/create.model'
import Course from '../models/course.model'
import Comment from '../models/comment.model'

export async function fetchCreate(pageNumber = 1, pageSize = 20) {
  await connectToDB()

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize

  const createQuery = Create.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'creator',
      model: User
    })
    .populate({
      path: 'course',
      model: Course
    })

  const totalCreatesCount = await Create.countDocuments({
    parentId: { $in: [null, undefined] }
  })

  const creates = await createQuery.exec()

  const isNext = totalCreatesCount > skipAmount + creates.length

  return { creates, isNext }
}

export async function fetchSingleCreate(createId: string) {
  await connectToDB()

  const fetchedCreate = await Create.findById(createId).populate({
    path: 'children',
    model: 'Comment',
    populate: {
      path: 'authorMongoId', // Path to the user who authored the comment
      model: 'User',
      select: 'username image id' // Selecting specific fields
    }
  })

  // Now, to display this information:
  // if (fetchedCreate && fetchedCreate.children && fetchedCreate.children.length > 0) {
  //   fetchedCreate.children.forEach((comment: any) => {
  //     if (comment.authorMongoId) {
  //       console.log("Comment Author's Username:", comment.authorMongoId.username);
  //       console.log("Comment Author's Image:", comment.authorMongoId.image);
  //       console.log("Comment Author's Clerk ID:", comment.authorMongoId.id);
  //     }
  //   });
  // } else {
  //   console.log("No comments or comment author information available.");
  // }

  return fetchedCreate
}

export async function postCreate({
  content,
  createType,
  creator,
  creatorClerkId,
  course,
  creatorUsername,
  creatorImage
}: IPostCreate) {
  try {
    await connectToDB()

    // Possible issue here - check github
    const courseIdObject = await Course.findOne({ id: course }, { _id: 1 })

    const postedCreate = await Create.create({
      content,
      creator,
      creatorClerkId,
      createType,
      course: courseIdObject, // Assign communityId if provided, or leave it null for personal account
      creatorUsername,
      creatorImage
    })

    // Update User model
    await User.findByIdAndUpdate(creator, {
      $push: { creates: postedCreate._id }
    })

    revalidatePath('/')
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`)
  }
}

async function fetchAllCreateComments(createId: string): Promise<any[]> {
  const childComments = await Comment.find({ parentId: createId })

  // const descendantComments = []
  // for (const childComment of childComments) {
  //   const descendants = await fetchAllCreateComments(childComment._id)
  //   descendantComments.push(childComment, ...descendants)
  // }

  // return descendantComments
  return childComments
}

// UNFINISHED
// export async function deleteCreate(id: string): Promise<void> {
//   try {
//     connectToDB()

//     // Find main create to delete
//     const mainCreate = await Create.findById(id).populate('creator')

//     if (!mainCreate) {
//       throw new Error('Create not found.')
//     }

//     // Fetch all child comments and their descendants recusively
//     const descendantComments = await fetchAllCreateComments(id)

//     const descendantCommentsIds = [
//       ...descendantComments.map(comment => comment._id)
//     ]

//     console.log('descendantComments', descendantComments)

//     const uniqueAuthorIds = new Set(
//       [
//         ...descendantComments.map(comment =>
//           comment.authorMongoId?._id?.toString()
//         ),
//         mainCreate.creator?._id?.toString()
//       ].filter(id => id !== undefined)
//     )

//     await Create.deleteOne({ _id: id })
//     await Comment.deleteMany({ _id: { $in: descendantCommentsIds } })

//     // Update User model
//     await User.updateMany(
//       { _id: { $in: Array.from(uniqueAuthorIds) } },
//       { $pull: { creates: { $in: descendantCommentsIds } } }
//     )
//   } catch (error: any) {
//     throw new Error(`Failed to delete thread: ${error.message}`)
//   }
// }

export async function deleteCreate(id: string): Promise<void> {
  try {
    connectToDB();

    // Find main create to delete
    const mainCreate = await Create.findById(id).populate('creator');

    if (!mainCreate) {
      throw new Error('Create not found.');
    }

    // Fetch all child comments directly associated with the create plus their descendants
    const directChildComments = await Comment.find({ parentId: id });
    const allDescendantComments = [];
    
    for (const childComment of directChildComments) {
      const descendants = await fetchAllCreateComments(childComment._id);
      allDescendantComments.push(childComment, ...descendants);
    }

    const allCommentIds = [
      ...allDescendantComments.map(comment => comment._id)
    ];

    console.log('All related comments', allDescendantComments);

    const uniqueAuthorIds = new Set(
      [
        ...allDescendantComments.map(comment =>
          comment.authorMongoId?._id?.toString()
        ),
        mainCreate.creator?._id?.toString()
      ].filter(id => id !== undefined)
    );

    await Create.deleteOne({ _id: id });
    await Comment.deleteMany({ _id: { $in: allCommentIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { creates: id } }
    );
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}



export async function addCreateComment(
  createId: string,
  commentText: string,
  clerkUserId: string,
  path: string
) {
  connectToDB()

  try {
    const dbUser = await User.findOne({ id: clerkUserId })

    if (!dbUser) {
      throw new Error('User not found.')
    }

    console.log('dbUser', dbUser)

    const originalCreate = await Create.findById(createId)

    if (!originalCreate) {
      throw new Error('Create not found.')
    }

    const savedCommentCreate = new Comment({
      text: commentText,
      authorMongoId: dbUser._id,
      authorClerkId: clerkUserId,
      authorUsername: dbUser.username,
      authorImage: dbUser.image,
      parentId: originalCreate._id
    })

    const saveCommentResult = await savedCommentCreate.save()

    originalCreate.children.push(savedCommentCreate._id)

    await originalCreate.save()

    revalidatePath(path)

    console.log('saveCommentResult', saveCommentResult)
  } catch (error: any) {
    throw new Error(`Failed to post comment: ${error.message}`)
  }
}
