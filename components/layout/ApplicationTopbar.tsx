import { ChevronDown, Folder } from "lucide-react";
import Image from "next/image";

export default function ApplicationTopbar() {
  return (
    <header className="flex h-[2.188rem] w-full items-center bg-[#FFFFFF] py-4 px-3">
      <div className="flex items-center gap-1">
        {/* Workspace Switcher */}
        <button className="group flex items-center gap-2 rounded-md p-1 transition-colors hover:bg-gray-50 cursor-pointer">
          <Image
            src="/assets/K-fill.svg"
            alt="kazentic-logo"
            width={16}
            height={16}
          />
          <span className="text-xs leading-4 tracking-tighter font-semibold text-[#191F38]">
            Kazentic
          </span>
          <ChevronDown
            size={14}
            className="text-gray-400 group-hover:text-gray-600"
          />
        </button>

        {/* Vertical Separator */}
        <div className="h-4 w-[0.1rem] bg-gray-300 mx-1" aria-hidden="true" />

        {/* Breadcrumb Section */}
        <div className="flex items-center gap-2 text-gray-500">
          <Folder size={16} className="text-gray-400" />
          <span className="text-xs font-medium leading-4 tracking-tighter text-[#697588]">
            Projects
          </span>
        </div>
      </div>
    </header>
  );
}
