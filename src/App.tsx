import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicePage } from "./pages/ServicePage";

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/hakkimizda", Component: AboutPage },
  { path: "/hizmet/:slug", Component: ServicePage },
  { path: "*", Component: HomePage },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
