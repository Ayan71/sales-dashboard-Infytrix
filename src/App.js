import { Routes, Route } from "react-router-dom";
import SalesComparisonDashboard from "./components/SalesComparisonDashboard";
import TodaySalesDashboard from "./components/TodaySalesDashboard"
import Navbar from "./pages";
function App() {
  return <div>
    <Navbar/>
    <Routes>
    <Route path="/" element={<TodaySalesDashboard/>}></Route>
      <Route path="/sales-comparison-dashboard" element={<SalesComparisonDashboard/>}></Route>
   
    </Routes>
 
  </div>;
}

export default App;
