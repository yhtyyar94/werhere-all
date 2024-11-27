import { NextRequest, NextResponse } from "next/server";
// ./middleware.ts

import * as crypto from "node:crypto";

// import { getIronSession } from "iron-session";

// // 1. Specify protected and public routes
// const protectedRoutes = ["/admin"];
// const publicRoutes = ["/login", "/"];

export default async function middleware(req: NextRequest, res: NextResponse) {
  // 2. Check if the current route is protected or public
  // const path = req.nextUrl.pathname;
  // const isProtectedRoute = protectedRoutes.includes(path);
  // const isPublicRoute = publicRoutes.includes(path);
  // console.log();
  // const session = await getIronSession(req, res, {
  //   password: process.env.SECRET_COOKIE_PASSWORD as string,
  //   cookieName: "werhere",
  //   // cookieOptions: {
  //   //   secure: process.env.NODE_ENV === "production",
  //   // },
  // });
  // console.log(session);
  // // @ts-ignore
  // const isUserLoggedIn = session && session.username ? true : false;

  // if (isProtectedRoute && !isUserLoggedIn) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/login";
  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
}

// // Routes Middleware should not run on
// export const config = {
//   matcher: ["/((?!api/auth/.*).*)"],
// };
