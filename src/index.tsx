import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { UsersProvider } from "./contexts/UsersContext";
import { ArticlesProvider } from "./contexts/ArticlesContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <BrowserRouter>
    <UsersProvider>
      <ArticlesProvider>
        <App />
      </ArticlesProvider>
    </UsersProvider>
  </BrowserRouter>
);
