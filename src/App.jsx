import { lazy, Suspense } from 'react';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components after imports
const Hero = lazy(() => import("./components/Hero"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  return (
    <ErrorBoundary>
      <Navbar/>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading"></div>
        </div>
      }>
        <Hero/>
        <Portfolio/>
        <About/>
        <Contact/>
        <Footer/>
      </Suspense>
      <BackToTop/>
    </ErrorBoundary>
  );
}