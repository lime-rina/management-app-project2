import { useState, useEffect } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import ProjectOverview from "./components/ProjectOverview";

function App() {
  const [projectsState, setProjectsState] = useState({ selectedProjectId: undefined, projects: [], selectedProject: {} })

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
  const handleSelect = (id) => {
    console.log(id);
    setProjectsState((prev) => {
      return { ...prev, selectedProjectId: id };
    });
  };

  const handleSaveProject = (pr) => {
    console.log(pr)
  }

  useEffect(() => {
    if (projectsState.selectedProjectId !== undefined) {
      const _selectedProject = projectsState.projects.find((elem) => elem.id === projectsState.selectedProjectId);
      setProjectsState((prev) => {
        return { ...prev, selectedProject: _selectedProject };
      });
    }
  }, [projectsState.selectedProjectId, projectsState.projects]);


  const conditionalOutput = () => {
    if (projectsState.selectedProjectId === null) {
      return <NewProject addProject={(p) => { handleAdd(p) }} />
    } else if (projectsState.selectedProjectId === undefined) {
      return <NoProjectSelected onStartAddProject={handleStartAddProject} />
    } else {
      return <ProjectOverview project={projectsState.selectedProject} saveProject={(p) => handleSaveProject(p)} />;
    }
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} selectProject={handleSelect} />
      {conditionalOutput()}
    </main>
  );
}

export default App;
