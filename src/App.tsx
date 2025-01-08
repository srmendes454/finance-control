import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Auth/register/Register";
import {
  ResetPassword,
  SendEmailResetPassword,
  ValidateCode,
} from "./pages/Auth/reset-password/Reset-Password";
import { ToastContainer } from "react-toastify";
import { useMain } from "./store/MainProvider";
import { PillLoading } from "./components/Loading/Pill-Loading/Pill-Loading";
import { Welcome } from "./pages/Home/Welcome";
import { Wallet } from "./pages/Wallet/Wallet";
import { OptimizeIncome } from "./pages/OptimizeIncome/OptimizeIncome";
import { NotFound } from "./pages/NotFound/NotFound";
import { Marked } from "./pages/Marked/Marked";
import { OptionsWallet } from "./pages/Wallet/OptionsWallet/OptionsWallet";
import { ReactNode } from "react";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Auth/login/Login";
import { ExternalLayout } from "./components/ExternalLayout/ExternalLayout";
import { MyWallets } from "./pages/MyWallets/MyWallets";
import { LayoutMyWallets } from "./components/LayoutMyWallets/LayoutMyWallets";
import { Cards } from "./pages/Cards/Cards";
import { BankSlip } from "./pages/BankSlip/BankSlip";
import { Transactions } from "./pages/Transactions/Transactions";

function App() {
  const { isGlobalLoading } = useMain();

  return (
    <>
      <ToastContainer className="foo" style={{ width: "auto" }} />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />

          {createRouteExternalLayout("/login", <Login />)}
          {createRouteExternalLayout("/register", <Register />)}
          {createRouteExternalLayout(
            "/send-code-email",
            <SendEmailResetPassword />
          )}
          {createRouteExternalLayout("/reset-password", <ResetPassword />)}
          {createRouteExternalLayout("/validate-code", <ValidateCode />)}

          {createRouteLayoutMyWallets("/my-wallets", <MyWallets />)}
          
          {createRouteInternalLayout("/welcome", <Welcome />)}
          {createRouteInternalLayout("/wallet", <Wallet />)}
          {createRouteInternalLayout("/cards", <Cards />)}
          {createRouteInternalLayout("/bank-slip", <BankSlip />)}
          {createRouteInternalLayout("/:dad/transactions", <Transactions />)}
          {createRouteInternalLayout(
            "limits",
            <OptimizeIncome />
          )}
          {createRouteInternalLayout("/marked", <Marked />)}
          {createRouteInternalLayout("/wallet/options", <OptionsWallet />)}
        </Routes>
      </BrowserRouter>
      {isGlobalLoading && <PillLoading />}
    </>
  );

  function createRouteInternalLayout(path: string, element: ReactNode) {
    return (
      <Route key={path} path={path} element={<Layout>{element}</Layout>} />
    );
  }

  function createRouteExternalLayout(path: string, element: ReactNode) {
    return (
      <Route key={path} path={path} element={<ExternalLayout>{element}</ExternalLayout>} />
    );
  }

  function createRouteLayoutMyWallets(path: string, element: ReactNode) {
    return (
      <Route key={path} path={path} element={<LayoutMyWallets>{element}</LayoutMyWallets>} />
    );
  }
}

export default App;
