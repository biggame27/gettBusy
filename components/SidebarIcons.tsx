import Link from "next/link";

interface SidebarIconProps {
  name: string,
  link: string,
  icon: React.ReactNode,
}

const SidebarIcons = ({name, link, icon} : SidebarIconProps) => {
  return (
    <Link href={link} className="flex flex-row items-center gap-2 text-sm hover:opacity-80">
      {icon}
      {name}
    </Link>
  )
}

export default SidebarIcons;