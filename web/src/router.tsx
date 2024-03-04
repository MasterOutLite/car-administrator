import {createBrowserRouter} from "react-router-dom";
import MainPage from "./page/MainPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
]);
