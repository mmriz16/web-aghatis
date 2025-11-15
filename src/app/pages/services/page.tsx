import Navbar from '../../components/navbar';
import Contact from '../../components/contact';
import Footer from '../../components/footer';

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <div data-background="dark" className="font-plus-jakarta bg-[#1B1B1B]">
        <section className="flex flex-row items-center justify-between mx-auto max-w-7xl px-4 md:px-0 pt-32 pb-20 bg-[#1B1B1B] text-white">
          <h1 className="text-3xl md:text-[84px] font-bold">Services{'.'}</h1>
          <p className="text-[22px] mt-4 w-[500px]">From design to development, strategy to execution, we&apos;ve got everything you need to elevate your digital presence and achieve your goals.</p>
        </section>
      </div>

      <Contact />

      <div className="bg-[#1b1b1b] text-white">
        <Footer />
      </div>
    </>
  );
}
