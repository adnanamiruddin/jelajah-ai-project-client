import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { FaCodePullRequest } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { auth } from "@/api/config/firebase.config";

const dashboardLinks = [
  {
    title: "Beranda",
    href: "/dashboard",
    icon: (
      <MdDashboard className="text-2xl text-gray-300 transition duration-75 group-hover:text-white" />
    ),
  },
  {
    title: "Permintaan",
    href: "/dashboard/requests",
    icon: (
      <FaCodePullRequest className="text-2xl text-gray-300 transition duration-75 group-hover:text-white" />
    ),
  },
];

const dropdownLinks = [
  {
    href: "/",
    label: "Utama",
    icon: <IoHome className="text-2xl me-1" />,
  },
];

export default function DashboardSidebar() {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
      toast.info("Bye bye 👋");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-gray-900 to-black from-30%">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link href="/" className="flex ms-2 md:me-24">
                <Image
                  priority
                  src="/logo_jelajah-ai_bg-removed.png"
                  alt="FlowBite Logo"
                  width={500}
                  height={500}
                  className="w-12 h-12 rounded-full me-2"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  Jelajah AI
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="font-semibold shadow-lg border-0 text-white bg-transparent hover:shadow-slate-900 hover:backdrop-blur-sm hover:bg-transparent focus:bg-transparent focus:backdrop-blur-sm rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <Image
                    src="/home-content_4.jpeg"
                    alt="User's Photo"
                    width={200}
                    height={200}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-transparent backdrop-blur-sm hover:bg-transparent border-2 border-green-500 border-t-0 border-r-0 rounded-tr-none"
                >
                  <>
                    {dropdownLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white font-semibold hover:bg-gradient-to-br from-green-800 to-green-400"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white font-semibold mt-2 bg-red-600 hover:bg-red-500 focus:bg-red-800"
                    >
                      <FiLogOut className="text-2xl me-1" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-900 border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-900">
          <ul className="space-y-2 font-medium">
            {dashboardLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center p-2 text-white rounded-lg group hover:bg-gray-700 ${
                    router.asPath === link.href ? "bg-gray-800" : ""
                  }`}
                >
                  {link.icon}
                  <span className="ms-3">{link.title}</span>
                </Link>
              </li>
            ))}
            {/* <li>
              <div className="bg-gray-300 h-0.5 opacity-20"></div>
            </li>
            <li>
              <Link
                href="#"
                className={`flex items-center p-2 text-white rounded-lg group hover:bg-gray-700 ${
                  router.asPath === "/dashboard/profile" ? "bg-gray-800" : ""
                }`}
              >
                <CgProfile className="text-2xl text-gray-300 transition duration-75 group-hover:text-white" />
                <span className="ms-3">Profil</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
}
