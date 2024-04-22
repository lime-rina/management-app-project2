import noProjectImg from "../assets/no-projects.png"
import ButtonAddProject from "./ButtonAddProject"

export default function NoProjectSelected({ ...props }) {

    return <div className="mt-24 text-center w-2/3">
        <img src={noProjectImg} alt="Empty task list" className="w-16 h-16 object-contain mx-auto" />
        <h2 className="text-xl font-bold text-stone-500 my-4">NO PROJECT SELECTED</h2>
        <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
        <p className="mt-8">
            <ButtonAddProject onClick={props.onStartAddProject}>Create new project</ButtonAddProject>
        </p>
    </div>
}