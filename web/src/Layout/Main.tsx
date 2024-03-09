import React from 'react';
import {ThemeRegistry} from "../style/ThemeRegistry";
import Header from "./Header";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


export interface MainProps {
  children: React.ReactNode;
}

function Main({children}: MainProps) {
  return (
    <ThemeRegistry>
      <Header/>
      <main>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </main>
    </ThemeRegistry>
  );
}

export default Main;
