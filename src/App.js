import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import SideNavBar from "./components/SideNavBar";

function App() {
  return (
    <div className="App">
      <SideNavBar />
      <Dashboard />
    </div>
  );
}

export default App;
