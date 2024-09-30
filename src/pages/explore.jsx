import { useEffect, useState } from "react";
import ToolCard from "@/components/layouts/ToolCard";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import MotionDiv from "@/components/layouts/MotionDiv";
import AddDataButton from "@/components/layouts/functions/AddDataButton";
import AddToolModalFirst from "@/components/layouts/modals/AddToolModalFirst";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddToolModalSecond from "@/components/layouts/modals/AddToolModalSecond";
import AddToolModalThird from "@/components/layouts/modals/AddToolModalThird";
import toolsApi from "@/api/modules/tools.api";
import ToolRequestModal from "@/components/layouts/modals/ToolRequestModal";

export default function ExplorePage() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState(data);
  const [expandedCard, setExpandedCard] = useState(null);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultKeyword = searchParams.get("cari");
  const [inputValue, setInputValue] = useState("");

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState("Semua");

  const handleCardClick = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  const onKeywordChangeHandler = (cari) => {
    setInputValue(cari);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, cari },
    });
  };

  const clearInput = () => {
    setInputValue("");
    setSelectedTags("Semua");
    router.push({
      pathname: router.pathname,
      query: { ...router.query, cari: "" },
    });
  };

  const getTools = async () => {
    const { response } = await toolsApi.getToolsByStatus({
      status: "approved",
    });
    if (response) {
      console.log(response);

      setData(response);
      setItems(response);
    }
  };
  //
  const getTags = async () => {
    const { response } = await toolsApi.getTags();
    if (response) setTags(response);
  };
  //
  useEffect(() => {
    getTools();
    getTags();
  }, []);

  // useEffect(() => {
  //   if (defaultKeyword !== null) {
  //     const searchResult = data.filter((item) => {
  //       const isNameMatch = item.name
  //         .toLowerCase()
  //         .includes(defaultKeyword.toLowerCase());
  //       const isDescMatch = item.desc
  //         .toLowerCase()
  //         .includes(defaultKeyword.toLowerCase());
  //       return isNameMatch || isDescMatch;
  //     });
  //     setItems(searchResult);
  //   }

  //   if (defaultKeyword === "" || defaultKeyword?.length <= 3) {
  //     setSelectedTags("Semua");
  //   }
  // }, [defaultKeyword]);

  // useEffect(() => {
  //   if (selectedTags === "Semua") {
  //     setItems(data);
  //   } else if (selectedTags) {
  //     const getTagsForChoosenTag = async () => {
  //       const itemsForTag = await getItemsByTag(selectedTags);
  //       setItems(itemsForTag);
  //     };
  //     getTagsForChoosenTag();
  //   } else {
  //     setItems(data);
  //   }
  // }, [selectedTags, data]);

  const addDataFormFirst = useFormik({
    initialValues: {
      name: "",
      description: "",
      link: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama AI harus diisi!"),
      description: Yup.string().required("Deskripsi AI harus diisi!"),
      link: Yup.string().required("Link AI harus diisi!"),
      // .matches(
      //   /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      //   "Link tidak valid"
      // ),
    }),
    onSubmit: () => {
      document.getElementById("add_tool_modal_first").close();
      document.getElementById("add_tool_modal_second").showModal();
    },
  });
  //
  const [uploadAiImage, setUploadAiImage] = useState(null);
  const [errorMessageImage, setErrorMessageImage] = useState(null);
  const [selectedTagsToAddTool, setSelectedTagsToAddTool] = useState([]);
  const [errorMessageTagsAddTool, setErrorMessageTagsAddTool] = useState(null);
  //
  const addDataFormSecond = useFormik({
    initialValues: {
      videoURL: "",
    },
    validationSchema: Yup.object({
      videoURL: Yup.string().required("URL video AI harus diisi!"),
      // .matches(
      //   /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      //   "Link video tidak valid"
      // ),
    }),
    onSubmit: () => {
      if (selectedTagsToAddTool.length === 0) {
        setErrorMessageTagsAddTool("Tag harus dipilih!");
        return;
      }

      document.getElementById("add_tool_modal_second").close();
      document.getElementById("add_tool_modal_third").showModal();
    },
  });

  const [selectedToolDetail, setSelectedToolDetail] = useState(null);
  //
  const handleShowToolDetail = (tool) => {
    setSelectedToolDetail(tool);
    document.getElementById("tool_request_modal").showModal();
  };

  return (
    <div className="-mx-4 pb-4 md:px-24 md:mt-12 md:pb-10">
      <div className="w-full z-40 md:px-20">
        <MotionDiv y={-100}>
          <div className="flex justify-between items-center">
            <div className="w-full flex justify-center items-center ps-4 pe-3 relative md:px-0 md:w-[81%]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => onKeywordChangeHandler(e.target.value)}
                placeholder="Cari tools yang sesuai"
                className="bg-black text-gray-300 border-[0.7px] border-r-0 pl-10 py-2 rounded-l-md w-5/6 md:w-11/12"
              />
              <FiSearch className="absolute left-8 top-[32%] text-white md:left-[1.5%]" />

              <button
                onClick={clearInput}
                className="bg-gradient-to-br from-green-800 to-green-400 rounded-r-md w-1/6 flex justify-center items-center h-full py-[0.8rem] font-bold text-white md:w-1/12 hover:brightness-110 focus:brightness-75"
              >
                <FiX />
              </button>
            </div>

            <div className="pe-4">
              <div className="md:hidden">
                <AddDataButton
                  onClick={() =>
                    document.getElementById("add_tool_modal_first").showModal()
                  }
                />
              </div>
              {/*  */}
              <div className="hidden md:inline">
                <AddDataButton
                  onClick={() =>
                    document.getElementById("add_tool_modal_first").showModal()
                  }
                >
                  Rekomendasikan
                </AddDataButton>
              </div>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv y={-100} delay={1}>
          <div className="flex py-4 overflow-scroll gap-1 px-4 md:px-0 scrollbar-none">
            <button
              onClick={() => setSelectedTags("Semua")}
              className={`md:px-10 ${
                selectedTags === "Semua"
                  ? "bg-gradient-to-br from-green-800 to-green-400 text-white font-semibold hover:brightness-125 focus:brightness-90"
                  : "bg-transparent text-[#57c95a] border-[1px] border-[#57c95a] hover:brightness-125 focus:brightness-90"
              } px-4 py-2 rounded-xl my-2 mx-1`}
            >
              Semua
            </button>
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => setSelectedTags(tag.name)}
                className={`md:px-10 ${
                  selectedTags === tag.name
                    ? "bg-gradient-to-br from-green-800 to-green-400 text-white font-semibold hover:brightness-125 focus:brightness-90"
                    : "bg-transparent text-[#57c95a] border-[1px] border-[#57c95a] hover:brightness-125 focus:brightness-90"
                } px-4 py-2 rounded-xl my-2 mx-1 whitespace-nowrap`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </MotionDiv>
      </div>

      <div className="flex gap-5 flex-wrap md:flex-row relative h-full justify-center items-center pt-2 pb-16 md:px-20">
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
      </div>

      <AddToolModalFirst addDataForm={addDataFormFirst} />
      <AddToolModalSecond
        addDataForm={addDataFormSecond}
        tags={tags}
        selectedTagsToAddTool={selectedTagsToAddTool}
        setSelectedTagsToAddTool={setSelectedTagsToAddTool}
        errorMessageTagsAddTool={errorMessageTagsAddTool}
        setUploadAiImage={setUploadAiImage}
        errorMessageImage={errorMessageImage}
      />
      <AddToolModalThird
        addDataFormFirst={addDataFormFirst}
        addDataFormSecond={addDataFormSecond}
        uploadAiImage={uploadAiImage}
        selectedTagsToAddTool={selectedTagsToAddTool}
      />

      <ToolRequestModal selectedToolRequest={selectedToolDetail} />
    </div>
  );
}
