"use client";

import { MotionDiv } from "@/lib/UseClientUIs";

export const CTAsection = () => {
  return (
    <>
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
    </>
  );
};

export default CTAsection;
