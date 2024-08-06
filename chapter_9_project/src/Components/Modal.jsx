import { useImperativeHandle,forwardRef, useRef } from "react";
import { createPortal } from "react-dom"
import Button from "./Button";
const Modal=forwardRef(function Modal(props,ref){
    const dialogRef=useRef();
    useImperativeHandle(ref,()=>{
        return {open(){
            dialogRef.current.showModal();
        }}
    })
    return createPortal(
    <dialog ref={dialogRef} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
        {props.children}
        <form method="dialog" className="mt-4 text-right">
            <Button>{props.buttonInfo}</Button>
        </form>
    </dialog>,
    document.getElementById("modal-root"));
});
export default Modal;