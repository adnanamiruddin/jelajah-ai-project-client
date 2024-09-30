import toolsApi from "@/api/modules/tools.api";
import GlobalLoading from "@/components/layouts/globals/GlobalLoading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoInformationCircleOutline } from "react-icons/io5";
import Link from "next/link";
import ToolRequestModal from "@/components/layouts/modals/ToolRequestModal";
import { FiCheck, FiX } from "react-icons/fi";
import ToolRequestAcceptModal from "@/components/layouts/modals/ToolRequestAcceptModal";
import ToolRequestRejectModal from "@/components/layouts/modals/ToolRequestRejectModal";

export default function DashboardRequestsPage() {
  const [tools, setTools] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchTools = async () => {
    const { response, error } = await toolsApi.getToolsByStatus({
      status: "pending",
    });
    if (response) {
      setTools(response);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 2000);
    }
    if (error) toast.error("Gagal memuat data!");
  };
  //
  useEffect(() => {
    fetchTools();
  }, []);

  const [selectedToolRequest, setSelectedToolRequest] = useState(null);

  return (
    <>
      {isDataLoaded ? (
        <div>
          <h1 className="text-3xl font-bold">
            Daftar Permintaan Penerimaan Rekomendasi AI
          </h1>

          <div className="mt-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white text-lg">
                  <th className="w-[15%] text-start p-3 ps-5 rounded-tl-md">
                    No
                  </th>
                  <th className="w-[25%] text-start p-3">Nama</th>
                  <th className="w-[15%] text-start p-3">Link AI</th>
                  <th className="w-[15%] text-start p-3">Link Video</th>
                  <th className="w-[15%] text-start p-3">Selengkapnya</th>
                  <th className="w-[15%] text-start p-3 rounded-tr-md">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, i) => (
                  <tr
                    key={i}
                    className="my-4 font-semibold odd:bg-gray-800 even:bg-gray-900 last:border-b last:border-gray-500"
                  >
                    <td className="w-[15%] text-start p-3 ps-5">{i + 1}</td>
                    <td className="w-[25%] text-start p-3">{tool.name}</td>
                    <td className="w-[15%] text-start p-3">
                      <Link
                        href={tool.link}
                        target="_blank"
                        className="underline"
                      >
                        {tool.link}
                      </Link>
                    </td>
                    <td className="w-[15%] text-start p-3">
                      <Link
                        href={tool.videoURL}
                        target="_blank"
                        className="underline"
                      >
                        {tool.videoURL}
                      </Link>
                    </td>
                    <td className="w-[15%] text-start p-3">
                      <button
                        onClick={() => {
                          setSelectedToolRequest(tool);
                          document
                            .getElementById("tool_request_modal")
                            .showModal();
                        }}
                        className="ms-10"
                      >
                        <IoInformationCircleOutline className="text-3xl" />
                      </button>
                    </td>
                    <td className="w-[15%] text-start p-3">
                      <button
                        onClick={() => {
                          setSelectedToolRequest(tool);
                          document
                            .getElementById("tool_request_reject_modal")
                            .showModal();
                        }}
                        className="bg-red-600 rounded-md"
                      >
                        <FiX className="text-3xl" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedToolRequest(tool);
                          document
                            .getElementById("tool_request_accept_modal")
                            .showModal();
                        }}
                        className="ms-2 bg-green-500 rounded-md"
                      >
                        <FiCheck className="text-3xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ToolRequestModal selectedToolRequest={selectedToolRequest} />
          <ToolRequestAcceptModal
            selectedToolRequest={selectedToolRequest}
            fetchTools={fetchTools}
          />
          <ToolRequestRejectModal
            selectedToolRequest={selectedToolRequest}
            fetchTools={fetchTools}
          />
        </div>
      ) : (
        <GlobalLoading />
      )}
    </>
  );
}
