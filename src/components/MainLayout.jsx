import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import usersApi from "@/api/modules/users.api";
import { setUser } from "@/redux/features/userSlice";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/layouts/globals/Navbar";
import Footer from "@/components/layouts/globals/Footer";

import "react-toastify/dist/ReactToastify.css";
import HomeHero from "./layouts/HomeHero";
import Head from "next/head";
import LoginModal from "./layouts/modals/LoginModal";
import RegisterModal from "./layouts/modals/RegisterModal";
import DashboardSidebar from "./layouts/globals/DashboardSidebar";
import ProtectedPage from "./utils/ProtectedPage";
import ModalSubmitButton from "./layouts/functions/ModalSubmitButton";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isCarouselPassed, setIsCarouselPassed] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await usersApi.getProfile();
      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };
    if (localStorage.getItem("actkn")) authUser();
    else dispatch(setUser(null));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsCarouselPassed(true);
      } else {
        setIsCarouselPassed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Jelajah AI</title>
      </Head>

      {/* Config React Toastify START */}
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        z-index="9999"
        theme="light"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        limit={1}
      />
      {/* Config React Toastify END */}

      <div className={`${router.asPath.includes("dashboard") ? "hidden" : ""}`}>
        <Navbar isCarouselPassed={isCarouselPassed} />
      </div>

      {router.asPath.includes("dashboard") ? (
        <ProtectedPage>
          <div className="hidden md:block bg-[#071015] text-white min-h-screen">
            <DashboardSidebar />

            <div className="py-10 px-8 mt-14 sm:ml-64">{children}</div>
          </div>

          <div className="md:hidden bg-[#071015] text-white min-h-screen flex justify-center items-center flex-col gap-8">
            <h1 className="font-semibold text-3xl text-center">
              Silahkan akses menggunakan laptop
            </h1>
            <ModalSubmitButton onClick={() => router.push("/")}>
              Kembali
            </ModalSubmitButton>
          </div>
        </ProtectedPage>
      ) : router.asPath === "/" ? (
        <>
          <HomeHero />

          <div className="bg-[#071015] text-white p-6 min-h-screen">
            {children}
          </div>
        </>
      ) : (
        <div className="bg-[#071015] text-white p-6 pt-20 min-h-screen">
          {children}
        </div>
        // <div className="bg-white text-black p-6 pt-24 min-h-screen">
        //   {children}
        // </div>
      )}

      <LoginModal />
      {/* <RegisterModal /> */}

      <div className={`${router.asPath.includes("dashboard") ? "hidden" : ""}`}>
        <Footer />
      </div>
    </>
  );
}
