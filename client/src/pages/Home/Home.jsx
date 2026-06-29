import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import Doctors from "../../components/Doctors/Doctors";
import Gallery from "../../components/Gallery/Gallery";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <Services />

      <Doctors />

      <Gallery />

      <Contact />

      <Footer />

      <WhatsAppButton />
    </>
  );
}

export default Home;