import ButtonAddProject from "./ButtonAddProject";
import { textPipe } from "../utils/pipes";
export default function ProjectsSidebar({ ...props }) {
    const openProject = () => {
    }
    return <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
        <div>
            <ButtonAddProject onClick={props.onStartAddProject}>+ Add Project</ButtonAddProject>
        </div>

        <ul className="mt-8">
            {props?.projects?.map((project) => {
                return <li key={project.id} className="mt-2 bg-stone-400 p-2 rounded text-sm uppercase font-bold cursor-pointer w-2/3" onClick={openProject}>
                    {textPipe(project.title)}
                </li>
            })}
        </ul>
    </aside>
}