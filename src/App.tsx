import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Auth/login/Login';
import { Register } from './pages/Auth/register/Register';
import { ResetPassword } from './pages/Auth/reset-password/Reset-Password';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<ResetPassword />} path="/reset-password" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

