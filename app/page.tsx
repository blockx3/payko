import HomePageActionButtons from "@/components/HomePageButtons";
import { MotionDiv } from "@/lib/UseClientUIs";
import Image from "next/image";

async function Main() {
  return (
    <div>
      <MotionDiv
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="absolute xl:top-0 bottom-0 right-0 box"
      >
        <Image
          src="https://static.aaraz.me/payko/abstract_obj.png"
          alt=""
          height={1000} // Arbitrary height
          width={1000} // Arbitrary width
          className=" xl:w-[800px] object-cover -z-10 xl:opacity-100 opacity-80 rotate-180 xl:rotate-0"
        />
      </MotionDiv>
      <div className="h-screen flex flex-col xl:justify-center pt-10 xl:pt-0">
        <div className="xl:pl-28 pl-6 xl:space-y-4">
          <div className="xl:text-8xl text-6xl flex gap-2 items-end">
            <Image
              src="https://static.aaraz.me/payko/p.png"
              alt=""
              height={1000} // Arbitrary height
              width={1000} // Arbitrary width
              className="xl:h-[7rem] xl:w-[6rem] h-16 w-16"
            />
            <div>ay-Ko</div>
          </div>
          <div className="xl:text-5xl text-2xl xl:text-slate-600 text-black flex gap-4 items-center font-bold pt-4">
            <div>Wallet</div>
            <span className="xl:text-8xl text-sky-500">X</span>
            <div>Payment Gateway</div>
          </div>
          <div className="xl:text-3xl xl:text-slate-500 text-black/80">
            Make Payment & get payments without leaving the app
          </div>
          <HomePageActionButtons />
        </div>
      </div>
      {/* <div className="h-screen bg-white">Test</div> */}
    </div>
  );
}

export default Main;
