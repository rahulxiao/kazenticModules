import Sidebar from "@/components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import SideMenu from "@/components/sidemenu/SideMenu";
import App from "next/app";
import ApplicationTopbar from "@/components/layout/ApplicationTopbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (    
        <div className="flex flex-col h-screen">
            <Topbar />
            <div className="flex grow">
                <Sidebar />
                <div className="bg-[#111953] relative hidden lg:flex">
                    <SideMenu />
                </div>
                <div className="w-full bg-[#111953] flex flex-col">
                    <ApplicationTopbar />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
