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
    const [currentDiv, setDiv] = useState(document.body.children[1])
    const formula = (e) => {
        

        const {body} = document
        const raindiv = document.getElementById('rainfall')
        
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = raindiv.clientWidth
        canvas.height =raindiv.clientHeight
        const tempImg = document.createElement('img')
        tempImg.addEventListener('load', onTempImageLoad)
        setDiv(raindiv)
        tempImg.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + raindiv.clientWidth +  '" height="'+ raindiv.clientHeight+'">  <style>#rainfall { padding: 30px; background: aquamarine; width: fit-content;} </style><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">' + currentDiv.innerHTML + ' </div></foreignObject></svg>')
        const targetImg = document.createElement('img') 
        body.appendChild(targetImg)
        
        e.preventDefault();
        
        function onTempImageLoad(e){
            setDiv(raindiv)
            ctx.drawImage(e.target, 0, 0)
            targetImg.src = canvas.toDataURL()
          }

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
                    render(<div id="rainfall" onClick={formula}>{rain}</div> , document.getElementById('react-realtime'))    
                    setText(e.target.value) 
                }
            }
        />
        <button type="submit">+</button>
        </form>
        </div>
    );
}