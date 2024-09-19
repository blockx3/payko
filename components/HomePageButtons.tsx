"use client";
import Link from "next/link";

function HomePageActionButtons() {
  return (
    <div className="space-x-8 mt-4">
      <Link
        href={"/user/wallet/send"}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-sky-500 text-white hover:bg-sky-600 mt-2 popout-button-black"
      >
        Get Started
      </Link>
      <Link
        href={"/user/wallet/send"}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-slate-200 text-black hover:bg-slate-300 mt-2 popout-button-yellow"
      >
        Dashboard
      </Link>
    </div>
  );
}

export default HomePageActionButtons;
