import HomeContent from "@/components/layouts/HomeContent";
import MotionDiv from "@/components/layouts/MotionDiv";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";

export default function HomePage() {
  return (
    <div className="pb-4 md:px-24 md:mt-12 md:pb-10 relative">
      {/* <Image
        src="/home-top_left.png"
        alt="Top Left"
        width={200}
        height={200}
        className="w-[36rem] h-[36rem] object-cover absolute -left-48 -top-20"
      /> */}

      {/* <Image
        src="/home-first_image.png"
        alt="Home Image 1"
        width={200}
        height={200}
        className="w-56 mx-auto"
      /> */}

      <div className="flex flex-col gap-12 md:gap-24">
        <MotionDiv y={-100} delay={1}>
          <HomeContent
            index="01"
            headTitle="HAI"
            title="Kamu Konten Kreator?"
            content={
              <>
                Apakah kamu seorang konten kreator yang mencari cara baru untuk
                meningkatkan kreativitasmu? Dunia AI sekarang menyediakan
                berbagai alat canggih yang bisa membantu membuat karya lebih
                cepat, lebih efektif, dan lebih menarik. Yuk, mulai eksplorasi
                AI untuk menciptakan konten yang lebih menarik dan unik!
              </>
            }
            imageSrc="/home-content_1.jpeg"
          />
        </MotionDiv>

        <MotionDiv y={-100} delay={1}>
          <HomeContent
            index="02"
            headTitle="JADI"
            title="Apakah Kamu Mengimplementasikan AI?"
            content={
              <>
                Menggunakan AI dalam proses kreatif bisa menjadi game-changer!
                Mulai dari pengeditan gambar otomatis hingga pembuatan konten
                berbasis AI, semua bisa dilakukan lebih cepat dan efisien. Jika
                kamu belum mencoba, sekarang adalah waktu yang tepat untuk
                memulai dan melihat dampaknya pada produktivitasmu.
              </>
            }
            readMoreHref="https://meson-digital.com/blog/peranan-ai-dalam-pembuatan-konten-media-sosial/"
            readMoreHrefNewTab
            imageSrc="/home-content_2.jpeg"
            reverse
          />
        </MotionDiv>

        <MotionDiv y={-100} delay={1} optionalStyling={"md:hidden"}>
          <Image
            src="/home-content_1.jpeg"
            alt="Home Image 1"
            width={200}
            height={200}
            className="md:hidden mt-6 w-full mx-auto border-2 border-[#2E7D32]"
          />
        </MotionDiv>

        <MotionDiv y={-100} delay={1}>
          <HomeContent
            index="03"
            headTitle="AYOO!!!"
            title="Di Sini Kita Bisa Saling Berbagi"
            content={
              <>
                Mari bergabung dengan komunitas kreator yang menggunakan AI
                untuk menciptakan karya luar biasa. Di sini, kita bisa berbagi
                tips, trik, dan rekomendasi AI terbaik yang bisa membantu
                mengoptimalkan proses kreatifmu. Dengan saling berbagi, kita
                bisa berkembang bersama!
              </>
            }
            readMoreHref="/explore"
            imageSrc="/home-content_3.jpeg"
          />
        </MotionDiv>

        <MotionDiv y={-100} delay={1} optionalStyling={"md:hidden"}>
          <Image
            src="/home-content_2.jpeg"
            alt="Home Image 2"
            width={200}
            height={200}
            className="md:hidden mt-6 w-full mx-auto border-2 border-[#2E7D32]"
          />
        </MotionDiv>
      </div>
    </div>
  );
}
