"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import profileData from "@/data/userDetails.json";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const { user, status, notifications, preferences } = profileData;
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/setting");
  };

  return (
    <div className="absolute top-10 right-3 w-[320px] bg-[#FFFFFF] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] p-2 border border-[#EBEBEB] overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
      {/* Header Section */}
      <div className="p-2 bg-[#F4F9FF] flex items-center justify-between rounded-lg">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#191F38] font-semibold text-[12px] leading-4 -tracking-tight">
              {user.name}
            </span>
            <span className="text-[#6F6F6F] text-[11px] leading-4 -tracking-tight">
              {user.email}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#F2F9FE] text-[#4157FE] text-[11px] font-medium px-1 py-0.5 rounded-md border border-[#4157FE80]">
            {user.badge}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2">
        {/* Status Group */}
        <section className="mt-1">
          <label className="text-[11px] font-medium leading-4 -tracking-tight text-[#697588] ">
            Status
          </label>
          <div className="flex items-center justify-between cursor-pointer transition-all mt-2 group">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/status.svg"
                alt="cover"
                width={16}
                height={16}
              />
              <span className="text-xs font-medium text-[#191F38] leading-5 -tracking-tight">
                {status.label}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] leading-4 font-medium -tracking-tight text-[#9BA2AD]">
                {status.current}
              </span>
              <ChevronRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500"
              />
            </div>
          </div>
        </section>

        {/* Notifications Group */}
        <section className="mt-3">
          <label className="text-[11px] font-medium leading-4 -tracking-tight text-[#697588]">
            Notifications
          </label>
          <div className="flex items-center justify-between cursor-pointer transition-all mt-2 group">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/volume-mute.svg"
                alt="cover"
                width={16}
                height={16}
              />
              <span className="text-xs font-medium text-[#191F38] leading-5 -tracking-tight">
                {notifications.label}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] leading-4 font-medium -tracking-tight text-[#9BA2AD]">
                {notifications.muteDuration}
              </span>
              <ChevronRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500"
              />
            </div>
          </div>
        </section>

        {/* Preferences Group */}
        <section className="mt-3">
          <label className="text-[11px] font-medium leading-4 -tracking-tight text-[#697588]">
            Preferences
          </label>
          <div
            className="flex items-center cursor-pointer transition-all mt-2 s"
            onClick={navigateToDashboard}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/assets/settings.svg"
                alt="cover"
                width={16}
                height={16}
              />
              <span className="text-xs font-medium text-[#191F38] leading-5 -tracking-tight">
                Settings
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between cursor-pointer transition-all mt-2 group">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/brush.svg"
                alt="cover"
                width={16}
                height={16}
              />
              <span className="text-xs font-medium text-[#191F38] leading-5 -tracking-tight">
                Appearance
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] leading-4 font-medium -tracking-tight text-[#9BA2AD]">
                {preferences.theme}
              </span>
              <ChevronRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500"
              />
            </div>
          </div>
        </section>

        {/* Sign Out Button */}
        <div className="mt-3 px-2">
          <button className="w-full bg-[#FDFDFD] flex items-center justify-center gap-2 py-2 border border-[#EBEBEB] rounded-lg text-[#DC2626] font-medium text-xs hover:bg-red-50 transition-colors active:scale-[0.98]">
            <Image
              src="/assets/logout.svg"
              alt="cover"
              width={16}
              height={16}
            />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
