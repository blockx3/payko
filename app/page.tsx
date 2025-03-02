"use client";
import { AppFeatures } from "@/components/Appfeatures";
import HomePageActionButtons from "@/components/HomePageButtons";
import { MotionDiv } from "@/lib/UseClientUIs";
import { ExternalLink, Github, Twitter } from "lucide-react";
import Image from "next/image";

function Main() {
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
          <div className="pt-4">
            <HomePageActionButtons />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <AppFeatures />
      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-sky-50 opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-200/30 to-sky-200/30 rounded-full blur-3xl"></div>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center mb-16"
        >
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            GROWING FAST
          </h2>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Trusted by users worldwide
          </p>
          <p className="max-w-xl mt-4 mx-auto text-lg md:text-xl text-gray-600">
            Join thousands of users who are already enjoying the simplicity of
            PayKo
          </p>
        </MotionDiv>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-indigo-100/20 text-center"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-indigo-100/20 text-center"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500 mb-2">
                $200+
              </div>
              <div className="text-gray-600 font-medium">Transactions</div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-indigo-100/20 text-center"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-500 mb-2">
                99.9%
              </div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-indigo-100/20 text-center"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500 mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Support</div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 shadow-2xl shadow-indigo-200 overflow-hidden"
        >
          <div className="relative px-6 py-16 md:p-16 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to get started?
                </h2>
                <p className="text-indigo-100 text-lg max-w-xl">
                  Join thousands of users who are already enjoying the
                  simplicity and security of PayKo for their crypto
                  transactions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:shadow-lg transition-all duration-300 text-center"
                >
                  Create Account
                </a>
                <a
                  href="#"
                  className="px-8 py-4 bg-indigo-700/30 text-white font-bold rounded-full hover:bg-indigo-700/50 transition-all duration-300 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </MotionDiv>
      </section>

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
