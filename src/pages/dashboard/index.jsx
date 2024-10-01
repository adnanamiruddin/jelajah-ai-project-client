import toolsApi from "@/api/modules/tools.api";
import LonelyCat from "@/components/layouts/globals/LonelyCat";
import ToolRequestModal from "@/components/layouts/modals/ToolRequestModal";
import ToolCard from "@/components/layouts/ToolCard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState(data);
  const [expandedCard, setExpandedCard] = useState(null);

  const getTools = async () => {
    const { response } = await toolsApi.getToolsByStatus({
      status: "approved",
    });
    if (response) {
      setData(response);
      setItems(response);
    }
  };
  //
  useEffect(() => {
    getTools();
  }, []);

  const handleCardClick = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  const [selectedToolDetail, setSelectedToolDetail] = useState(null);
  //
  const handleShowToolDetail = (tool) => {
    setSelectedToolDetail(tool);
    document.getElementById("tool_request_modal").showModal();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Beranda</h1>

      <div className="mt-6 flex gap-5 flex-wrap md:flex-row relative h-full justify-center items-center pt-2 pb-16">
        {items.length > 0 ? (
          <>
            {items.map((item, i) => (
              <ToolCard
                key={i}
                name={item.name}
                image={item.imageURL}
                description={item.description}
                link={item.link}
                video={item.videoURL}
                isExpanded={i === expandedCard}
                onClick={() => handleCardClick(i)}
                handleDetailClick={() => handleShowToolDetail(item)}
              />
            ))}
          </>
        ) : (
          <div className="mt-12">
            <LonelyCat />
            <p className="mt-8 text-center font-semibold text-lg">
              Tidak ada AI ditemukan
            </p>
          </div>
        )}
      </div>

      <ToolRequestModal selectedToolRequest={selectedToolDetail} />
    </div>
  );
}
