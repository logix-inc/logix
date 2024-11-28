"use client";

import React, {FC, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Breadcrumbs, BreadcrumbItem} from "@logi-x/breadcrumbs";
import {Client} from "@/models/clients";
import {Input, Textarea} from "@logi-x/input";
import {Button} from "@logi-x/button";
import {Card, CardBody, CardFooter, CardHeader} from "@logi-x/card";
import {title} from "@/components/primitives";
import {EditIcon, GlobeIcon, VerifiedIcon} from "@logi-x/shared-icons";
import {Link} from "@logi-x/link";
import {Avatar} from "@logi-x/avatar";
import {Tabs, Tab} from "@logi-x/tabs";
import {Trash2Icon} from "lucide-react";

type Project = {
  map(arg0: (project: any) => React.JSX.Element): React.ReactNode;
  budget: number;
  client: string;
  createdAt: string;
  description: "Redesign the client's e-commerce website";
  documents: string[];
  end_date: string;
  name: string;
  start_date: string;
  status: "active" | "inactive";
  team_members: string[];
  updatedAt: string;
};

type Client = {
  projects: Project;
  _id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  industry?: string;
  status: string;
  image?: string;
};

export interface ClientCardProps {
  client: Client;
}

const ClientDetailsPage = () => {
  const {clientId} = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<React.Key>(`/admin/clients/${clientId}`);
  const [projectData, setProjectData] = useState({
    name: "Website Redesign",
    description: "Redesign the client's e-commerce website",
    start_date: new Date(),
    end_date: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    status: "active",
    budget: 10000,
    team_members: [],
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`/api/v1/clients/${clientId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }
        const data = await response.json();
        setClient(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  if (loading) {
    return <p>Loading client details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!client) {
    return <p>Client not found.</p>;
  }

  console.log(client);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/projects", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({clientId, projectData}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        alert(errorData.error);
        return;
      }

      const newProject = await response.json();
      console.log("Project created successfully:", newProject);
      alert("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("An error occurred while creating the project.");
    }
  };

  const ClientCard: FC<ClientCardProps> = (props) => {
    return (
      <Card className=" w-full">
        <CardHeader className="flex  items-center gap-6">
          <div className="mb-0">
            <Avatar
              size="lg"
              src={
                client.image ||
                `https://eu.ui-avatars.com/api/?name=${client.company_name}&size=250`
              }
              name={`${client.company_name}`}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-0">{client.company_name}</h1>
            <p>{props.client.industry || "N/A"}</p>
          </div>
        </CardHeader>
        <CardBody>
          <p>
            <strong>Contact Name:</strong> {props.client.contact_name}
          </p>
          <p>
            <strong>Email:</strong> {props.client.email}
          </p>
          <p>
            <strong>Phone:</strong> {props.client.phone}
          </p>
          <p>
            <strong>Address:</strong> {props.client.address || "N/A"}
          </p>
        </CardBody>
        <CardFooter className="text-small justify-between gap-4 items-center">
          <div>
            <p>
              <strong>Status:</strong>{" "}
              {props.client.status === "active" ? (
                <span className="text-green-600 font-bold">Active</span>
              ) : (
                <span className="text-red-600 font-bold">Inactive</span>
              )}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Link href={`/admin/clients/${props.client._id}/edit`}>
              <EditIcon color="gray" size={18} />
            </Link>
            <Link href={props.client.website}>
              <GlobeIcon color="gray" size={18} />
            </Link>
            <VerifiedIcon color="green" size={18} />
            <Link href={`/admin/clients/${props.client._id}/projects`}>projects</Link>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={title()}>Clients Details</h1>
        <Breadcrumbs onAction={(key) => setCurrentPage(key)}>
          <BreadcrumbItem key="admin" href="/admin" isCurrent={currentPage === "/admin"}>
            Admin Panel
          </BreadcrumbItem>
          <BreadcrumbItem
            key="clients"
            href="/admin/clients"
            isCurrent={currentPage === "/admin/clients"}
          >
            Clients
          </BreadcrumbItem>
          <BreadcrumbItem
            key={client.company_name}
            href={`/admin/clients/${clientId}`}
            isCurrent={currentPage === `/admin/clients/${clientId}`}
          >
            {client.company_name}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div>
        <ClientCard client={client} />
      </div>

      <div>
        <Tabs>
          <Tab key="projects" title="Projects">
            <Tabs>
              <Tab key="list" title="List">
                <Card className="w-full h-full bg-bg shadow-lg rounded-2xl px-2 my-6">
                  <CardHeader>
                    <h1 className="text-xl font-bold mb-0">Client Projects</h1>
                  </CardHeader>
                  <CardBody className="overflow-hidden">
                    <div className="py-0">
                      {client.projects.map((project) => (
                        <div key={project._id} className="flex gap-4 items-center justify-between">
                          <h2 className="text-lg font-bold">{project.name}</h2>
                          <div className="flex gap-2 items-center">
                            <Link href={`/admin/clients/${clientId}/projects/${project._id}/edit`}>
                              <EditIcon color="gray" size={18} />
                            </Link>
                            <Link href={`/admin/clients/${clientId}/projects/${project._id}/edit`}>
                              <Trash2Icon color="red" size={18} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="create" title="Create">
                <Card className="w-full h-full bg-bg shadow-lg rounded-2xl px-2 my-6">
                  <CardHeader>
                    <h1 className="text-xl font-bold mb-0">Create a New Project</h1>
                  </CardHeader>
                  <CardBody className="overflow-hidden">
                    <div className="py-0">
                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                          <Input
                            type="text"
                            labelPlacement="outside"
                            variant="bordered"
                            name="clientId"
                            label="Client Id"
                            placeholder="Client Id"
                            value={`${clientId}`}
                            isRequired
                            isReadOnly
                          />
                        </div>
                        <div>
                          <Input
                            type="text"
                            labelPlacement="outside"
                            variant="bordered"
                            name="name"
                            label="Name"
                            placeholder="Project Name"
                            value={projectData.name}
                            onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                            isRequired
                          />
                        </div>
                        <div>
                          <Textarea
                            labelPlacement="outside"
                            variant="bordered"
                            name="description"
                            label="Description"
                            placeholder="Description"
                            value={projectData.description}
                            onChange={(e) =>
                              setProjectData({...projectData, description: e.target.value})
                            }
                            isRequired
                          />
                        </div>
                        <div>
                          <Input
                            type="number"
                            labelPlacement="outside"
                            variant="bordered"
                            name="budget"
                            label="Budget"
                            placeholder="Budget"
                            value={`${projectData.budget}`}
                            onChange={(e) =>
                              setProjectData({...projectData, budget: +e.target.value})
                            }
                          />
                        </div>
                        <Button color="primary" variant="solid" type="submit">
                          Create Project
                        </Button>
                      </form>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="edit" title="Edit"></Tab>
            </Tabs>
          </Tab>
          <Tab key="cycles">Cycles</Tab>
          <Tab key="invoices">Invoices</Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
