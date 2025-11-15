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

      <div className="mx-auto max-w-7xl px-4 md:px-0">
        <div data-background="light" className="container py-12 md:py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
            <div className="w-full lg:w-[580px]">
              <h1 className="text-[#1b1b1b] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 lg:mb-8 text-center lg:text-left">Facts</h1>
              <p className="text-base w-[900px] md:text-lg lg:text-xl text-center lg:text-left">From startups to industry giants, explore how we&apos;ve helped businesses like yours thrive in the digital landscape.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 mt-11">
            <div className='flex flex-col items-center justify-center gap-2 w-full py-16 bg-[#f7f7f7]'>
              <h1 className='font-bold text-5xl'>100+</h1>
              <p className='font-medium text-lg'>Projects Completed</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 w-full py-16 '>
              <h1 className='font-bold text-5xl'>95%</h1>
              <p className='font-medium text-lg'>Satisfaction Rate</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 w-full py-16 bg-[#f7f7f7]'>
              <h1 className='font-bold text-5xl'>10x</h1>
              <p className='font-medium text-lg'>Results</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 w-full py-16 '>
              <h1 className='font-bold text-5xl'>5*</h1>
              <p className='font-medium text-lg'>Customer Reviews</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 w-full py-16 bg-[#f7f7f7]'>
              <h1 className='font-bold text-5xl'>100%</h1>
              <p className='font-medium text-lg'>Client Retention</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 w-full py-16 '>
              <h1 className='font-bold text-5xl'>50+</h1>
              <p className='font-medium text-lg'>Team Members</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f7f7f7]">
        <div data-background="light" className="mx-auto max-w-7xl px-4 md:px-0">
          <div className="container py-12 md:py-16 lg:py-24">
            <div className="flex flex-col w-full justify-between">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
                <div className="w-full lg:w-[580px]">
                  <h1 className="text-[#00A06A] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 lg:mb-8 text-center lg:text-left">Our <span className="text-black">Portfolios</span></h1>
                  <p className="text-base md:text-lg lg:text-xl text-center lg:text-left">A portfolio is a showcase of your work and achievements that demonstrate Our skills, expertise, and experience.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 grid-rows-3 gap-4 md:gap-8 lg:gap-10 mt-8 md:mt-10">
                <div className="grid grid-cols-2 grid-rows-1 items-center gap-10">
                  <img className="portfolio-item object-cover rounded-2xl w-full" src="/app/img/portfolio/barterin.jpg" width={600} height={400} alt="Barterin Portfolio" />
                  <div className="portfolio-item flex flex-col w-full gap-4 md:gap-6 mt-0 lg:mt-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">1. Strategy</h1>
                    <p className="text-sm md:text-base text-center lg:text-left">Navigate the digital landscape with confidence. Our strategic insights pave the path to success, blending market expertise with tailored solutions to elevate your brand.</p>
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Market Research</button>
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Digital Strategy</button>
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Communication Strategy</button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 items-center gap-10">
                  <div className="portfolio-item flex flex-col w-full gap-4 md:gap-6 mt-0 lg:mt-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">2. Design</h1>
                    <p className="text-sm md:text-base text-center lg:text-left">Where creativity meets functionality. Our designs breathe life into ideas, crafting visually stunning experiences that captivate audiences and leave a lasting impression.</p>
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">User Experience Design</button>
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">User Interface Design</button>
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Animation and Interaction Design</button>
                    </div>
                  </div>
                  <img className="portfolio-item object-cover rounded-2xl w-full" src="/app/img/portfolio/barterin.jpg" width={600} height={400} alt="Barterin Portfolio" />
                </div>
                <div className="grid grid-cols-2 grid-rows-1 items-center gap-10">
                  <img className="portfolio-item object-cover rounded-2xl w-full" src="/app/img/portfolio/barterin.jpg" width={600} height={400} alt="Barterin Portfolio" />
                  <div className="portfolio-item flex flex-col w-full gap-4 md:gap-6 mt-0 lg:mt-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left">3. Development</h1>
                    <p className="text-sm md:text-base text-center lg:text-left">Turning concepts into reality. Our expert developers bring innovation to life, crafting robust solutions that stand the test of time and propel your brand forward in the digital realm.</p>
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Web Development</button>
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">Mobile Development</button>
                      <button className="outline outline-1 outline-offset-[-1px] outline-[#00704A] rounded-[12px] text-xs md:text-sm font-semibold text-[#00704A] px-4 md:px-5 py-2 md:py-3 hover:bg-[#00704A] hover:text-white transition-colors duration-300">E-commerce Development</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Contact />

      <div className="bg-[#1b1b1b] text-white">
        <Footer />
      </div>
    </>
  );
}
