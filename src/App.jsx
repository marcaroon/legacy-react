import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Benefit from "./components/Benefit";
import Overview from "./components/Overview";
import Theme from "./components/Theme";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import RegisterSteps from "./pages/RegisterSteps";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import Timeline from "./components/Timeline";
import AboutDetail from "./pages/AboutDetail";
import PaymentPending from "./pages/Payment/PaymentPending";
import PaymentError from "./pages/Payment/PaymentError";
import PaymentStatus from "./pages/Payment/PaymentStatus";
import WhatsAppButton from "./components/WhatsappButton";
import Speakers from "./components/Speakers";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <div className="font-inter font-sans">
              <Navbar />
              <Hero />
              <About />
              <Theme />
              <Benefit />
              <Overview />
              <Timeline />
              <Registration />
              {/* <Speakers /> */}
              <Footer />
              <WhatsAppButton />
            </div>
          }
        />

        <Route path="/register" element={<RegisterSteps />} />
        <Route
          path="/payment/success/:registrationId"
          element={<PaymentSuccess />}
        />
        <Route
          path="/payment/pending/:registrationId"
          element={<PaymentPending />}
        />
        <Route
          path="/payment/status/:registrationId"
          element={<PaymentStatus />}
        />
        <Route path="/payment/error" element={<PaymentError />} />

        <Route path="/payment/status" element={<PaymentSuccess />} />
        <Route path="/about-detail" element={<AboutDetail />} />
      </Routes>
    </Router>
  );
}
