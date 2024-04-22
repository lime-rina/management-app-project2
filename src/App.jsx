import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({ selectedProjectId: undefined, projects: [] })

  const handleStartAddProject = () => {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      }
    })
  }

  const handleAdd = (p) => {
    const updatedProjects = [...projectsState.projects]
    updatedProjects.push(p)
    setProjectsState((prev) => { return { ...prev, projects: [...updatedProjects] } })
  }

  const conditionalOutput = () => {
    if (projectsState.selectedProjectId === null) {
      return <NewProject addProject={(p) => { handleAdd(p) }} />
    } else if (projectsState.selectedProjectId === undefined) {
      return <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} />
      {conditionalOutput()}
    </main>
  );
}

export default App;
