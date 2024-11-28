"use client";

import React, {useState} from "react";
import {useSession} from "next-auth/react";
import {Breadcrumbs, BreadcrumbItem} from "@logi-x/breadcrumbs";
import {Card, CardBody, CardFooter} from "@logi-x/card";
import {useRouter} from "next/navigation";
import {title} from "@/components/primitives";

const AdminPage = () => {
  const {data: session, status} = useSession();
  const [currentPage, setCurrentPage] = useState<React.Key>("/admin");
  const router = useRouter();
  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <div>
        <p>Loading...</p> {/* Replace with your Loading component */}
      </div>
    );
  }

  // Check for access once session is loaded
  if (!session || session.user?.role !== "admin") {
    return (
      <div>
        <p>Access Denied</p>
      </div>
    );
  }

  const list = [
    {
      title: "Users",
      href: "/admin/users",
    },
    {
      title: "Clients",
      href: "/admin/clients",
    },
  ];

  // Render content for admins
  return (
    <div className="space-y-6">
      <div>
        <h1 className={title()}>Admin Control Panel</h1>

        <Breadcrumbs onAction={(key) => setCurrentPage(key)}>
          <BreadcrumbItem
            key="admin"
            href={currentPage as string}
            isCurrent={currentPage === "admin"}
          >
            Admin Panel
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 py-0">
        {list.map((item, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => router.push(item.href)}>
            <CardBody>{item.title}</CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
