import Image from "next/image";

export default function ToolRequestModal({ selectedToolRequest }) {
  return (
    <dialog id="tool_request_modal" className="modal">
      <div className="modal-box bg-[#19161C] w-11/12 max-w-3xl rounded-lg border border-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Selengkapnya
        </h1>

        {selectedToolRequest ? (
          <>
            <Image
              priority
              src={
                selectedToolRequest.imageURL ||
                "/logo_jelajah-ai_bg-removed.png"
              }
              alt="Logo Jelajah AI"
              width={500}
              height={500}
              className="mt-6 w-48 mx-auto"
            />

            <p className="mt-6 text-sm text-justify">
              {selectedToolRequest.description}
            </p>

            <div className="mt-6">
              <div className="bg-gray-800 w-full text-white font-semibold py-2 px-4 rounded-t-md">
                Profil
              </div>
              <div className="text-sm">
                <div className="flex">
                  <h3 className="w-[30%] py-2 px-3 border border-gray-300">
                    Nama
                  </h3>
                  <p className="w-[70%] py-2 px-3 border border-gray-300 break-words whitespace-normal">
                    {selectedToolRequest.userProfileName || "-"}
                  </p>
                </div>
                {/*  */}
                <div className="flex">
                  <h3 className="w-[30%] py-2 px-3 border border-gray-300">
                    Instagram
                  </h3>
                  <p className="w-[70%] py-2 px-3 border border-gray-300 break-words whitespace-normal">
                    {selectedToolRequest.instagramURL || "-"}
                  </p>
                </div>
                {/*  */}
                <div className="flex">
                  <h3 className="w-[30%] py-2 px-3 border border-gray-300">
                    YouTube
                  </h3>
                  <p className="w-[70%] py-2 px-3 border border-gray-300 break-words whitespace-normal">
                    {selectedToolRequest.youtubeURL}
                  </p>
                </div>
                {/*  */}
                <div className="flex">
                  <h3 className="w-[30%] py-2 px-3 border border-gray-300">
                    TikTok
                  </h3>
                  <p className="w-[70%] py-2 px-3 border border-gray-300 break-words whitespace-normal">
                    {selectedToolRequest.tiktokURL}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </dialog>
  );
}
