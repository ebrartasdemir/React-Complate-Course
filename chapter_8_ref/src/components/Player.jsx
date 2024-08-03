import { useState } from "react";

export default function Player() {
  const [userName,setUserName]=useState("unknown entity");
  const [submitted, setSubmitted]=useState(false);
  const handleNameChange=(event)=>{
    setSubmitted(false);
    setUserName(event.target.value);
  }
  const handleClick=()=>{
    setSubmitted(true);
  }
  return (
    <section id="player">
      <h2>Welcome {submitted? userName: "unknown entity"}</h2>
      <p>
        <input onChange={handleNameChange} type="text"  />
        <button onClick={handleClick} >Set Name</button>
      </p>
    </section>
  );
}
