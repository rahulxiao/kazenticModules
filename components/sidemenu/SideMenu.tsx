import { ChevronDown, ChevronRight } from "lucide-react";
import sectionsData from "@/data/sectionsData.json";
import Image from "next/image";

type SectionItem = {
  name: string;
  icon: string;
  path?: string;
};
export default function SideMenu() {
  const expandableItems = [
    "Manage",
    "Tasks",
    "Reports",
    "Storage",
    "HRM",
    "CRM",
  ];
  const renderSection = (section: SectionItem) => {
    const isExpandable = expandableItems.includes(section.name);
    return (
      <div key={section.name}>
        <button className="flex items-center w-full rounded-md py-2 px-3 transition duration-200 hover:bg-gray-100 group">
          <div className="flex items-center gap-3">
            <Image
              src={section.icon}
              alt="icon"
              width={18}
              height={18}
              className="shrink-0"
            />
            <span className="text-left text-[0.875rem] font-medium text-[#191F38] whitespace-nowrap">
              {section.name}
            </span>
          </div>
          <div className="ml-auto flex items-center justify-end">
            {isExpandable && (
              <div className="ml-auto flex items-center justify-end">
                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 text-gray-400  group-hover:text-gray-600"
                />
              </div>
            )}
          </div>
        </button>
      </div>
    );
  };
  return (
    <div className="w-50 bg-[#FFFFFF] text-[#191F38] border-r border-[#EBEBEB] flex flex-col h-full  rounded-tl-md md:relative absolute z-50 ">
      {/* Carbon Stream Section */}
      <div className="flex items-center mb-2 border-b border-[#EBEBEB] p-3 h-[2.188rem] rounded-tl-md">
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 bg-[#FDBF00] rounded-lg flex justify-center text-center ">
            <span className="text-[#FFFFFF] text-[1rem] font-medium">C</span>
          </button>
          <span className="font-semibold text-sm leading-5 tracking-tighter text-[#191F38] ">
            Carbon Stream
          </span>
        </div>
        <Image
          alt="icon"
          src="/assets/sidemenu.svg"
          className="flex cursor-pointer ml-auto"
          width={16}
          height={16}
        />
      </div>

      {/* Sidebar Menu */}
      <div className="space-y-2 pl-3 pr-3 pt-0.5">
        {sectionsData.map((section) => {
          return renderSection(section);
        })}
      </div>

      {/* Upgrade Space */}
      <div className="mt-auto">
        <Image
          alt="upgrade"
          src="/assets/add.svg"
          width={178}
          height={129}
          className="w-full"
        />
      </div>
    </div>
  );
}
