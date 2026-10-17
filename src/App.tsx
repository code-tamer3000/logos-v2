import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Mentoring from "./pages/Mentoring";
import Practices from "./pages/Practices";
import Contact from "./pages/Contact";
import Podcasts from "./pages/Podcasts";
import {
  AccountPage,
  BlogPage,
  FreePracticesPage,
  LegalPage,
  LibraryPage,
  NotFoundPage,
  ProductsPage,
} from "./pages/Simple";

// Отдельный чанк, не попадает в бандл публичного сайта; вне публичного меню.
const AdminApp = lazy(() => import("./admin/AdminApp").then((m) => ({ default: m.AdminApp })));

function SiteLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/practices/free" element={<FreePracticesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offer" element={<LegalPage variant="offer" />} />
          <Route path="/privacy" element={<LegalPage variant="privacy" />} />
          <Route path="/consent" element={<LegalPage variant="consent" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="/*" element={<SiteLayout />} />
      </Routes>
    </>
  );
}
