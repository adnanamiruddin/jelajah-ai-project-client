import Image from "next/image";

export default function HomeHero() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        priority
        src="/home-hero_image.jpeg"
        alt="Home Hero Image"
        width={1920}
        height={1080}
        className="brightness-75 w-full min-h-screen object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#071015] from-10% z-10"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-11/12 md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold">
          The Web for Content Creators
        </h1>
        <p className="mt-4 md:text-lg">
          Temukan berbagai AI yang bisa membantu membuat karya lebih cepat,
          lebih efektif, dan lebih menarik. Yuk, mulai eksplorasi AI untuk
          menciptakan konten yang lebih menarik dan unik!
        </p>
      </div>
    </div>
  );
}
