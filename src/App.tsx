import "./App.css";
import { RouterProvider } from "react-router-dom";
import usePageRoutes from "./hooks/usePageRoutes";

function App() {
  const router = usePageRoutes();

  return <RouterProvider router={router} />;
}

export default App;
