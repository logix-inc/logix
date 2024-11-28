"use client";

import * as React from "react";
import {LogixProvider} from "@logi-x/system";
import {useRouter} from "next/navigation";
import {ThemeProvider as LogixThemesProvider} from "@logi-x/logix-themes";
import {ThemeProviderProps} from "@logi-x/logix-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({children, themeProps}: ProvidersProps) {
  const router = useRouter();

  return (
    <LogixProvider navigate={router.push}>
      <LogixThemesProvider {...themeProps}>{children}</LogixThemesProvider>
    </LogixProvider>
  );
}
