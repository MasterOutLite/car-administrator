import {createBrowserRouter} from "react-router-dom";
import MainPage from "./page/MainPage";
import CarDetailsPage from "./page/CarDetailsPage";
import AdminPage from "./page/AdminPage";
import AuthPage from "./page/AuthPage";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
  {
    path: "/admin",
    element: <AdminPage/>,
  }, {
    path: "/auth",
    element: <AuthPage/>,
  },
  {
    path: "/:id",
    element: <CarDetailsPage/>,
  },
]);
