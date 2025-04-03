"use client";

import * as React from "react";
import SessionWrapper from "@/components/session-wrapper";

export function Providers({children}: {children: React.ReactNode}) {
  return <SessionWrapper>{children}</SessionWrapper>;
}
