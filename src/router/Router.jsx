import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import { ROUTES } from "../utility/constants";
import RoleBasedRoutes from "./RolebasedRoutes";
import ManageUsers from "../components/ManageUsers";    
import ComingSoon from "../components/ComingSoon";  

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    
      {/*<Route path={ROUTES.MANAGE_USERS} element={<ManageUsers />} />*/}
      <Route
        path={ROUTES.MANAGE_USERS}
        element={
          <ComingSoon
            title="Manage Users"
            description="This feature is coming soon!"
          />
        }
      />

      {/* access only if authenticated */}
      
    </Routes>       
  )
};

export default AppRoutes;
