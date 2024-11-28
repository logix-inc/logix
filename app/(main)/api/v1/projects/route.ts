// app/(main)/api/v1/projects/route.ts
import {NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongoose";
import {Client} from "@/models/clients";
import {Project} from "@/models/projects";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const {clientId, projectData} = await req.json();

    // Validate input
    if (!clientId || !projectData) {
      return NextResponse.json({error: "Missing clientId or projectData"}, {status: 400});
    }

    // Check if client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json({error: "Client not found"}, {status: 404});
    }

    // Create new project
    const newProject = await Project.create({...projectData, client: clientId});

    // Optionally associate the project with the client
    client.projects.push(newProject._id);
    await client.save();

    return NextResponse.json(newProject, {status: 201});
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({error: "Failed to create project"}, {status: 500});
  }
}
