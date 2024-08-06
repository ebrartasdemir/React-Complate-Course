import { useState } from "react";
import NewProject from "./Components/NewProject";
import NoProject from "./Components/NoProject";
import SideBar from "./Components/SideBar";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });
  function handleAddTask(text){
    setProjectState(prevState => {

      return {
        ...prevState,
        tasks: [...prevState.tasks,{text:text,taskId:Math.random(),projectId:prevState.selectedProjectId}],
      };
    });
  };
  function handleDeleteTask(id){ 
    setProjectState(prevState => {
    return {
      ...prevState,
      tasks:prevState.tasks.filter((task)=>task.taskId!==id && prevState.selectedProjectId===task.projectId)
      
    };
  });
};
  const handleSelectProject = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      };
    });
  };
  const handleDeleteProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=>project.id!==prevState.selectedProjectId)
        
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      };
    });
  };

  const handleAddProject = (enteredData) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        projects: [...prevState.projects, { ...enteredData, id: Math.random() }],
        selectedProjectId: undefined
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  };

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProject onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar 
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId} 
      />
      {content}
    </main>
  );
}

export default App;
