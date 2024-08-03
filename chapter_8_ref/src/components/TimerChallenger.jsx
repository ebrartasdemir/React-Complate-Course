import { useRef, useState,useEffect } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenger(props){
    const timer=useRef();
    const modal=useRef();
    const [timeRemaining,setTimeRemaining]=useState(props.time*1000);
    const timerIsActive=timeRemaining>0&&timeRemaining<props.time*1000; 
    useEffect(()=>{if (timeRemaining<=0){
        modal.current.open();
        clearInterval(timer.current);
        modal.current.open();
    }},[timeRemaining]);
    const handleReset=()=>{
        setTimeRemaining(props.time*1000);
    }
    const handleStart=()=>{
        timer.current=setInterval(()=>{
            setTimeRemaining(prevTimeRemaining=> prevTimeRemaining-10);
        },10)
    }
    const handleStop=()=>{
        clearInterval(timer.current);
        modal.current.open();

    };
return (
    <>
    <ResultModal targetTime={props.time} result="lost" ref={modal} remainingTime={timeRemaining} onReset={handleReset}/>
    <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
            {props.time} second{props.time>1?'s':''}
            </p>
        <p>
            <button onClick={timerIsActive?handleStop:handleStart}>{timerIsActive?"Stop":"Start"}</button>
        </p>
        <p className={timerIsActive?"active":undefined}>
            {timerIsActive? "Time is running...":"Timer isn't active"}
        </p>
    </section>
    </>
);

};