import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Auth/login/Login';
import { Register } from './pages/Auth/register/Register';
import { ResetPassword, SendEmailResetPassword, ValidateCode } from './pages/Auth/reset-password/Reset-Password';
import { ToastContainer } from 'react-toastify';
import { useMain } from './store/MainProvider';
import { PillLoading } from './components/Loading/Pill-Loading/Pill-Loading';
import {Welcome} from './pages/Home/Welcome';
import { Wallet } from './pages/Wallet/Wallet';
import { OptimizeIncome } from './pages/OptimizeIncome/OptimizeIncome';
import { NotFound } from './pages/NotFound/NotFound';
import { Marked } from './pages/Marked/Marked';

function App() {
  const {isGlobalLoading} = useMain();
  return (
    <>
      <ToastContainer className="foo" style={{ width: "auto" }} />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<SendEmailResetPassword />} path="/send-code-email" />
          <Route element={<ResetPassword />} path="/reset-password" />
          <Route element={<ValidateCode />} path="/validate-code" />
          <Route element={<Welcome />} path="/welcome" />
          <Route element={<Wallet />} path="/wallet" />
          <Route element={<OptimizeIncome />} path="/optimize-income" />
          <Route element={<Marked />} path="/marked" />
        </Routes>
      </BrowserRouter>
      {isGlobalLoading && <PillLoading/>}
    </>
  );
}

export default App;

