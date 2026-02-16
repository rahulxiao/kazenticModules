"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative flex w-full justify-between items-center h-9.5 bg-linear-to-r from-[#111953]  to-[#4157FE] text-[#FFFFFF] pr-3">
      <div className="flex items-center z-10">
        <Image
          src="/assets/K.svg"
          className="flex justify-start"
          alt="icon"
          width={50}
          height={50}
        />
      </div>

      <div className="absolute left-44 sm:left-1/2 transform -translate-x-1/2 w-[28%] max-w-xl bg-[#E7E6E41A] border border-[#FFFFFF33] rounded-md  ">
        <div className="flex justify-center items-center h-6 bg-transparent pl-1 pt-0.5 font-medium backdrop-blur-md rounded-md gap-1">
          <Image
            src="/assets/topbarSearch.svg"
            alt="Search Icon"
            width={30}
            height={30}
          />
          <input
            type="text"
            placeholder="Search ..."
            className="w-full bg-transparent text-[#FFFFFF] placeholder-[#FFFFFF] focus:outline-none ml-2"
          />
          <div className="ml-auto h-6 pr-2 border-l-2 border-[#FFFFFF33] pl-2 flex justify-center items-center">
            <Image
              src="/assets/topbarDeco.svg"
              alt="icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      <div className=" absolute right-0 flex items-center space-x-2.5 pr-2 z-10">
        <button className="text-white">
          <Image
            src="/assets/notification.svg"
            alt="Notification"
            width={20}
            height={20}
          />
        </button>

        <button className="text-white">
          <Image src="/assets/menu.svg" alt="Menu" height={16} width={16} />
        </button>
        <div className="w-px h-7 bg-gray-300 bg-opacity-30"></div>

        <div className="flex items-center space-x-2" ref={dropdownRef}>
          <div className="w-8 h-8 rounded-full">
            <Image
              src="/assets/profile.svg"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div className="hidden lg:flex lg:flex-col leading-3 gap-0.5 text-[#FFFFFF]">
            <div className="font-bold text-[0.813rem]">{"User"}</div>
            <div className="text-[0.75rem] text-opacity-70">
              {"user@example.com"}
            </div>
          </div>
          <Image
            src="/assets/moreB.svg"
            alt="icon"
            width={20}
            height={20}
            className={`cursor-pointer transition-transform ${isDropdownOpen ? "rotate-180 z-100" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
}
