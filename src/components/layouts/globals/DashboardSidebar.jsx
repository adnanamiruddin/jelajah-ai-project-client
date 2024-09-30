import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { FaCodePullRequest } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import Image from "next/image";

const dashboardLinks = [
  {
    title: "Beranda",
    href: "/dashboard",
    icon: (
      <IoHome className="text-2xl text-gray-300 transition duration-75 group-hover:text-white" />
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

export default function DashboardSidebar() {
  const router = useRouter();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-gray-900 to-black from-30%">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
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
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      src="/home-content_4.jpeg"
                      alt="User's Photo"
                      width={200}
                      height={200}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                </div>
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
            <li>
              <div class="bg-gray-300 h-0.5 opacity-20"></div>
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
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
