import {createBrowserRouter} from "react-router-dom";
import MainPage from "./page/MainPage";
import CarDetailsPage from "./page/CarDetailsPage";
import AdminPage from "./page/AdminPage";
import AuthPage from "./page/AuthPage";
import UpdatePage from "./page/UpdatePage";

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
    path: "edit/:id",
    element: <UpdatePage/>,
  },
  {
    path: "/:id",
    element: <CarDetailsPage/>,
  },
]);

export enum Route {
  Main = '/',
  Admin = '/admin',
  Auth = '/auth',
  Edit = '/edit/'
}
