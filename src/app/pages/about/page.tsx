import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Trusted from '../../components/trusted';
import Contact from '../../components/contact';

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
        <div data-background="light" className="container py-12 md:py-16 lg:py-24">
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

      <div className="bg-[#f7f7f7]">
        <div data-background="light" className="mx-auto max-w-7xl px-4 md:px-0">
          <div className="container py-12 md:py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
              <div className="w-full lg:w-[580px]">
                <h1 className="text-[#00A06A] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 lg:mb-8 text-center lg:text-left">Our <span className="text-black">Team</span></h1>
                <p className="text-base w-[900px] md:text-lg lg:text-xl text-center lg:text-left">We have been dedicated to pushing the boundaries of design and development, bringing ideas to life with passion and precision.</p>
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-col lg:flex-col items-center justify-center gap-6 mt-8 md:mt-10">
                <img className="portfolio-item object-cover rounded-2xl" src="/app/img/founder/miftakhul-rizky.jpg" width={230} height={290} alt="Barterin Portfolio" />
                <div className="portfolio-item flex flex-col text-center gap-4 md:gap-2 mt-0 lg:mt-6 w-full">
                  <p className="text-base md:text-[22px] font-bold text-center lg:text-center leading-7">Dicky Arya Pratama</p>
                  <p className="text-base md:text-base font-medium text-center lg:text-center leading-7">Chief Executive Officer</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-col items-center justify-center gap-6 mt-8 md:mt-10">
                <img className="portfolio-item object-cover rounded-2xl" src="/app/img/founder/miftakhul-rizky.jpg" width={230} height={290} alt="Barterin Portfolio" />
                <div className="portfolio-item flex flex-col gap-4 md:gap-2 mt-0 lg:mt-6 w-full">
                  <p className="text-base md:text-[22px] font-bold text-center lg:text-center leading-7">Qolby Fahrul Rizky</p>
                  <p className="text-base md:text-base font-medium text-center lg:text-center leading-7">Chief Operating Officer</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-col items-center justify-center gap-6 mt-8 md:mt-10">
                <img className="portfolio-item object-cover rounded-2xl" src="/app/img/founder/miftakhul-rizky.jpg" width={230} height={290} alt="Barterin Portfolio" />
                <div className="portfolio-item flex flex-col gap-4 md:gap-2 mt-0 lg:mt-6 w-full">
                  <p className="text-base md:text-[22px] font-bold text-center lg:text-center leading-7">Miftakhul Rizky</p>
                  <p className="text-base md:text-base font-medium text-center lg:text-center leading-7">Chief Design Officer</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-col items-center justify-center gap-6 mt-8 md:mt-10">
                <img className="portfolio-item object-cover rounded-2xl" src="/app/img/founder/miftakhul-rizky.jpg" width={230} height={290} alt="Barterin Portfolio" />
                <div className="portfolio-item flex flex-col text-center gap-4 md:gap-2 mt-0 lg:mt-6 w-full">
                  <p className="text-base md:text-[22px] font-bold text-center lg:text-center leading-7">Ibnu Rizqia Ramadan</p>
                  <p className="text-base md:text-base font-medium text-center lg:text-center leading-7">Chief Technology Officer</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-col items-center justify-center gap-6 mt-8 md:mt-10">
                <img className="portfolio-item object-cover rounded-2xl" src="/app/img/founder/miftakhul-rizky.jpg" width={230} height={290} alt="Barterin Portfolio" />
                <div className="portfolio-item flex flex-col gap-4 md:gap-2 mt-0 lg:mt-6 w-full">
                  <p className="text-base md:text-[22px] font-bold text-center lg:text-center leading-7">Gita Purnamasari</p>
                  <p className="text-base md:text-base font-medium text-center lg:text-center leading-7">Chief Quality Officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1b1b1b]">
        <div data-background="dark" className="mx-auto max-w-7xl px-4 md:px-0">
          <div className="container py-12 md:py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-0">
              <div className="w-full lg:w-[580px]">
                <h1 className="text-[#00A06A] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] mb-4 lg:mb-8 text-center lg:text-left">Our <span className="text-white">Approach</span></h1>
                <p className="text-base text-white/80 w-[900px] md:text-lg lg:text-xl text-center lg:text-left">Our approach to design and development is rooted in collaboration, innovation, and excellence. We believe in partnering closely with our clients to understand their unique needs, goals, and challenges, ensuring that every solution we deliver is tailored to their specific requirements.</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mt-8 md:mt-10">
              <div className="flex flex-col lg:flex-col justify-between gap-6 mt-8 md:mt-10">
                <img className="portfolio-item object-cover rounded-2xl w-[620px]" src="/app/img/services/code.jpg" width={600} height={400} alt="Barterin Portfolio" />
                <p className="text-base md:text-[28px] font-bold text-center lg:text-left leading-7 text-white">Collaborative partnership</p>
                <p className="text-base md:text-[18px] w-[620px] text-center lg:text-left leading-7 text-white/80">We work closely with clients through every stage, ensuring clear communication and shared understanding. This partnership-first approach helps us create solutions that align with their goals and deliver real impact.</p>
              </div>
              <div className="flex flex-col lg:flex-col justify-between gap-6 mt-8 md:mt-10">
                <img className="portfolio-item object-cover rounded-2xl w-[620px]" src="/app/img/services/code.jpg" width={600} height={400} alt="Barterin Portfolio" />
                <p className="text-base md:text-[28px] font-bold text-center lg:text-left leading-7 text-white">Innovation at the core</p>
                <p className="text-base md:text-[18px] w-[620px] text-center lg:text-left leading-7 text-white/80">Innovation guides our work as we explore new tools, technologies, and ideas. By staying ahead of trends and breakthroughs, we craft modern, effective solutions that keep clients future-ready.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-0">
        <Trusted />
      </div>
      <Contact />

      <div className="bg-[#1b1b1b] text-white">
        <Footer />
      </div>
    </>
  );
}
