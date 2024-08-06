import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject(props){
    const titleRef=useRef();
    const descpriptionRef=useRef();
    const dueDateRef=useRef();
    const modalRef=useRef();

    const handleSave=()=>{
        const newData={title:titleRef.current.value,
            description:descpriptionRef.current.value,
            dueDate:dueDateRef.current.value};
            if(newData.title.trim()===""|| newData.description.trim()===""||newData.dueDate.trim()===""){
                modalRef.current.open()
                return;
            }
        props.onAdd({
            ...newData
            });
    };
   

    return(
        <>
        <Modal ref={modalRef} buttonInfo="Close" >
            <h2 className='text-xl font-bold text-stone-500 my-4'>Invalid Input</h2>
            <p className="text-stone-400 mb-4">Opps..</p>
            <p className="text-stone-400 mb-4">Please make sure to put valid value for every input field. </p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button className="text-stone-800 hover:text-stone-950 " onClick={props.onCancel}>Cancel</button></li>
                <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover-stone-950">Save</button></li>
            </menu>
            <div>
            <Input type="text" ref={titleRef} label="Title" />
            <Input ref={descpriptionRef} label="Description" isTextArea/>
            <Input type="date" ref={dueDateRef} label="Due Date" /> 
            </div>
        </div>
        </>
    );
}