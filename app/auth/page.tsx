import React from "react";

import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth-options";
import {redirect} from "next/navigation";
import Form from "./forms/Form";

export function generateMetadata() {
  return {
    title: "Auth",
  };
}

const Auth = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-0">
      <Form />
    </div>
  );
};

export default Auth;
