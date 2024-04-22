export default function Task({ task, index, onRemoveTask }) {
    return (
        <div>
            <p className="flex mt-3 font-bold w-2/3 bg-stone-100 p-2 rounded justify-between">
                {task}
                <button className="text-stone-300 hover:text-red-300 hover:underline" onClick={() => onRemoveTask(index)}>Remove</button>
            </p>
        </div>
    );
}
