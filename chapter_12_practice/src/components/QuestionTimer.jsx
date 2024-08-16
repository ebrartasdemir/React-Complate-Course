import { useEffect, useState } from "react";
export default function QuestionTimer(props) {
  const [remainingTime, setRemaingTime] = useState(props.timeOut);

  useEffect(() => {
    console.log("Setting TimeOut");
    const timer = setTimeout(props.onTimeOut, props.timeOut);
    return () => clearTimeout(timer);
  }, [props.onTimeOut, props.timeOut]);

  useEffect(() => {
    console.log("Setting interval");
    const interval = setInterval(() => {
      setRemaingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" max={props.timeOut} value={remainingTime} className={props.mode} />
  );
}
