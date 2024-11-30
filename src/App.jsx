import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"
import HomePage from "./pages/client-page/homePage";
import AdminPage from "./pages/admin-page/admin";
import TestComponent from "./components/test/test";
function App() {
  
  return (
    <BrowserRouter>
      <Routes path="/*">

        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="/*" element={<HomePage />} />
        
      </Routes>
      
    </BrowserRouter>
  )
}

export default App;
