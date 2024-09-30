// import { useEffect, useState } from "react";
import { BsDiscord, BsGithub, BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  // const [tagsName, setTagsName] = useState([]);

  // useEffect(() => {
  //   const getTagsName = async () => {
  //     const data = await getAllTagsName();
  //     setTagsName(data);
  //   };
  //   getTagsName();
  // }, []);

  return (
    <div className="bg-slate-950 flex flex-col items-start p-10 gap-12 md:flex-row md:gap-0 md:justify-between md:px-16 md:py-14">
      <div className="flex flex-col gap-3.5 w-full md:gap-4">
        <h1 className="font-mono text-3xl font-semibold">Jelajah AI</h1>
        <p>Managed by Adnan Amiruddin</p>
        <div className="flex gap-4">
          <BsInstagram />
          <BsWhatsapp />
          <BsGithub />
          <BsDiscord />
        </div>
      </div>

      <div className="text-gray-500 flex justify-between w-5/6 md:justify-end md:w-full md:gap-20">
        {/* <div className="flex flex-col gap-3 capitalize">
          <p className="text-white uppercase">Kategori</p>
          {tagsName.map((tag) => (
            <p key={tag.id}>{tag.name}</p>
          ))}
        </div> */}

        <div className="flex flex-col gap-3">
          <p className="text-white">GET CONNECTED</p>
          <p>Services</p>
          <p>Blog</p>
          <p>Newsletter</p>
        </div>
      </div>
    </div>
  );
}
