"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

export const FeatureCard = ({
  title,
  description,
  imageUrl,
  index,
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-indigo-500",
    "from-emerald-400 to-cyan-500",
    "from-amber-400 to-orange-500",
    "from-pink-500 to-rose-400",
  ];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform ${isHovered ? "scale-[1.03] shadow-xl" : "shadow-lg"} h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl`}
      ></div>

      <div className="relative bg-white m-0.5 rounded-2xl overflow-hidden h-full flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 ${isHovered ? "opacity-50" : "opacity-30"}`}
          ></div>
          <Image
            src={imageUrl || "/icons/solana.svg"}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />
          <div
            className={`absolute top-4 left-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r ${gradients[index % gradients.length]} text-white font-bold shadow-lg`}
          >
            {index + 1}
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 flex-grow">{description}</p>
        </div>

        <div
          className={`absolute -inset-1 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl blur opacity-0 transition-opacity duration-300 ${isHovered ? "opacity  rounded-2xl blur opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-30" : "opacity-0"}`}
        ></div>
      </div>
    </div>
  );
};
