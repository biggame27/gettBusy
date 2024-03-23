"use client"
import { sidebarStuff } from "@/constants";
import SidebarIcons from "./SidebarIcons";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Sidebar = () => {
  return (
      
      <aside className="flex flex-col w-52 h-screen bg-sidebarBackground shadow-lg justify-between">
      <SignedIn>
        <div>
          <h1 className="text-lg ml-2 mt-2">
            get busy lmao
          </h1>
          <div className="mt-4 ml-4 flex-col">
            {
              sidebarStuff.map((sidebarThing) => {
                return (
                  <SidebarIcons key={sidebarThing.name} name={sidebarThing.name} link={sidebarThing.link} icon={sidebarThing.icon} />
                )
              })
            }
          </div>
        </div>
        <div className="ml-4 mb-4">
          <UserButton afterSignOutUrl='/' />  
        </div>
        </SignedIn>
        <SignedOut>
      <Button asChild className="button bg-black rounded-2xl text-white">
        <Link href="/sign-in">Login</Link>
      </Button>
    </SignedOut>
      </aside>
    
    
  )
}

export default Sidebar;