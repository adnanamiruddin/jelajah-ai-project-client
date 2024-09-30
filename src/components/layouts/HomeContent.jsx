import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function HomeContent({
  index,
  headTitle,
  title,
  content,
  readMoreHref,
  readMoreHrefNewTab,
  imageSrc,
  reverse,
}) {
  return (
    <div
      className={`flex flex-col md:gap-24 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div>
        <div className="flex items-center gap-3 relative">
          <p className="text-9xl opacity-15 font-serif">{index}</p>
          <span className="mt-8 bg-[#66BB6A] h-0.5 w-16 absolute left-12"></span>
          <p className="mt-8 text-lg text-[#66BB6A] font-semibold font-serif">
            {headTitle}
          </p>
        </div>
        {/*  */}
        <h2 className="mt-2 text-3xl font-semibold font-serif">{title}</h2>
        {/*  */}
        <p className="mt-4">{content}</p>
        {/*  */}
        {readMoreHref ? (
          <Link
            href={readMoreHref}
            target={readMoreHrefNewTab ? "_blank" : "_self"}
            className="mt-6 text-[#66BB6A] flex items-center gap-2 font-semibold"
          >
            read more <GoArrowRight className="text-2xl" />
          </Link>
        ) : null}
      </div>

      <Image
        src={imageSrc}
        alt={title}
        width={200}
        height={200}
        className="hidden md:inline mt-10 w-full mx-auto border-2 border-[#2E7D32]"
      />
    </div>
  );
}
