import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import MyFavorites from "./components/pages/MyFavorites";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="myFavorites" element={<MyFavorites />} />
    </Routes>
  );
};

export default App;
