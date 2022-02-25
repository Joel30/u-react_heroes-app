import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return(
    <BrowserRouter>
      <Routes>
      
        {/* <Route path="/login" element={<LoginScreen />} /> */}
        {/* <Route path="/*" element={<DashboardRoutes />} /> todas las rutas despues del '/'  */}

        {/* Rutas privadas y públicas */}
        <Route path="/login" element={<PublicRoute>
          <LoginScreen/>
        </PublicRoute>} />
        <Route path="/*" element={<PrivateRoute>
          <DashboardRoutes />
        </PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  );
}