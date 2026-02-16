import Image from "next/image";

export default function Sidebar() {
  return (
    <div className=" w-9.5 h-full  px-2 py-4 hidden md:flex   flex-col items-center bg-[#111953] text-[#FFFFFF] z-10 pb-10">
      {/* Sidebar Buttons */}
      <div className="space-y-3 flex flex-col flex-1 items-center">
        {/* Section C */}
        <div className="flex flex-row justify-center items-center">
          <div className="w-1 h-2 bg-white rounded-r-full absolute left-0"></div>
          <button
            className="w-6 h-6 bg-linear-to-b from-[#FF9F00] to-[#FDBF00] rounded-md flex justify-center text-center border-transparent"
            style={{
              borderImage: "radial-gradient(circle, #FFF6D9, #FF9F00) 1",
              boxShadow: "0px 4px 24px rgba(253, 191, 0, 0.34)",
            }}
          >
            <span className="text-[#FFFFFF] text-[1rem] font-medium">C</span>
          </button>
        </div>

        {/* Plus Button */}
        <button className="w-6 h-6 rounded-md flex justify-center  items-center pb-1  mt-4 hover:bg-slate-600 hover:border hover:border-gray-400 hover:bg-opacity-40 ">
          <span className="text-[#3f55f9] text-[1.9rem]">+</span>
        </button>

        {/*line break*/}
        <div className="w-5 h-[0.1rem] bg-[#FFFFFF33]"></div>

        {/* Section D */}
        <button
          className="w-6 h-6 bg-linear-to-b from-[#FF4B00] to-[#FF9F00] rounded-md flex justify-center border-transparent text-center "
          style={{
            borderImage: "radial-gradient(circle, #FFDBD2, #FF7816) ",
            boxShadow: "0px 4px 24px rgba(255, 120, 22, 0.49)",
          }}
        >
          <span className="text-[#FFFFFF] text-[1rem] font-medium">D</span>
        </button>

        {/* Section L */}
        <button
          className="w-6 h-6 bg-linear-to-b from-[#059669] to-[#15BD6D] rounded-md flex justify-center border-transparent text-center"
          style={{
            borderImage: "radial-gradient(circle, #D9FFED, #059669) ",
            boxShadow: "0px 4px 24px rgba(21, 189, 109, 0.34)",
          }}
        >
          <span className="text-[#FFFFFF] text-[1rem] font-medium">L</span>
        </button>

        {/* Plus Button */}
        <button className="w-6 h-6 rounded-lg flex justify-center  items-center pb-1  mt-4 hover:bg-slate-600 hover:border hover:border-gray-400 hover:bg-opacity-40  ">
          <span className="text-[#3f55f9] text-[1.9rem]">+</span>
        </button>

        {/*line break*/}
        <div className="w-5 h-[0.1rem] bg-[#FFFFFF33]"></div>

        {/* Plus Button */}
        <button className="w-6 h-6rounded-lg flex justify-center  items-center pb-1  mt-4 hover:bg-slate-600 hover:border hover:border-gray-400 hover:bg-opacity-40 ">
          <span className="text-[#3f55f9] text-[1.9rem]">+</span>
        </button>
      </div>
      {/*Below Buttons*/}
      <div className="mt-auto mb-4 space-y-3 flex flex-col justify-center items-center">
        {/*Billing*/}
        <button className="w-6 h-6 rounded-md flex justify-center text-center items-center border border-gray-300 border-opacity-60 bg-[#4157FE] cursor-pointer ">
          <Image
            src="/assets/billing.svg"
            alt="icon"
            width={16}
            height={16}
          ></Image>
        </button>

        {/*Bug*/}
        <button className="w-6 h-6 rounded-md flex justify-center text-center items-center border border-gray-300 border-opacity-60 bg-[#4157FE] cursor-pointer ">
          <Image
            src="/assets/bug.svg"
            alt="icon"
            width={16}
            height={16}
          ></Image>
        </button>

        {/*Support*/}
        <button className="w-6 h-6 rounded-md flex justify-center text-center items-center border border-gray-300 border-opacity-60 bg-[#4157FE] cursor-pointer ">
          <Image
            src="/assets/support.svg"
            alt="icon"
            width={16}
            height={16}
          ></Image>
        </button>
      </div>
    </div>
  );
}
