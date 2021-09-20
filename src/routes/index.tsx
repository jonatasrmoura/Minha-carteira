import { BrowserRouter } from "react-router-dom";
import { AppRoutes as App } from "./app.routes";

const Routes: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export { Routes };
