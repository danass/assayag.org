import React, { useState } from 'react';
import { TasksCollection } from '../api/Collection';
import { TaskRender } from './TaskRender';
import  {render} from "react-dom";
import { Uuid } from './Uuid';
import html2canvas from 'html2canvas';

pluie = []
export const TaskForm = () => {
    const [text, setText] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    
    const formula = (e) => {
        html2canvas(document.querySelector("#rainfall"), {}).then(canvas => {
            canvas.className = "rain-img"
            document.body.appendChild(canvas)
        });
    }

    return (
        <div>
        
        <input 
            type="text" 
            placeholder="Make it rain" 
            value={text}
            onChange={ e => 
                { 
                    pluie.push({_id: Uuid(), text: e.target.value})
                    rain = pluie.map((drop) =>  <TaskRender key={drop._id} task={drop} />)
                    render(<div id="rainfall" onClick={formula}>{rain}</div> , document.getElementById('react-realtime'))    
                    setText(e.target.value)

                }
            }
        />

 
        </div>
    );
}