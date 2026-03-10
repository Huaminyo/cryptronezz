import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/(marketing)" || request.nextUrl.pathname === "/%28marketing%29") {
    return NextResponse.redirect(new URL("/marketing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"]
};
