import { auth } from "@/api/config/firebase.config";
import { selectUser, setUser } from "@/redux/features/userSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdAccountCircle, MdDashboard } from "react-icons/md";

const notLoggedInLinks = [
  {
    href: "/",
    label: "Beranda",
  },
  // {
  //   href: "/about",
  //   label: "Tentang",
  // },
  {
    href: "/explore",
    label: "Jelajah",
  },
];

const loggedInLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <MdDashboard className="text-2xl me-1" />,
  },
];

export default function Navbar({ isCarouselPassed }) {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const router = useRouter();

  const handleDrawerClose = () => {
    document.getElementById("navbar_drawer").checked = false;
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
      document.getElementById("navbar_drawer").checked = false;
      toast.info("Bye bye 👋");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`text-white px-3.5 py-3 grid grid-cols-2 md:grid-cols-3 items-center fixed w-full shadow-lg z-[99999] md:px-6 md:py-2 ${
        isCarouselPassed || router.pathname !== "/"
          ? "bg-[#071015]"
          : "bg-transparent md:shadow-none"
      }`}
    >
      <Link href="/">
        <h1 className="w-max font-mono text-2xl font-bold px-2 py-0.5 md:px-3 bg-transparent hover:shadow-slate-900 hover:backdrop-blur-sm hover:bg-transparent">
          Jelajah AI
        </h1>
      </Link>

      {/* Mobile View START */}
      <div className="ms-auto w-max drawer-end md:hidden">
        <input id="navbar_drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="navbar_drawer"
            className="px-1 py-0.5 flex justify-center items-center"
          >
            <IoMenu className="text-4xl" />
          </label>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="navbar_drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-[#071015] text-white gap-3">
            <h1 className="w-max font-mono text-2xl font-bold backdrop-blur-sm px-3 pt-0.5 pb-2">
              Jelajah AI
            </h1>
            {notLoggedInLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleDrawerClose}
                  className={`text-lg font-semibold ${
                    router.pathname === link.href
                      ? "bg-gradient-to-br from-green-800 to-green-400"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {user ? (
              <>
                {loggedInLinks.map((link) => (
                  <li key={link.href} className="mt-auto">
                    <Link
                      href={link.href}
                      onClick={handleDrawerClose}
                      className={`text-lg font-semibold ${
                        router.pathname === link.href
                          ? "bg-gradient-to-br from-green-800 to-green-400"
                          : ""
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-lg font-semibold bg-red-600 text-white hover:bg-red-500 focus:bg-red-800"
                  >
                    <FiLogOut className="text-2xl me-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mt-auto">
                  <button
                    onClick={() => {
                      document.getElementById("navbar_drawer").checked = false;
                      document.getElementById("login_modal").showModal();
                    }}
                    className="text-lg font-semibold bg-gray-900"
                  >
                    Login
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => {
                      document.getElementById("navbar_drawer").checked = false;
                      document.getElementById("register_modal").showModal();
                    }}
                    className="text-lg font-semibold bg-gray-900"
                  >
                    Register
                  </button>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
      {/* Mobile View END */}

      {/* Desktop View START */}
      <div className="hidden md:flex md:justify-center">
        <ul className="menu menu-horizontal gap-4">
          {notLoggedInLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex justify-center text-base font-semibold focus:backdrop-blur-sm focus:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:inline md:ms-auto">
        <div className="me-2">
          {!user ? (
            <button
              onClick={() => document.getElementById("login_modal").showModal()}
              className="py-2 px-4 rounded-md font-semibold shadow-lg border-0 text-white bg-transparent hover:shadow-slate-900 hover:backdrop-blur-sm hover:bg-transparent"
            >
              Login
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn font-semibold shadow-lg border-0 px-4 text-white bg-transparent hover:shadow-slate-900 hover:backdrop-blur-sm hover:bg-transparent focus:bg-transparent focus:backdrop-blur-sm"
              >
                <MdAccountCircle className="text-xl" />
                {user.firstName}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-transparent backdrop-blur-sm hover:bg-transparent border-2 border-green-500 border-t-0 border-r-0 rounded-tr-none"
              >
                <>
                  {loggedInLinks.map((link) => (
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
          )}
        </div>
      </div>
      {/* Desktop View END */}
    </div>
  );
}
