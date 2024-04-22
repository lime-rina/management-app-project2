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
    setProjectsState((prev) => {
      return { ...prev, selectedProjectId: id };
    });
  };

  const handleSaveProject = (pr) => {
    if (pr) {
      setProjectsState((prev) => {
        const updatedProjects = prev.projects.map((project) => {
          if (project.id === pr.id) {
            return pr;
          }
          return project;
        });
        return { ...prev, projects: updatedProjects };
      });
    }
  };

  const handleDeleteProject = (pr) => {
    if (pr) {
      setProjectsState((prev) => {
        const updatedProjects = prev.projects.filter((project) => project.id !== pr.id);
        return { ...prev, projects: updatedProjects, selectedProject: {}, selectedProjectId: null };
      });
    }
  };


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
      return <ProjectOverview project={projectsState.selectedProject} saveProject={(p) => handleSaveProject(p)} deleteProject={(p) => handleDeleteProject(p)} />;
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
