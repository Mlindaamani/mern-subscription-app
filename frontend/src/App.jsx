import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { VideoUpload } from "./pages/VideoUpload";
import { LoginForm } from "./pages/LoginForm";
import { RegistrationForm } from "./pages/RegistrationForm";
import { HomePage } from "./pages/HomePage";
import { Subscription } from "./pages/Subscription";
import { Videos } from "./pages/Videos";
import { VideoDetails } from "./pages/VideoDetails";
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { AuthenticationRequired } from "./components/Authenticated";
import { StripeCheckout } from "./pages/StripeCheckout";
import { NotFound } from "./components/NotFound";
import { TestMaterialUI } from "./UI/Test";

export const App = () => {
  return (
    <>
      <Routes>
        {/* App Layout */}
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<AuthenticationRequired />}>
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos/:videoId" element={<VideoDetails />} />
            <Route path="/upload" element={<VideoUpload />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/checkout" element={<StripeCheckout />} />
            <Route path="/test" element={<TestMaterialUI />} />
          </Route>
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};
