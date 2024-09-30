import { useState } from "react";
import Input from "../functions/Input";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import toolsApi from "@/api/modules/tools.api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/api/config/firebase.config";
import { toast } from "react-toastify";

export default function AddToolModalThird({
  addDataFormFirst,
  addDataFormSecond,
  uploadAiImage,
  selectedTagsToAddTool,
}) {
  const [loading, setLoading] = useState(false);

  const addDataForm = useFormik({
    initialValues: {
      userProfileName: "",
      instagramURL: "",
      youtubeURL: "",
      tiktokURL: "",
    },
    validationSchema: Yup.object({
      userProfileName: Yup.string().required("Nama harus diisi!"),
    }),
    onSubmit: async () => {
      if (loading) return;
      setLoading(true);

      let aiImageURL = "/logo_jelajah-ai.jpeg";
      try {
        const storageRef = ref(
          storage,
          `tool_images/${uploadAiImage.name + +new Date()}`
        );
        const upload = await uploadBytes(storageRef, uploadAiImage);
        const downloadUrl = await getDownloadURL(upload.ref);
        aiImageURL = downloadUrl;
      } catch (error) {
        setLoading(false);
        return;
      }

      const { response, error } = await toolsApi.addTool({
        name: addDataFormFirst.values.name,
        description: addDataFormFirst.values.description,
        link: addDataFormFirst.values.link,
        videoURL: addDataFormSecond.values.videoURL,
        imageURL: aiImageURL,
        userProfileName: addDataForm.values.userProfileName,
        instagramURL: addDataForm.values.instagramURL,
        youtubeURL: addDataForm.values.youtubeURL,
        tiktokURL: addDataForm.values.tiktokURL,
        tagsIdList: selectedTagsToAddTool.map((tag) => tag.value),
      });

      if (response) {
        addDataFormFirst.resetForm();
        addDataFormSecond.resetForm();
        addDataForm.resetForm();
        document.getElementById("add_tool_modal_third").close();
        toast.success(
          "Rekomendasi AI berhasil dikirim!. Silahkan tunggu konfirmasi dari admin."
        );
        setLoading(false);
      }
      if (error) {
        document.getElementById("add_tool_modal_third").close();
        toast.error("Gagal mengirim rekomendasi AI! Silahkan coba lagi.");
        setLoading(false);
        return;
      }
    },
  });

  return (
    <dialog id="add_tool_modal_third" className="modal">
      <div className="modal-box bg-[#19161C] w-11/12 max-w-3xl rounded-lg border border-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Rekomendasikan AI
        </h1>

        <h2 className="mt-4 font-bold text-2xl">Profil Anda</h2>

        <div className="mt-4 mb-2 w-full h-0.5 opacity-20 bg-gray-200"></div>

        <Input
          label="Nama"
          placeholder="Masukkan nama Anda..."
          name="userProfileName"
          value={addDataForm.values.userProfileName}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.userProfileName &&
            addDataForm.errors.userProfileName !== undefined
          }
          helperText={
            addDataForm.touched.userProfileName &&
            addDataForm.errors.userProfileName
          }
        />

        <div className="mt-6 mb-2 w-full h-0.5 opacity-20 bg-gray-400"></div>

        <Input
          label="Link Akun Instagram (Opsional)"
          placeholder="Masukkan link akun Instagram Anda..."
          name="instagramURL"
          value={addDataForm.values.instagramURL}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.instagramURL &&
            addDataForm.errors.instagramURL !== undefined
          }
          helperText={
            addDataForm.touched.instagramURL && addDataForm.errors.instagramURL
          }
        />

        <div className="mt-6 mb-2 w-full h-0.5 opacity-20 bg-gray-400"></div>

        <Input
          label="Link Akun YouTube (Opsional)"
          placeholder="Masukkan link akun YouTube Anda..."
          name="youtubeURL"
          value={addDataForm.values.youtubeURL}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.youtubeURL &&
            addDataForm.errors.youtubeURL !== undefined
          }
          helperText={
            addDataForm.touched.youtubeURL && addDataForm.errors.youtubeURL
          }
        />

        <div className="mt-6 mb-2 w-full h-0.5 opacity-20 bg-gray-400"></div>

        <Input
          label="Link Akun TikTok (Opsional)"
          placeholder="Masukkan link akun TikTok Anda..."
          name="tiktokURL"
          value={addDataForm.values.tiktokURL}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.tiktokURL &&
            addDataForm.errors.tiktokURL !== undefined
          }
          helperText={
            addDataForm.touched.tiktokURL && addDataForm.errors.tiktokURL
          }
        />

        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-gray-400">Langkah 3 dari 3</p>

          <div className="flex justify-end items-center gap-3">
            <ModalCancelButton
              loading={loading}
              onClick={() => {
                document.getElementById("add_tool_modal_third").close();
                document.getElementById("add_tool_modal_second").showModal();
              }}
            >
              Kembali
            </ModalCancelButton>
            {/*  */}
            <ModalSubmitButton
              loading={loading}
              onClick={() => addDataForm.handleSubmit()}
            >
              Kirim
            </ModalSubmitButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}
