import {NextResponse} from "next/server";
import {Client} from "@/models/clients";
import {connectToDatabase} from "@/lib/mongoose";

export async function GET() {
  await connectToDatabase();

  try {
    const clients = await Client.find({});
    return NextResponse.json(clients, {status: 200});
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({error: "Failed to fetch clients"}, {status: 500});
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const {company_name, contact_name, email, phone, address, website, industry, status, image} =
      body;

    if (!company_name || !contact_name || !email || !phone) {
      return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    const newClient = await Client.create({
      company_name,
      contact_name,
      email,
      phone,
      address,
      website,
      industry,
      status,
      image,
    });

    return NextResponse.json(newClient, {status: 201});
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({error: "Failed to create client"}, {status: 500});
  }
}

export function OPTIONS() {
  return NextResponse.json({error: "Method not allowed"}, {status: 405});
}
