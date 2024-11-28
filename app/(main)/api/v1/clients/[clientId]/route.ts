import {NextResponse} from "next/server";
import {Client} from "@/models/clients";
import {connectToDatabase} from "@/lib/mongoose";
import {Project} from "@/models/projects"; // Ensure this import exists

export async function GET(req: Request, context: {params: {clientId: string}}) {
  await connectToDatabase();

  const {clientId} = await context.params; // Extract clientId from params

  try {
    const client = await Client.findById(clientId).populate({path: "projects", model: Project});
    // const client = await Client.findById(clientId);
    // console.log("Client without populate:", client);
    // const populatedClient = await client.populate("projects");
    // console.log("Populated Client:", populatedClient);

    if (!client) {
      return NextResponse.json({error: "Client not found"}, {status: 404});
    }
    return NextResponse.json(client, {status: 200});
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json({error: `Failed to fetch client: ${error}`}, {status: 500});
  }
}
