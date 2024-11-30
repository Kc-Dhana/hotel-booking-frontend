import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"
import HomePage from "./pages/client-page/homePage";
import AdminPage from "./pages/admin-page/admin";
import TestComponent from "./components/test/test";
import LoginPage from "./pages/login/login";
function App() {
  
  return (
    <BrowserRouter>
      <Routes path="/*">

        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="/*" element={<HomePage />} />
        
      </Routes>
      
    </BrowserRouter>
  )
}

export default App;
