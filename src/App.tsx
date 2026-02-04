import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Fleet } from './sections/Fleet';
import { Experience } from './sections/Experience';
import { CoverageMap } from './sections/CoverageMap';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { BookingProvider } from './context/BookingContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BookingProvider>
        <div className="relative min-h-screen bg-black text-white selection:bg-accent/30 transition-colors duration-500">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Fleet />
            <Experience />
            <CoverageMap />
            <Contact />
          </main>
          <Footer />

          {/* Background elements */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
          </div>
        </div>
      </BookingProvider>
    </ThemeProvider>
  )
}

export default App
