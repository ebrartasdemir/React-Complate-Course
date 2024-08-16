import completeImg from "../assets/quiz-complete.png";
import QUESTIONS from '../questions.js'
export default function Summary(props){
    const skippedAnswers=props.userAnswers.filter((answer)=>answer===null);
    const correctAnswer=props.userAnswers.filter(
        (answer,index)=>answer===QUESTIONS[index].answers[0]
    );
    const skippedAnswersShare=Math.round((skippedAnswers.length/props.userAnswers.length)*100);
    const correctAnswersShare=Math.round((correctAnswer.length/props.userAnswers.length)*100);
    const wrongAnswersShare=Math.round(100-correctAnswersShare-skippedAnswersShare);
        
    return <div id="summary">
        <img src={completeImg} alt="Trophy icon" />
        <h2>Quiz Complete</h2>
        <div id="summary-stats">
        <p>
            <span className="number">{skippedAnswersShare}%</span>
            <span className="text">skipped</span>
        </p>
        <p>
            <span className="number">{correctAnswersShare}%</span>
            <span className="answered correctly">correct</span>
        </p>
        <p>
            <span className="number">{wrongAnswersShare}%</span>
            <span className="answered incorrectly">wrong</span>
        </p>
        </div>
        <ol>
            {props.userAnswers.map((answer,index)=>
                {
                    let cssClass='user-answer';
                    if(answer===null){
                        cssClass+=' skipped';
                    }
                    else if(answer===QUESTIONS[index].answers[0]){
                        cssClass+=' correct';
                    }
                    else{
                        cssClass+=' wrong';
                    };
                    return <li key={index}>
                <h3>{index+1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>

                }
            )}
            
        </ol>
    </div>
}