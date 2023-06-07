import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Auth/login/Login';
import { Register } from './pages/Auth/register/Register';
import { ResetPassword, SendEmailResetPassword } from './pages/Auth/reset-password/Reset-Password';
import { ToastContainer } from 'react-toastify';
import { useMain } from './store/MainProvider';
import { PillLoading } from './components/Loading/Pill-Loading/Pill-Loading';
import {Welcome} from './pages/Home/welcome/Welcome';

function App() {
  const {isGlobalLoading} = useMain();
  return (
    <>
      <ToastContainer className="foo" style={{ width: "auto" }} />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<SendEmailResetPassword />} path="/send-code-email" />
          <Route element={<ResetPassword />} path="/reset-password" />
          <Route element={<Welcome />} path="/welcome" />
        </Routes>
      </BrowserRouter>
      {isGlobalLoading && <PillLoading/>}
    </>
  );
}

export default App;

