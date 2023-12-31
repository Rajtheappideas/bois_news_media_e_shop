import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import { Suspense, lazy, useEffect } from "react";
import Lottie from "lottie-react";
import loading from "./assests/animations/loading.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import OTPVerify from "./components/Auth/OtpVerifty";
import PrivateRoute from "./pages/PrivateRoute";
import ResetPassword from "./components/Auth/ResetPassword";
import {
  loginAllTabsEventListener,
  logoutAllTabsEventListener,
} from "./redux/globalStates";
import SearchPopup from "./components/SearchPopup";
import {
  handleGetLastestMagazines,
  handleGetMagazines,
  handleGetSubscriptions,
} from "./redux/ShopSlice";
import ScrollToTop from "./components/ScrollToTop";
import { handleGetCart, handleGetTaxAndShipping } from "./redux/CartSlice";
import { handleGetUserAddress, handleLogout } from "./redux/AuthSlice";
import SuccessPage from "./pages/SuccessPage";
import Error from "./pages/Error";

const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Terms = lazy(() => import("./pages/Terms"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  const {
    showSignin,
    showSignup,
    showForgotPassword,
    showOtpField,
    showResetPassword,
  } = useSelector((state) => state.root.globalStates);
  const { token, user } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // for all tabe login & logout
    dispatch(loginAllTabsEventListener());
    dispatch(logoutAllTabsEventListener());

    // data fetch
    dispatch(handleGetMagazines());
    dispatch(handleGetLastestMagazines());
    dispatch(handleGetSubscriptions());
    dispatch(handleGetTaxAndShipping());

    if (user !== null && user !== undefined) {
      const response = dispatch(handleGetCart({ token }));
      if (response) {
        response.then((res) => {
          if (res?.payload?.code == 401) {
            dispatch(handleLogout());
            dispatch(logoutAllTabsEventListener());
          }
        });
      }

      dispatch(
        handleGetUserAddress({
          token,
        }),
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <Toaster toastOptions={{ duration: 3000 }} position="top-center" />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <Suspense
          fallback={
            <div className="relative top-0 left-0 w-screen h-screen">
              <Lottie
                style={{
                  pointerEvents: "none",
                  height: "300px",
                  width: "300px",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-full"
                animationData={loading}
                loop
              />
            </div>
          }
        >
          <ScrollToTop />
          <Header />
          <SearchPopup />
          {showSignin && <Signin />}
          {showSignup && <Signup />}
          {showForgotPassword && <ForgotPassword />}
          {showOtpField && <OTPVerify />}
          {showResetPassword && <ResetPassword />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} caseSensitive />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
              caseSensitive
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
              caseSensitive
            />
            {/* <Route path="/checkout/renew/:token" element={<Checkout />} caseSensitive /> */}
            <Route path="/success" element={<SuccessPage />} caseSensitive />
            <Route path="/error" element={<Error />} caseSensitive />
            <Route
              path="/my-account"
              element={
                <PrivateRoute>
                  <MyAccount />
                </PrivateRoute>
              }
              caseSensitive
            />
            <Route path="/contact-us" element={<ContactUs />} caseSensitive />
            <Route path="/terms" element={<Terms />} caseSensitive />
            <Route path="/search" element={<Search />} caseSensitive />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
