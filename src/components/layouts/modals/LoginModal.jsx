import Image from "next/image";
import Input from "../functions/Input";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import usersApi from "@/api/modules/users.api";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/config/firebase.config";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "react-toastify";

export default function LoginModal() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email harus diisi!"),
      password: Yup.string()
        .required("Password harus diisi!")
        .min(8, "Setidaknya 8 karakter untuk password!"),
    }),
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { response, error } = await usersApi.signIn({
          userUID: userCredential.user.uid,
        });
        if (response) {
          signInForm.resetForm();
          dispatch(setUser(response));
          document.getElementById("login_modal").close();
          toast.success(`Selamat datang kembali ${response.firstName}`);
          router.push("/dashboard");
        }
        if (error) setErrorMessage(error.message);
      } catch (error) {
        setErrorMessage("Login gagal. Pastikan email dan password benar");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box bg-[#19161C] w-11/12 max-w-3xl rounded-lg border border-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Login
        </h1>

        <Image
          src="/logo_jelajah-ai_bg-removed.png"
          alt="Logo Jelajah AI"
          width={500}
          height={500}
          className="mt-2 w-48 mx-auto"
        />

        <Input
          clearAutoMargin
          label="Email"
          placeholder="Masukkan email Anda..."
          type="email"
          name="email"
          value={signInForm.values.email}
          onChange={signInForm.handleChange}
          error={
            signInForm.touched.email && signInForm.errors.email !== undefined
          }
          helperText={signInForm.touched.email && signInForm.errors.email}
        />

        <Input
          label="Password"
          placeholder="Masukkan password Anda..."
          type="password"
          name="password"
          value={signInForm.values.password}
          onChange={signInForm.handleChange}
          error={
            signInForm.touched.password &&
            signInForm.errors.password !== undefined
          }
          helperText={signInForm.touched.password && signInForm.errors.password}
        />

        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
          <ModalSubmitButton
            fullWidth
            loading={loading}
            onClick={() => signInForm.handleSubmit()}
          >
            Login
          </ModalSubmitButton>
        </div>

        {errorMessage ? (
          <div className="alert alert-error mt-4 text-white text-sm font-semibold">
            <MdErrorOutline className="text-3xl" />
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
