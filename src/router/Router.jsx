import { Routes, Route } from "react-router-dom";
import Dash from "../pages/Dash";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import { ROUTES } from "../utility/constants";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.DASH} element={<Dash />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    
      {/*<Route path={ROUTES.MANAGE_USERS} element={<ManageUsers />} />*/}
     
      
    </Routes>       
  )
};

export default AppRoutes;
