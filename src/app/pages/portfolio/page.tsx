import Navbar from '../../components/navbar';
import Contact from '../../components/contact';
import Footer from '../../components/footer';

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      <div data-background="dark" className="font-plus-jakarta bg-[#1B1B1B]">
        <section className="flex flex-row items-center justify-between mx-auto max-w-7xl px-4 md:px-0 pt-32 pb-20 bg-[#1B1B1B] text-white">
          <h1 className="text-3xl md:text-[84px] font-bold">Portfolio{'.'}</h1>
          <p className="text-[22px] mt-4 w-[500px]">Where creativity meets technology. We are a digital agency that specializes in creating custom solutions for businesses that want to grow online.</p>
        </section>
      </div>

      <Contact />

      <div className="bg-[#1b1b1b] text-white">
        <Footer />
      </div>
    </>
  );
}
