"use client"
import SidebarIcons from "./SidebarIcons";
import Image from "next/image";
import { ChevronFirst, ChevronLast, LayoutDashboard, MoreVertical } from "lucide-react"
import { UserButton } from "@clerk/nextjs";
import React, { createContext, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  username: string,
  email: string,
  children: React.ReactNode;
}

const Sidebar = ({username, email, children} : SidebarProps) => {
  const [expanded, setExpanded] = useState(true);
  const path = usePathname();

  return (
    <>
      <aside className="h-screen fixed">
        {/* container */}
        <nav className="h-full flex flex-col shadow-sm border-r bg-white">
          {/* logo and retract */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <Image src="https://img.logoipsum.com/285.svg" alt="logo" width={150} height={100} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
            <button onClick={() => setExpanded(!expanded)} className="p-1.5 bg-gray rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>  
          {/* items */}
            <ul className="flex-1 px-3">
              <SidebarIcons icon={<LayoutDashboard size={20}/>} name={"Home"} link={"/"} active={path == "/"} expanded={expanded} />
              <SidebarIcons icon={<LayoutDashboard size={20}/>} name={"To Do"} link={"/todo"} active={path == "/todo"} expanded={expanded} />
              <SidebarIcons icon={<LayoutDashboard size={20}/>} name={"Calendar"} link={"/calendar"} active={path == "/calendar"} expanded={expanded} />
              <SidebarIcons icon={<LayoutDashboard size={20}/>} name={"Timer"} link={"/timer"} active={path == "/timer"} expanded={expanded} />
            </ul>
          
          {/* user bottom stuff */}
          <div className="border-t flex p-3 gap-3">
            <UserButton afterSignOutUrl='/'  />
            <div className={`flex justify-between items-center leading-4 overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}`}>
              <div>
                <h4 className="font-semibold">{username}</h4>
                <span className="text-xs text-gray-600">{email}</span>
              </div>
              
            </div>
          </div>
        </nav>
      </aside>
      <div className={`w-full p-10 ${expanded ? "pl-64" : "pl-24"} transition-all`}>
        {children}
      </div>
      
    </>
  )
}

export default Sidebar;