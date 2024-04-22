import { useState } from "react";
import Input from "./Input";
import ErrorToaster from "./ErrorToaster";

const ID_generation = () => { return Math.floor(Math.random() * 100) + 1 }

export default function NewProject({ ...props }) {
    const [formData, setFormData] = useState({ title: "", description: "", dueDate: "", id: ID_generation(), tasks: [] })
    const [error, setError] = useState(false);

    const handleFormData = (e) => {
        const key = e.target.name,
            value = e.target.value,
            updatedFormData = { ...formData }

        updatedFormData[key] = value
        setFormData(updatedFormData)
    }

    const handleSave = () => {
        const hasEmptyData = Object.values(formData).some((data) => data === "");
        if (hasEmptyData) {
            setError(true);
        } else {
            setError(false);
            props.addProject(formData)
            handleReset()
        }
    }
    const handleCancel = () => {
        setFormData((prev) => { return { ...prev, title: "", description: "", dueDate: "", tasks: [] } })
    }

    const handleReset = () => {
        setFormData({ title: "", description: "", dueDate: "", id: ID_generation(), tasks: [] })
    }

    return <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4">
            <li><button className="text-stone-800 font-bold hover:text-stone-950 hover:underline" onClick={handleCancel}>Cancel</button></li>
            <li>
                <button
                    className="px-6 py-2 rounded-md bg-stone-500 font-bold text-stone-50 hover:bg-stone-950"
                    onClick={handleSave}
                >
                    Save
                </button>
            </li>
        </menu>
        <div>
            <Input label="Title" name="title" value={formData.title} onChange={(e) => handleFormData(e)} />
            <Input label="Description" name="description" textarea value={formData.description} onChange={(e) => handleFormData(e)} />
            <Input label="Due date" name="dueDate" type="date" value={formData.dueDate} onChange={(e) => handleFormData(e)} />
        </div>
        <ErrorToaster message="Be sure to have a valid input on all fields!" isVisible={error} onCloseEvent={() => setError(false)} />

    </div>
}