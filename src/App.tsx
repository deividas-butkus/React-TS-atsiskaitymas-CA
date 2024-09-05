import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import MyFavorites from "./components/pages/MyFavorites";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route index element={<Home />} />
      <Route path="myFavorites" element={<MyFavorites />} />
    </Routes>
  );
};

export default App;
