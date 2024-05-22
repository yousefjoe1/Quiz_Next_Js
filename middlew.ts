import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { authAction } from './app/ApiReq/isAuth';



// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {

    // const isAuthenticated = await authAction(); // Replace with your actual auth check
  
    // if (isAuthenticated.state == 'false') {
    //   // Redirect to login page if not authenticated
    //   return NextResponse.redirect(new URL('/login', req.url).toString());
    // }
  
    // Continue to the next middleware or route
    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/adminUser/:path*', '/dashboard/:path*'],
}