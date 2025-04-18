import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/user/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CheckIn from "./pages/user/CheckIn";
import Appointments from "./pages/user/Appointments";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index={true} element={<Landing />} />
            <Route path="/checkin" element={<CheckIn/>}/>
            <Route path="/appointments" element={<Appointments/>}/>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
