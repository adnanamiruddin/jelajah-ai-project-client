import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import toolsApi from "@/api/modules/tools.api";
import { useState } from "react";

export default function ToolRequestRejectModal({
  selectedToolRequest,
  fetchTools,
}) {
  const [loading, setLoading] = useState(false);

  const handleAcceptToolRequest = async () => {
    if (loading || !selectedToolRequest) return;
    setLoading(true);

    const { response, error } = await toolsApi.updateToolStatus({
      toolId: selectedToolRequest?.id,
      status: "rejected",
    });
    if (response) {
      document.getElementById("tool_request_reject_modal").close();
      toast.success("Berhasil menolak permintaan rekomendasi AI!");
      setLoading(false);
      fetchTools();
    }
    if (error) {
      toast.error("Gagal menolak permintaan rekomendasi AI!");
      setLoading(false);
    }
  };

  return (
    <dialog id="tool_request_reject_modal" className="modal">
      <div className="modal-box bg-[#19161C] w-11/12 max-w-3xl rounded-lg border border-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Tolak Permintaan
        </h1>

        <div className="mt-6">
          <p className="text-lg">
            Apakah Anda yakin ingin menolak permintaan rekomendasi AI dari{" "}
            <span className="font-bold">{selectedToolRequest?.name}</span>?
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-gray-400">Permintaan Rekomendasi AI</p>

          <div className="flex justify-end items-center gap-3">
            <ModalCancelButton
              loading={loading}
              onClick={() =>
                document.getElementById("tool_request_reject_modal").close()
              }
            >
              Batal
            </ModalCancelButton>
            {/*  */}
            <ModalSubmitButton
              loading={loading}
              onClick={handleAcceptToolRequest}
            >
              Tolak
            </ModalSubmitButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}
