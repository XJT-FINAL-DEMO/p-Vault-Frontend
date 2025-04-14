import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/user/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index={true} element={<Landing />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
