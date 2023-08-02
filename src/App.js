import Navigator from "./components/Navigator/Navigator";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigator />
      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
