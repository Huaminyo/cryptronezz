import { auth } from "@/lib/auth";

export default auth((req) => {
  // This middleware runs on all requests
  // Protected routes can be added via matcher below
});

export const config = {
  matcher: [
    // Protect admin and cryptonez routes
    "/cryptonez/:path*",
    // Exclude public routes
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)"
  ]
};
