import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from './components/SmoothScroll';
import PageTransition from "./components/PageTransition";

const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

        <SmoothScroll>
          <MainLayout>
            <PageTransition>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </MainLayout>
        </SmoothScroll>
    </>
  );
};

export default App;