import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Preloader from './components/ui/Preloader';
// import WhatsAppButton from './components/ui/WhatsAppButton';
import BackToTop from './components/ui/BackToTop';
import PageTransition from './components/ui/PageTransition';
import ScrollProgress from './components/ui/ScrollProgress';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ClientReview from './pages/ClientReview';
import AdminReviews from './pages/AdminReviews';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/portfolio/:slug" element={<PageTransition><ProjectDetails /></PageTransition>} />
        <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
        <Route path="/blogs/:slug" element={<PageTransition><BlogDetails /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Preloader />
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Standalone pages — no Header / Footer / Cursor */}
        <Route path="/samay-admin" element={<AdminReviews />} />
        <Route path="/client-review" element={<ClientReview />} />
        {/* All public pages */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}
