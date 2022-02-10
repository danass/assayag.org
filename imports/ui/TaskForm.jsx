import React, { useState } from 'react';
import { TasksCollection } from '../api/Collection';
import { TaskRender } from './TaskRender';
import  {render} from "react-dom";
import { Uuid } from './Uuid';

pluie = []
export const TaskForm = () => {
    const [text, setText] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) return;
        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date()
        })
        setText('');
    }


    return (
        <div>
        <form onSubmit={handleSubmit} className="task-form">
        <input 
            type="text" 
            placeholder="Make it rain" 
            value={text}
            onChange={ e => 
                { 
                    pluie.push({_id: Uuid(), text: e.target.value})
                    rain = pluie.map((drop) =>  <TaskRender key={drop._id} task={drop} />)
                    render(<div id="rainfall">{rain}</div> , document.getElementById('react-realtime'))    
                    setText(e.target.value) 
                }
            }
        />
        <button type="submit">+</button>
        </form>
        </div>
    );
}