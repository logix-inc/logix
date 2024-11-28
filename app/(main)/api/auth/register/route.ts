import {connectToDatabase} from "@/lib/mongoose";
import {User} from "@/models/user";
import {NextResponse} from "next/server";
import {hash} from "bcryptjs";

export async function POST(req: Request) {
  await connectToDatabase();

  const {email, username, password} = await req.json();

  const existingUser = await User.findOne({
    $or: [{email}, {username}],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return NextResponse.json({error: "Email is already taken."}, {status: 400});
    }
    if (existingUser.username === username) {
      return NextResponse.json({error: "Username is already taken."}, {status: 400});
    }
  }

  const hashedPassword = await hash(password, 12);

  const newUser = new User({
    email,
    username,
    password: hashedPassword,
    role: "user",
  });

  await newUser.save();

  return NextResponse.json({success: true});
}
