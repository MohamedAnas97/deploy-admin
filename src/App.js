import "./style/index.css";
import AllRoutes from "./routes";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <AllRoutes />
    </CookiesProvider>
  );
}

export default App;
