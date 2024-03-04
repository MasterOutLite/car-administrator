import React from 'react';
import {ThemeRegistry} from "../style/ThemeRegistry";
import Header from "./Header";


export interface MainProps {
  children: React.ReactNode;
}

function Main({children}: MainProps) {
  return (
    <ThemeRegistry>
      <Header/>
      <main>
        {children}
      </main>
    </ThemeRegistry>
  );
}

export default Main;
