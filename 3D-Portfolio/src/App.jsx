import { BrowserRouter } from "react-router-dom";
import { Hero, Navbar, StarsCanvas, About, Experience, Works, Feedbacks, Contact } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <StarsCanvas />
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
