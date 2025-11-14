import Navbar from '../../components/navbar';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="font-plus-jakarta bg-[#1B1B1B]">
        <section data-background="dark" className="flex flex-row items-center justify-between mx-auto max-w-7xl px-4 md:px-0 pt-32 pb-20 bg-[#1B1B1B] text-white">
          <h1 className="text-3xl md:text-[84px] font-bold">About Us{'.'}</h1>
          <p className="text-[22px] mt-4 w-[500px]">Where creativity meets technology. We are a digital agency that specializes in creating custom solutions for businesses that want to grow online.</p>
        </section>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-0">
        <div className="container py-12 md:py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
            <div className="w-full lg:w-[580px]">
              <h1 className="text-[#00A06A] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 lg:mb-8 text-center lg:text-left">Our <span className="text-black">Story</span></h1>
              <p className="text-base w-[900px] md:text-lg lg:text-xl text-center lg:text-left">We have been dedicated to pushing the boundaries of design and development, bringing ideas to life with passion and precision.</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-8 md:mt-10">
            <img className="portfolio-item object-cover rounded-2xl w-[620px]" src="/app/img/services/code.jpg" width={600} height={400} alt="Barterin Portfolio" />
            <div className="portfolio-item flex flex-col gap-4 md:gap-6 mt-0 lg:mt-6 w-[550px]">
              <p className="text-base md:text-base text-center lg:text-left leading-7">We are a team of passionate designers and developers who are dedicated to creating the best websites and mobile applications.</p>
              <p className="text-base md:text-base text-center lg:text-left leading-7">Our journey started in 2010 when we were just a baseall team of designers and developers. We have grown over the years and now have a team of over 100 people working on various projects.</p>
              <p className="text-base md:text-base text-center lg:text-left leading-7">We have worked with some of the biggest brands in the world and have created some of the most innovative and creative websites and mobile applications.</p>
              <p className="text-base md:text-base text-center lg:text-left leading-7">We are always looking for new challenges and opportunities to push the boundaries of design and development.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
