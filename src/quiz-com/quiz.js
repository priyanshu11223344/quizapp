import React, { useRef, useState } from 'react'
import "../quiz-com/quiz.css"
import { data } from '../datas/data'
import Res from './return'
const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [nextb, setNextb] = useState(false);
    let[prevb,setprevb]=useState(false);
    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);
    let option_array=[Option1,Option2,Option3,Option4];
    let [score,setScore]=useState(0);
    let[result,setResult]=useState(false);
    const [answered,setAnswered]=useState(Array(data.length).fill(false));
   
    const check = (e, val) => {
        if (lock === false ) {

            if (question.ans === val) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }
            const updated=[...answered];
            updated[index]=true;
            setAnswered(updated)
            
        }
    }

    const next = () => {
        if(index===data.length-1){
            setResult(true);
            return 0;
        }
        
        if (index < data.length - 1) {
            setIndex(++index );
            setQuestion(data[index]);
            setLock(false);
            setprevb(false);
            option_array.map((item)=>{
                
                    item.current.classList.remove("wrong");
                item.current.classList.remove("correct");
                return null;
                

            })
            
        } else {
            setNextb(true);
            alert("you have reached the end");
            
        }
    }
    const prev = () => {
        if (index > 0) {
            setIndex(--index );
            setQuestion(data[index]);
            
            setLock(false);
            option_array.map((item)=>{
                item.current.classList.remove("wrong");
                item.current.classList.remove("correct");
                return null;

            })
        } else {
           
            alert("Its your first question only")
            setprevb(true);
           
            
        }
    }
    const Reset=()=>{
        setResult(false);
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setAnswered(Array(data.length).fill(false));

    }

    return (
        <div className='container'>
            <h1>QUIZ-APP</h1>
            <hr></hr>
            {result?<><Res score={score} length={data.length} ></Res>
            <div className='btn'><button onClick={Reset}>Reset</button></div>
            </>:<><h2>{index + 1}.{question.question}</h2>
            <ul>
                <li  ref={Option1}  onClick={(e) =>!answered[index] && check(e, 1)} style={answered[index]?{pointerEvents:"none"}:{}} >{question.option1}</li>
                <li  ref={Option2} onClick={(e) => !answered[index] &&check(e, 2) } style={answered[index]?{pointerEvents:"none"}:{}} >{question.option2}</li>
                <li  ref={Option3} onClick={(e) => !answered[index] &&check(e, 3) } style={answered[index]?{pointerEvents:"none"}:{}} >{question.option3}</li>
                <li  ref={Option4} onClick={(e) => !answered[index] &&check(e, 4) } style={answered[index]?{pointerEvents:"none"}:{}} >{question.option4}</li>
            </ul>
            <div className='btn'>
                <button onClick={prev} disabled={prevb}>PREV</button>
                {/* <button>SUBMIT</button> */}
                <button onClick={next} disabled={nextb}>NEXT</button>
            </div>
            <div className='index'>{index + 1} of {data.length} questions</div></>}
            
        </div>
    )
}

export default Quiz
