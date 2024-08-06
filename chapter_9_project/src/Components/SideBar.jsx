import Button from "./Button";

export default function SideBar(props){
  
    return(
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
            <Button onClick={props.onStartAddProject}>+ Add a Project</Button>
            <div>
                <ul  className="mt-8">
                    {props.projects.map((project)=>{
                        let cssClass="w-full text-left px-2 py-1 sounded-sm my-1 text-stone-400 hover:text-stone-200";
                        if(project.id===props.selectedProjectId){
                            cssClass+="bg-stone-800 text-stone-200";
                        }
                        else{
                            cssClass+="text-stone-400"
                        }
                        return(<li key={project.id}>
                            <button className={cssClass}
                            onClick={()=>props.onSelectProject(project.id)}
                            >{project.title}</button>
                        </li>)
                    }
                        
                    )}
                </ul>
            </div>
        </aside>
    );}