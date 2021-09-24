import { BrowserRouter } from "react-router-dom";

// import { AppRoutes as App } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const Routes: React.FC = () => (
  <BrowserRouter>
    <AuthRoutes />
  </BrowserRouter>
);

export { Routes };
