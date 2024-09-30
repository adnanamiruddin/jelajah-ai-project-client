import Input from "../functions/Input";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import TextArea from "../functions/TextArea";

export default function AddToolModalFirst({ addDataForm }) {
  return (
    <dialog id="add_tool_modal_first" className="modal">
      <div className="modal-box bg-[#19161C] w-11/12 max-w-3xl rounded-lg border border-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Rekomendasikan AI
        </h1>

        <Input
          label="Nama AI"
          placeholder="Masukkan nama AI..."
          name="name"
          value={addDataForm.values.name}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.name && addDataForm.errors.name !== undefined
          }
          helperText={addDataForm.touched.name && addDataForm.errors.name}
        />

        <TextArea
          rows={4}
          label="Deskripsi AI"
          placeholder="Masukkan deskripsi AI..."
          name="description"
          value={addDataForm.values.description}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.description &&
            addDataForm.errors.description !== undefined
          }
          helperText={
            addDataForm.touched.description && addDataForm.errors.description
          }
        />

        <Input
          label="Link AI"
          placeholder="Masukkan url dari AI..."
          name="link"
          value={addDataForm.values.link}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.link && addDataForm.errors.link !== undefined
          }
          helperText={addDataForm.touched.link && addDataForm.errors.link}
        />

        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-gray-400">Langkah 1 dari 3</p>

          <div className="flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() =>
                document.getElementById("add_tool_modal_first").close()
              }
            >
              Batal
            </ModalCancelButton>
            {/*  */}
            <ModalSubmitButton onClick={() => addDataForm.handleSubmit()}>
              Lanjutkan
            </ModalSubmitButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}
