import { BrowserRouter } from "react-router-dom";

import { useAuth } from '../hooks/auth';

import { AppRoutes as App } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const Routes: React.FC = () => {
  const { logged } = useAuth();

  return (
    <BrowserRouter>
    {
      logged
      ? 
      <App /> 
      :
      <AuthRoutes />
    }
      <AuthRoutes />
    </BrowserRouter>
  );
};

export { Routes };
