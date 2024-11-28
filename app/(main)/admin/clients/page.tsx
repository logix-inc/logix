"use client";

import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
// import {useRouter} from "next/navigation";
import {Input} from "@logi-x/input";
import {Button} from "@logi-x/button";
import {Card, CardBody, CardHeader} from "@logi-x/card";
import {Breadcrumbs, BreadcrumbItem} from "@logi-x/breadcrumbs";
import {Select, SelectItem} from "@logi-x/select";
import {Toaster, toast} from "@logi-x/toaster";
import {z} from "zod";
import {title} from "@/components/primitives";
import Link from "next/link";
import ClientsTable from "./clients-table";

type Client = {
  _id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  industry?: string;
  status?: "active" | "inactive";
  image?: string;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, "This field has to be filled.")
    .email("This is not a valid email")
    .max(300, "Email can't be longer than 300 characters."),
});

const ClientFormPage = () => {
  const {data: session, status} = useSession();
  // const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<React.Key>("/admin/clients");

  const [formData, setFormData] = useState<Client>({
    _id: "",
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    industry: "",
    status: "inactive",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{email?: string}>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/v1/clients");
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (status === "loading" || loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return (
      <div>
        <p>Access Denied</p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setFormData((prev) => ({...prev, [name]: value}));

    try {
      formSchema.shape[name as keyof typeof formData].parse(value);
      setErrors((prev) => ({...prev, [name]: undefined}));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({...prev, [name]: error.errors[0].message}));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      formSchema.parse(formData);
      setErrors({});

      const response = await fetch("/api/v1/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Client created successfully");
      } else {
        toast.error(response.statusText || "Failed to save client.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: {email?: string} = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof typeof formData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      setError(error as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className={title()}>Clients Control Center</h1>
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
          </Breadcrumbs>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Clients</h1>
          <ClientsTable clients={clients} loading={loading} setLoading={setLoading} />
        </div>
        <Card className="w-full h-full bg-bg shadow-lg rounded-2xl px-2 my-6">
          <CardHeader>
            <h1 className="text-xl font-bold mb-0">Create Client</h1>
          </CardHeader>
          <CardBody className="overflow-hidden">
            <div className="p-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  type="text"
                  labelPlacement="outside"
                  variant="bordered"
                  label="Company Name"
                  name="company_name"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  isRequired
                />
                <Input
                  type="text"
                  labelPlacement="outside"
                  variant="bordered"
                  label="Contact Name"
                  name="contact_name"
                  placeholder="Contact Name"
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  isRequired
                />
                <Input
                  type="email"
                  labelPlacement="outside"
                  variant="bordered"
                  label="Email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={errors.email ? true : false}
                  errorMessage={errors.email}
                  isRequired
                />
                <Input
                  type="text"
                  labelPlacement="outside"
                  variant="bordered"
                  label="Phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  isRequired
                />
                <Input
                  type="text"
                  labelPlacement="outside"
                  variant="bordered"
                  label="Address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />

                <Input
                  type="url"
                  labelPlacement="outside"
                  variant="bordered"
                  label="Website"
                  placeholder="domain.com"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">https://</span>
                    </div>
                  }
                />
                <Input
                  type="text"
                  labelPlacement="outside"
                  variant="bordered"
                  label="Industry"
                  name="industry"
                  placeholder="Industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                />

                <Select
                  fullWidth
                  variant="bordered"
                  labelPlacement="outside"
                  name="status"
                  label="Status"
                  selectedKeys={[formData.status as string]}
                  onChange={handleInputChange}
                >
                  <SelectItem key="active">Active</SelectItem>
                  <SelectItem key="inactive">Inactive</SelectItem>
                </Select>
                {/* Submit Button */}
                <div>
                  <Button
                    isDisabled={!formData}
                    type="submit"
                    color="primary"
                    radius="sm"
                    fullWidth
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Client"}
                  </Button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
      <Toaster richColors />
    </>
  );
};

export default ClientFormPage;
