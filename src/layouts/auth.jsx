import { Routes, Route } from "react-router-dom";
import { Footer } from "@/widgets/layout";
import {SignIn} from "@/pages/auth/index.js";

export function Auth() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4">
      </div>
      <Routes>
          <Route exact path={'/sign-in'} element={<SignIn />} />
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
