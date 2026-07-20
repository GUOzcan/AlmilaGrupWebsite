import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicePage } from "./pages/ServicePage";
import { Cursor } from "./components/Cursor";
import { Noise } from "./components/Noise";
import { initSmoothScroll } from "./lib/animate";

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/hakkimizda", Component: AboutPage },
  { path: "/hizmet/:slug", Component: ServicePage },
  { path: "*", Component: HomePage },
]);

export default function App() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <>
      <Noise />
      <Cursor />
      <RouterProvider router={router} />
    </>
  );
}
