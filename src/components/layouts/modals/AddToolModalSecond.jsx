import Input from "../functions/Input";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#19161C",
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#19161C",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#333" : "#19161C",
    color: "white",
    "&:hover": {
      backgroundColor: "#333",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#333",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: "#555",
      color: "white",
    },
  }),
};

export default function AddToolModalSecond({
  addDataForm,
  tags,
  selectedTagsToAddTool,
  setSelectedTagsToAddTool,
  errorMessageTagsAddTool,
  setUploadAiImage,
  errorMessageImage,
}) {
  return (
    <dialog id="add_tool_modal_second" className="modal">
      <div className="modal-box bg-[#19161C] w-11/12 max-w-3xl rounded-lg border border-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Rekomendasikan AI
        </h1>

        <div className="mt-4">
          <h3 className="mb-3 font-semibold text-lg">Kategori</h3>
          <Select
            isMulti
            styles={customStyles}
            menuPlacement="auto"
            placeholder="Pilih kategori..."
            name="tags"
            options={tags.map((tag) => ({
              value: tag.id,
              label: tag.name,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              setSelectedTagsToAddTool(selectedOptions)
            }
            value={selectedTagsToAddTool}
          />
          {errorMessageTagsAddTool ? (
            <div className="label">
              <span className="label-text-alt text-error -mb-2">
                {errorMessageTagsAddTool}
              </span>
            </div>
          ) : null}
        </div>

        <Input
          label="Link YouTube Video AI (Embed)"
          placeholder="Masukkan url video AI..."
          name="videoURL"
          value={addDataForm.values.videoURL}
          onChange={addDataForm.handleChange}
          error={
            addDataForm.touched.videoURL &&
            addDataForm.errors.videoURL !== undefined
          }
          helperText={
            addDataForm.touched.videoURL && addDataForm.errors.videoURL
          }
        />

        <div className="mt-4">
          <h3 className="mb-3 font-semibold text-lg">Gambar AI (Opsional)</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setUploadAiImage(e.target.files[0]);
            }}
            className="mt-1 file-input file-input-bordered file-input-success w-full bg-gray-900 text-white"
          />
          {errorMessageImage ? (
            <div className="label">
              <span className="label-text-alt text-error -mb-2">
                {errorMessageImage}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-gray-400">Langkah 2 dari 3</p>

          <div className="flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() => {
                document.getElementById("add_tool_modal_second").close();
                document.getElementById("add_tool_modal_first").showModal();
              }}
            >
              Kembali
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
