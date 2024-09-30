import Image from "next/image";
import Link from "next/link";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RxArrowTopRight } from "react-icons/rx";

export default function ToolCard({
  name,
  image,
  description,
  link,
  video,
  isExpanded,
  onClick,
  handleDetailClick,
}) {
  return (
    <a
      id={name}
      onClick={onClick}
      href={`#${name}`}
      className={`w-[40%] ${isExpanded ? "w-[80vw] md:w-[50%]" : "md:w-[23%]"}`}
    >
      <div
        className={`bg-gradient-to-tl from-[#19161C] to-black from-15% flex flex-col justify-center border-[1px] rounded-2xl shadow-md p-6 duration-700 relative md:p-10 ${
          isExpanded ? "transform scale-105 my-4 md:scale-95" : "h-52 md:h-80"
        }`}
      >
        <button onClick={handleDetailClick} className="absolute top-2 right-2">
          <IoInformationCircleOutline className="text-3xl" />
        </button>

        {isExpanded ? (
          <iframe
            width="100%"
            height="100%"
            src={`${video}&autoplay=1&mute=1`}
            title={name}
            className="rounded-xl relative z-30 mb-4 md:h-96"
          ></iframe>
        ) : null}

        <div
          className={`flex ${
            isExpanded ? "items-end gap-2 md:mt-4 md:gap-3" : "flex-col gap-3"
          }`}
        >
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className={`rounded-full object-cover ${
              isExpanded
                ? "w-10 h-10 md:w-16 md:h-16"
                : "w-14 h-14 border-2 md:w-24 md:h-24"
            }`}
          />
          <h2
            className={`font-medium text-start tracking-wider text-xs md:text-xl ${
              isExpanded ? "pb-2" : ""
            }`}
          >
            {name}
          </h2>
        </div>

        <div className="flex flex-col w-full h-full gap-1">
          {/* Mobile View */}
          <p
            className={`md:hidden text-gray-400 ${
              isExpanded
                ? "text-sm text-justify mt-3"
                : "text-xs text-left mt-1"
            }`}
          >
            {isExpanded ? description : description.slice(0, 20) + "..."}
          </p>
          {/* Desktop View */}
          <p
            className={`hidden md:inline-block text-gray-400 text-sm ${
              isExpanded ? "text-justify my-6" : "text-base text-left mt-4 h-16"
            }`}
          >
            {isExpanded ? description : description.slice(0, 50) + "..."}
          </p>
          <Link
            href={`${link}`}
            target="_blank"
            rel="noopener"
            className={`rounded-lg bg-gradient-to-br from-green-800 to-green-400 self-center mt-4 z-30 text-white font-medium flex justify-center items-center gap-0.5 py-1 text-xs md:text-lg md:py-3 md:font-semibold md:mt-2 hover:brightness-110 focus:brightness-75 ${
              isExpanded ? "w-full md:w-3/6" : "w-[120%] md:w-full"
            }`}
          >
            Coba Sekarang
            <RxArrowTopRight className="mt-1 text-base md:mt-1.5 md:text-xl" />
          </Link>
        </div>
      </div>
    </a>
  );
}
