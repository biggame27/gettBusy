import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-row text-textColor mt-4 ml-4">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}