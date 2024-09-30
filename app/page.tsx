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
        className="absolute xl:top-0 bottom-0 right-0 box -z-50"
      >
        <Image
          src="https://static.aaraz.me/payko/abstract_obj.png"
          alt=""
          height={500} // Arbitrary height
          width={500} // Arbitrary width
          layout=""
          className="object-cover opacity-80 rotate-180 xl:w-[40rem] xl:opacity-100 xl:rotate-0 max-md:w-[65vw] max-sm:h-[50vh] max-sm:w-auto"
        />
      </MotionDiv>
      <div className="h-screen flex flex-col xl:justify-center max-md:pt-10">
        <div className="xl:pl-16 pl-6 xl:space-y-4">
          <div className="xl:text-8xl text-6xl flex gap-2 items-end pt-4">
            <Image
              alt="Pay-Ko"
              width="400"
              height="205"
              src="/logo-inline.svg"
              className="max-md:w-48"
            />
          </div>
          <div className="xl:text-5xl text-2xl xl:text-slate-600 text-black flex gap-2 items-center font-bold pt-1">
            <div>Wallet</div>
            <span className="xl:text-8xl text-sky-500">X</span>
            <div>Payment Gateway</div>
          </div>
          <div className="xl:text-2xl xl:text-slate-500 text-black/80">
            Make Payment & get payments without leaving the app
          </div>
          <HomePageActionButtons />
        </div>
      </div>
    </div>
  );
}

export default Main;
