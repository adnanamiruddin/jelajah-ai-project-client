import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import GlobalLoading from "../layouts/globals/GlobalLoading";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const { user } = useSelector(selectUser);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = setTimeout(() => {
      if (!user) {
        // toast.error("Anda harus masuk terlebih dahulu");
        router.push("/login");
      }
      setIsChecking(false);
    }, 3000);

    return () => clearTimeout(checkUser);
  }, [user, router]);

  if (isChecking) {
    return <GlobalLoading />;
  }

  return user ? children : null;
}
