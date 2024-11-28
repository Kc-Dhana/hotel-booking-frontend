import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"
import HomePage from "./pages/client-page/homePage";
import AdminPage from "./pages/admin-page/admin";
function App() {
  
  return (
    <BrowserRouter>
      <Routes path="/*">

        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />

        <Route path="*" element={
          <div className="w-full h-[100vh] bg-green-400">404 Not Found</div>
          } />  

      </Routes>
    </BrowserRouter>
  )
}

export default App;
