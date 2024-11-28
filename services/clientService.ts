import {connectToDatabase} from "@/lib/mongoose";
import {Client} from "@/models/clients";
import {Project} from "@/models/projects";
import mongoose from "mongoose";

export async function createProjectForClient(clientId: string, projectData: Record<string, any>) {
  //   await connectToDatabase();

  //   console.log("Client ID:", clientId);
  //   console.log("Client model:", Client);

  const client = await Client.findById("6743e2b1bfee4fc8c3f1c2cf");
  console.log("Client found:", client);

  if (!client) {
    throw new Error("Client not found");
  }

  //   const newProject = await Project.create({...projectData, client: clientId});

  //   client.projects = client.projects || [];
  //   client.projects.push(newProject._id);
  //   await client.save();

  //   client.projects.push(newProject._id);
  //   await client.save();

  //   return newProject;
}

export async function getProjectsByClient(clientId: string) {
  await connectToDatabase();

  const projects = await Project.find({client: clientId})
    .populate("client", "company_name email")
    .exec();

  console.log(projects);

  return projects;
}
