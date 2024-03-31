interface TaskComponentProps {
  name: string;
  tag: string;
}

const TaskComponent = ({name, tag} : TaskComponentProps) => {
  return (
    <div className="flex rounded-lg truncate bg-gray-100 px-2 flex-col text-sm">
      <div className="truncate">
      {name}
      </div>
      
      <div className="truncate bg-gray-200 rounded-md px-1">
        {tag}
      </div>
    </div>
  )
}

export default TaskComponent;