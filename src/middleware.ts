import { LOCALE_CODES } from "@/lib/locales";
import { NextRequest, NextResponse } from "next/server";

const OTHER = LOCALE_CODES.filter((c) => c !== "zh");

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg || !OTHER.includes(seg)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname.replace(new RegExp(`^/${seg}`), "/zh") || "/zh";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|videos|.*\\..*).*)",
  ],
};
