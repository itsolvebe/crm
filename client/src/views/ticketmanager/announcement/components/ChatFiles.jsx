import { FiDownload } from "react-icons/fi";
import PdfIcon from "assets/files/pdf-icon.svg";
import DocIcon from "assets/files/doc-icon.svg";
import GalleryIcon from "assets/files/gallery-icon.svg";
import CodeIcon from "assets/files/code-icon.svg";

function ChatFiles() {
  return (
    <div className="hidden flex-col gap-4 px-4 md:flex md:w-2/5 lg:w-1/5">
      <div className=" flex items-center justify-start gap-2 border-b border-gray-200 py-6">
        <div className="flex items-center gap-3 ">
          <span className="font-semibold">Files</span>
          <span className="rounded-lg bg-[#EDF2F7] px-2 py-0.5 text-xs font-semibold ">
            8
          </span>
        </div>
      </div>

      <div className="hideScrollBar mt-2 flex flex-col  gap-4  overflow-y-auto">
        {/* Pdf Icon  */}
        <div className="flex items-center gap-2 border-b p-1 pb-2  hover:bg-[#F6F6FE]">
          <div className="flex items-center justify-center rounded-lg bg-red-50 p-2">
            <img alt="Pdf Icon" src={PdfIcon} width={32} height={32} />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <span className="text-sm font-semibold">myProjectFile.pdf</span>
            <div className="flex gap-2">
              {/* Messages */}
              <span className="text-xs font-semibold text-gray-500">PDF </span>
              <span className="text-xs font-semibold text-gray-500">
                {" "}
                5.2MB{" "}
              </span>
            </div>
          </div>
          <div className="">
            <FiDownload
              className="h-6 w-6 text-purple-600 hover:text-gray-800"
              width={48}
              height={48}
            />
            {/* <span className="text-xs font-semibold text-gray-500">12m</span> */}
          </div>
        </div>

        {/* Doc Icon  */}
        <div className="flex items-center gap-2 border-b p-1 pb-2 hover:bg-[#F6F6FE]">
          <div className="flex items-center justify-center rounded-lg bg-blue-50 p-2">
            <img alt="Pdf Icon" src={DocIcon} width={32} height={32} />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <span className="text-sm font-semibold">myProjectFile.doc</span>
            <div className="flex gap-2">
              {/* Messages */}
              <span className="text-xs font-semibold text-gray-500">DOC </span>
              <span className="text-xs font-semibold text-gray-500">
                {" "}
                7.3MB{" "}
              </span>
            </div>
          </div>
          <div className="">
            <FiDownload
              className="h-6 w-6 text-purple-600  hover:text-gray-800"
              width={48}
              height={48}
            />
            {/* <span className="text-xs font-semibold text-gray-500">12m</span> */}
          </div>
        </div>

        {/* Gallery Icon  */}
        <div className="flex items-center gap-2 border-b p-1 pb-2 hover:bg-[#F6F6FE]">
          <div className="flex items-center justify-center rounded-lg bg-green-50 p-2">
            <img alt="Pdf Icon" src={GalleryIcon} width={32} height={32} />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <span className="text-sm font-semibold">Screenshot1.png</span>
            <div className="flex gap-2">
              {/* Messages */}
              <span className="text-xs font-semibold text-gray-500">PNG </span>
              <span className="text-xs font-semibold text-gray-500">
                {" "}
                5.2MB{" "}
              </span>
            </div>
          </div>
          <div className="">
            <FiDownload
              className="h-6 w-6 text-purple-600  hover:text-gray-800"
              width={48}
              height={48}
            />
            {/* <span className="text-xs font-semibold text-gray-500">12m</span> */}
          </div>
        </div>

        {/* Code Icon  */}
        <div className="flex items-center gap-2 border-b p-1 pb-2 hover:bg-[#F6F6FE]">
          <div className="flex items-center justify-center rounded-lg bg-purple-50 p-2">
            <img alt="Pdf Icon" src={CodeIcon} width={32} height={32} />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <span className="text-sm font-semibold">index.js</span>
            <div className="flex gap-2">
              {/* Messages */}
              <span className="text-xs font-semibold text-gray-500">JS </span>
              <span className="text-xs font-semibold text-gray-500">
                {" "}
                1.3MB{" "}
              </span>
            </div>
          </div>
          <div className="">
            <FiDownload
              className="h-6 w-6 text-purple-600  hover:text-gray-800"
              width={48}
              height={48}
            />
            {/* <span className="text-xs font-semibold text-gray-500">12m</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatFiles;
