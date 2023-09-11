import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import { Suspense, lazy } from "react";
import Lottie from "lottie-react";
import loading from "./assests/animations/loading.json";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/Signin"));
const SignUp = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Shop = lazy(() => import("./pages/Shop"));
const SubScribe = lazy(() => import("./pages/SubScribe"));
const BuyByNumber = lazy(() => import("./pages/BuyByNumber"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Terms = lazy(() => import("./pages/Terms"));
const Search = lazy(() => import("./pages/Search"));

function App() {
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} caseSensitive />
            <Route path="/sign-up" element={<SignUp />} caseSensitive />
            <Route path="/shop" element={<Shop />} caseSensitive />
            <Route path="/subscribe" element={<SubScribe />} caseSensitive />
            <Route path="/cart" element={<Cart />} caseSensitive />
            <Route path="/checkout" element={<Checkout />} caseSensitive />
            <Route path="/my-account" element={<MyAccount />} caseSensitive />
            <Route path="/contact-us" element={<ContactUs />} caseSensitive />
            <Route path="/terms" element={<Terms />} caseSensitive />
            <Route path="/search" element={<Search />} caseSensitive />
            <Route
              path="/buy-by-number"
              element={<BuyByNumber />}
              caseSensitive
            />
            <Route path="/" element={<BuyByNumber />} caseSensitive />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
              caseSensitive
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
