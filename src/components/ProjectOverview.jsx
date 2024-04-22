import { useEffect, useState } from "react";
import Input from "./Input";
import Task from "./Task";

export default function ProjectOverview({ project, ...props }) {
    const [projectState, setProjectState] = useState({});
    const [task, setTask] = useState("");

    useEffect(() => {
        setProjectState(project);
    }, [project]);

    const addTask = () => {
        if (task) {
            const updatedTasks = [...projectState?.tasks, task];
            setProjectState((prev) => ({ ...prev, tasks: updatedTasks }));
            setTask("")
        }
    };

    const removeTask = (index) => {
        const updatedTasks = [...projectState?.tasks]
        updatedTasks.splice(index, 1);
        setProjectState((prev) => ({ ...prev, tasks: updatedTasks }));
    }

    return (
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-between ">
                <li>
                    <h1 className="text-4xl font-bold text-stone-600">{project?.title}</h1>
                    <p className="mt-4 text-sm text-stone-400">{new Date(project?.dueDate).toDateString()}</p>
                </li>
                <li className="flex gap-2">
                    <button
                        className="px-6 py-2 rounded-md text-red-300 font-bold hover:underline"
                        onClick={() => props.deleteProject(projectState)}
                    >
                        Delete
                    </button>
                    <button
                        className="px-6 py-2 rounded-md font-bold bg-stone-500 text-stone-50 hover:bg-stone-950"
                        onClick={() => props.saveProject(projectState)}
                    >
                        Save
                    </button>
                </li>
            </menu>
            <div className="mt-5 mb-2">
                <p>{project?.description}</p>
            </div>
            <hr className="border-t-2 border-stone-400" />
            <div className="mt-3">
                <h2 className="text-2xl font-bold text-stone-600">Tasks</h2>
                <div className="flex mt-3">
                    <input className="bg-stone-200 rounded mr-3" value={task} onChange={(e) => { setTask(e.target.value) }} />
                    <button className="bg-stone-400 w-10 rounded text-white" onClick={addTask}>+</button>
                </div>
                {projectState?.tasks?.map((el, index) => {
                    return <Task key={index} task={el} index={index} onRemoveTask={removeTask} />;
                }) ?? <p className="mt-2">The project doesn't have any tasks yet.</p>}

            </div>
        </div>
    );
}
