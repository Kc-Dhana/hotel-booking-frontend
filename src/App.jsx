import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css"
import HomePage from "./pages/client-page/homePage";
import AdminPage from "./pages/admin-page/admin";
import TestComponent from "./components/test/test";
import LoginPage from "./pages/login/login";
import CategoriesPage from "./pages/client-page/categories";
import TestComponent2 from "./components/test/test2";
import { Toaster } from "react-hot-toast";
import { UploadComponent } from "./components/test/test3";
import RegisterPage from "./pages/registration/registration";
import OtpVerificationPage from "./pages/otp/otp";
import GalleyPage from "./pages/client-page/galleyPage";
import AboutPage from "./pages/client-page/aboutPage";
import RoomSearchPage from "./pages/client-page/roomSearchPage";
import CustomerDashboard from "./pages/client-page/customerDashboard";
function App() {
  
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false}/>
      <Routes path="/*">

        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/customer/*" element={<CustomerDashboard/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<OtpVerificationPage />} />
        <Route path="/gallery" element={<GalleyPage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/search" element={<RoomSearchPage/>} />



        <Route path="/test" element={<TestComponent />} />
        <Route path="/test2" element={<TestComponent2 />} />
        <Route path="/test3" element={<UploadComponent />} />
        <Route path="/*" element={<HomePage />} />
        
        
      </Routes>
      
    </BrowserRouter>
  )
}

export default App;
