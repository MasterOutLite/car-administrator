import {ThemeProvider} from "@emotion/react";
import React from "react";
import {CssBaseline} from "@mui/material";
import theme from "./them";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export interface ThemeRegistryProps {
  children: React.ReactNode;
}

export function ThemeRegistry({children}: ThemeRegistryProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  )
}
