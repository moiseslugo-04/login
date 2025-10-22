import { auth } from '@lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'
export default auth(async (req: NextRequest) => {
  const { pathname } = req.nextUrl
  const publicRoutes = ['/auth/signin', 'register']

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  const session = await auth()

  if (!session?.user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
  if (session?.user && isPublicRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
})
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
}
