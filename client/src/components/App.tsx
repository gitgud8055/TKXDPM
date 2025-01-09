import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./auth/register";
import Login from "./auth/login";
import Logout from "./auth/logout";
import PrivateRoute from "./routing/private-route";
import Homepage from "./pages/homepage";
import FavouritePage from "./pages/favourite-page";
import GroupPage from "./pages/group-page";
import Test from "./pages/test";
import ShoppingPage from "./pages/shopping-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="test" element={<Test />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Homepage />} />
          <Route path="groups/:id?" element={<GroupPage />} />
          <Route path="favourites/:id?" element={<FavouritePage />} />
          <Route path="shoppings" element={<ShoppingPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
