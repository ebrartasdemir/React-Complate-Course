import { forwardRef,useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";
const ResultModal=forwardRef(function ResultModal(props,ref){
    const dialog=useRef();
    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })
    const formattedRemainingTime=(props.remainingTime/1000).toFixed(2);
    const userLost=formattedRemainingTime<=0;
    const score=Math.round((1-props.remainingTime/(props.targetTime*1000))*100);
    return createPortal(
        <dialog className="result-modal" ref={dialog} onClose={props.onReset}>
            <h2>  {userLost ? "You Lost" : `Your Score: ${score}`}</h2>
            <p>The target time was<strong> {props.targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={props.onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    )

});
export default ResultModal;