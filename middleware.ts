import { auth } from "@/lib/auth";

export default auth((req) => {
  // This middleware runs on protected routes only
});

export const config = {
  matcher: [
    // Only protect cryptonez routes, admin
    "/cryptonez/:path*",
    "/admin/:path*"
  ]
};
