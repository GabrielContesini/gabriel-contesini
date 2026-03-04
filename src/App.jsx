import About from "./components/About";
import Contact from "./components/Contact";
import FloatingElements from "./components/FloatingElements";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { useGithubSnapshot } from "./hooks/useGithubSnapshot";

function App() {
  const { profile, repositories, repoMap, totals, lastSync, loading, apiError } = useGithubSnapshot();

  return (
    <div className="app-shell">
      <FloatingElements />
      <Navigation />
      <main>
        <Hero profileStats={profile} totals={totals} lastSync={lastSync} />
        <About />
        <Projects repoMap={repoMap} repositories={repositories} loading={loading} apiError={apiError} />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
