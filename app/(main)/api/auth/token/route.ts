import {getToken} from "next-auth/jwt";
import {sign} from "jsonwebtoken";
import {NextResponse, NextRequest} from "next/server";

const SECRET = process.env.NEXTAUTH_SECRET as string;

export async function GET(req: NextRequest) {
  const token = await getToken({req, secret: SECRET});

  if (!token) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const encodedToken = sign(token, SECRET);

  return NextResponse.json({token: encodedToken});
}
