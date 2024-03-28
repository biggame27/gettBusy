import Sidebar from "@/components/Sidebar";
import Image from "next/image";

const dummyTasks = [
  { id: 1, name: 'math', description: 'webassign' },
  { id: 2, name: 'cs', description: 'dungeon crawler' },
  { id: 3, name: 'chat', description: 'gpt' },
  // Add more dummy tasks as needed
];

export default function Home() {
  return (
    <div className="flex flex-row text-textColor mt-4 ml-4 h-full">
      <div className="flex flex-col items-center p-8  justify-center w-full">
      <h1 className="text-3xl font-bold mb-8">welcome to your productivity app!</h1>
      <div className="grid grid-cols-3 gap-4">
        {dummyTasks.map(task => (
          <div key={task.id} className="bg-gray-100 p-4 rounded shadow hover:opacity:80">
            <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
            <p className="text-gray-700">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}



