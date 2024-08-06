import { useState } from "react"

export default function NewTask(props){
    const [enteredTask,setEnteredTask]=useState('');

    const handleChange=(event)=>{
        setEnteredTask(event.target.value);
    }
    const handleClick=()=>{
        if(enteredTask.trim()===""){
            return;
        }
        props.onAddTask(enteredTask);
        setEnteredTask('');
    }
    
    return(
        <div className="flex items-center gap-4">
            <input  value={enteredTask} onChange={handleChange} type="text" className="q-64 px-2 py-1 rounded-sm bg-stone-200"></input>
            <button onClick={handleClick} className="text-stone-700 hover:textstone-950">Add Task</button>
        </div>
    )
}