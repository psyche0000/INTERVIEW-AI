import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Features from "../pages/public/Features";
import HowItWorks from "../pages/public/HowItWorks";
import Pricing from "../pages/public/Pricing";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;