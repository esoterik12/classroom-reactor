import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // Array of public routes that don't require authentication.
  publicRoutes: ['/', '/reactor', '/api/webhook/clerk', '/api/uploadthing'],

  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ['/api/webhook/clerk', '/api/uploadthing']
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
