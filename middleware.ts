import {NextRequest, NextResponse} from "next/server";
import {decode} from "next-auth/jwt";
import {jwtVerify} from "jose";

const SECRET = process.env.NEXTAUTH_SECRET as string;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/auth", "/_next", "/static", "/favicon.ico", "/api/auth"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  const isApiRequest = pathname.startsWith("/api/");
  const isAdminPath = pathname.startsWith("/admin");
  const isDashboardPath = pathname.startsWith("/dashboard");

  const authHeader = req.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      await jwtVerify(token, new TextEncoder().encode(SECRET));
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      return NextResponse.json({error: "Invalid token"}, {status: 401});
    }
  }

  const sessionToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (sessionToken) {
    try {
      const decodedSession = await decode({token: sessionToken, secret: SECRET});

      if (isAdminPath && (!decodedSession || decodedSession.role !== "admin")) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
      }
      if (isDashboardPath && (!decodedSession || decodedSession.role !== "user")) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
      }

      if (decodedSession) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Session token verification failed:", error);
    }
  }

  if (isApiRequest) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  return NextResponse.redirect(new URL("/auth", req.url));
}

export const config = {
  matcher: [
    "/((?!auth|_next|static|favicon.ico|api/auth|$).*)",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
