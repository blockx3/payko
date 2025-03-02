"use client";

import { AppFeatures } from "@/components/Appfeatures";
import CTAsection from "@/components/CTAsection";
import HomePageActionButtons from "@/components/HomePageButtons";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/lib/UseClientUIs";
import { ExternalLink, Github, Twitter, ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

function Main() {
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="absolute xl:top-0 bottom-0 right-0 -z-10 pointer-events-none"
      >
        <Image
          src="https://static.aaraz.me/payko/abstract_obj.png"
          alt="Decorative background"
          height={500}
          width={500}
          className="object-cover opacity-80 rotate-180 xl:opacity-100 xl:rotate-0 w-full max-w-[40rem] max-md:w-[65vw] max-sm:h-[50vh] max-sm:w-auto"
          priority
        />
      </MotionDiv>

      {/* solana devnet tag */}
      <div className="absolute top-5 left-5">
        <div className="relative bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
          <div className="relative w-3 h-3 rounded-full bg-green-300">
            <div className="absolute inset-0 rounded-full bg-green-200 opacity-50 animate-pulse"></div>
            <div className="absolute -inset-0.5 bg-green-400 rounded-full opacity-30 blur-sm animate-pulse"></div>
          </div>
          <span className="relative z-10">On Solana Devnet</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="xl:pl-16 pl-6 space-y-4 md:space-y-6 max-w-4xl">
          <div className="flex gap-2 items-end pt-4">
            <Image
              alt="Pay-Ko"
              width={400}
              height={205}
              src="/logo-inline.svg"
              className="w-48 sm:w-64 md:w-80 xl:w-96"
              priority
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl xl:text-5xl flex flex-wrap gap-2 items-center font-bold pt-1 text-black xl:text-slate-600">
            <div>Wallet</div>
            <span className="text-4xl sm:text-5xl md:text-6xl xl:text-8xl text-sky-500">
              X
            </span>
            <div>Payment Gateway</div>
          </div>
          <div className="text-lg sm:text-xl xl:text-2xl text-black/80 xl:text-slate-500 max-w-3xl">
            Make Payment & get payments without leaving the app
          </div>
          <HomePageActionButtons />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                onClick={scrollToNextSection}
                className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-sky-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                <MotionDiv
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="text-white w-6 h-6 group-hover:text-white z-10 transition-colors duration-300" />
                </MotionDiv>
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 animate-pulse"></div>
              </Button>
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={nextSectionRef}>
        <AppFeatures />
      </div>
      {/* Stats Section */}
      {/* <Stats /> */}

      <CTAsection />

      {/* Footer */}
      <footer className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="md:col-span-2">
              <Image
                alt="Pay-Ko"
                width={150}
                height={80}
                src="/logo-inline.svg"
                className="mb-6"
              />
              <p className="text-gray-500 mb-6 max-w-md">
                The future of Web3 payments, simplified. Make and receive crypto
                payments without ever leaving the app.
              </p>
              <div className="flex space-x-6 text-gray-400">
                <a
                  href="https://x.com/AnishAraz"
                  target="_blank"
                  className="hover:text-indigo-600 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="github.com/blockx3/payko"
                  className="hover:text-indigo-600 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://github.com/blockx3/payko"
                  target="_blank"
                  className="hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900">
                Resources
              </h3>
              <ul className="space-y-4 text-gray-500">
                <li>
                  <a
                    href="github.com/blockx3/payko"
                    target="_blank"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/blockx3/payko"
                    target="_blank"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/blockx3/payko"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900">Company</h3>
              <ul className="space-y-4 text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/blockx3/payko"
                    target="_blank"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/blockx3/payko"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-500">
            <p>© 2025 PayKo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Main;
