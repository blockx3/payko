"use cliente";
import { MotionDiv } from "@/lib/UseClientUIs";

export const Stats = () => {
  return (
    <div>
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
    </div>
  );
};

export default Stats;
