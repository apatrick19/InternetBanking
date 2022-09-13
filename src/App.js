import Account from "./screens/Accounts";
import Transaction from "./screens/transactions";
import TransferMoney from "./screens/transferMoney";
import BillsPayment from "./screens/Bills-and-payment";
import AirtimeData from "./screens/Airtime-Data";
import CardBank from "./screens/card-bank";
import SelfService from "./screens/self-service";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { Routes, Route } from "react-router-dom";
import TransferMoneyIndex from "./screens/transferMoney/transferMoney";
import TransferMoneyConfirm from "./screens/transferMoney/confirm";
import TransferMoneySuccess from "./screens/transferMoney/success";
import BillsPaymentIndex from "./screens/Bills-and-payment/bills-and-payment";
import BillsPaymentPayBill from "./screens/Bills-and-payment/pay-bills";
import BillsPaymentAirtime from "./screens/Bills-and-payment/airtime";
import BillsConfirm from "./screens/Bills-and-payment/confirm/bills-confirm";
import BillsPaymentConfirm from "./screens/Bills-and-payment/confirm";
import BillsPaymentSuccess from "./screens/Bills-and-payment/success";
import ProtectedRoute from "./screens/protectedRoute";
import ForgetPassword from "./screens/forgetPassword";
import NewPassword from "./screens/forgetPassword/newPassword";
import Kyc from "./screens/kyc";
import KycIndex from "./screens/kyc/kyc";
import KycUpload from "./screens/kyc/upload";
import OtpPage from "./screens/otp/";
import Feedback from "./screens/feedback";
import { ContextProvider } from "./context/context";
import "./App.css";
import { verifyToken } from "./utli/verifyJwt";
import "rsuite/dist/rsuite.min.css";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute isLoggedOut={() => verifyToken()} />}>
            <Route path="transfer-money" element={<TransferMoney />}>
              <Route path="confirm" element={<TransferMoneyConfirm />} />
              <Route path="success" element={<TransferMoneySuccess />} />
              <Route index element={<TransferMoneyIndex />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute isLoggedOut={() => verifyToken()} />}>
            <Route path="bills-and-payment" element={<BillsPayment />}>
              <Route path="pay-bill" element={<BillsPaymentPayBill />} />
              <Route path="airtime" element={<BillsPaymentAirtime />} />
              <Route path="confirm" element={<BillsPaymentConfirm />} />
              <Route path="confirm-bills" element={<BillsConfirm />} />
              <Route path="success" element={<BillsPaymentSuccess />} />
              <Route index element={<BillsPaymentIndex />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute isLoggedOut={() => verifyToken()} />}>
            <Route path="/kyc" element={<Kyc />}>
              <Route path="upload" element={<KycUpload />} />
              <Route index element={<KycIndex />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute isLoggedOut={() => verifyToken()} />}>
            <Route path="account" element={<Account />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="airtime-data" element={<AirtimeData />} />
            <Route path="card-bank" element={<CardBank />} />
            <Route path="self-service" element={<SelfService />} />
            <Route path="otp" element={<OtpPage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/kyc" element={<Kyc />} />
          </Route>
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
