import clientPromise from "@/lib/mongodb-client";
import {NextResponse} from "next/server";

export async function GET(_request) {
  try {
    const client = await clientPromise;
    const db = client.db("logix");

    const data = await db.collection("users").find({}).toArray();

    return NextResponse.json(data, {status: 200});
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json("Error connecting to MongoDB", {status: 500});
  }
}
