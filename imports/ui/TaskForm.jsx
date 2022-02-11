import React, { useState } from 'react';
import { TasksCollection } from '../api/Collection';
import { TaskRender } from './TaskRender';
import  {render} from "react-dom";
import { Uuid } from './Uuid';
import html2canvas from 'html2canvas';


pluie = []
export const TaskForm = () => {

    function tooltip(e) {
       if (!document.getElementsByClassName("rain-tooltip")[0]) {
        let tooltipBox = document.createElement("div")
        tooltipBox.classList.add("rain-tooltip")
        tooltipBox.innerHTML = "Create image click!"
        tooltipBox.style.top = e.clientY + "px"
        tooltipBox.style.left = e.clientX + "px"
        document.querySelector("#rainfall").parentElement.insertBefore(tooltipBox, document.querySelector("#rainfall"))
    }
    tooltipBox = document.getElementsByClassName("rain-tooltip")[0]
    tooltipBox.style.top = e.clientY + "px"
    tooltipBox.style.left = e.clientX + "px"
}
    function goodbye(e) {
        if (document.getElementsByClassName("rain-tooltip")[0]) {
        if (document.querySelectorAll('.rain-tooltip')) {
            document.querySelectorAll('.rain-tooltip').forEach(function (el) {
                el.remove();
            });

        }
    }
}

    const [text, setText] = useState('');
    
    const formula = (e) => {
        html2canvas(document.querySelector("#rainfall"), {}).then(canvas => {
            canvas.className = "rain-img"
            document.body.appendChild(canvas)
        });
    }
    
    const [color, setColor] = useState(['#7fffd4', '#000000']);

    const ColorPicker = (e) => {

        return (
            <div className="rain-pickers">
          <input type="color" value={color[0]} onChange={e => {
              document.getElementById('rainfall').style.backgroundColor = e.target.value;
          }} />
          <input type="color" value={color[1]} onChange={e => {
            document.getElementById('rainfall').style.color = e.target.value;
        }} />
        </div>
        );
      }


    return (
        <div>

        <ColorPicker />
        <input 
            type="text" 
            placeholder="Make it rain" 
            value={text}
            onChange={ e => 
                { 
                    pluie.push({_id: Uuid(), text: e.target.value})
                    rain = pluie.map((drop) =>  <TaskRender key={drop._id} task={drop} />)
                    render(
                    <div id="rainfall" onMouseOut={goodbye} onMouseEnter={tooltip} onClick={formula}>{rain}</div>
              
               , document.getElementById('react-realtime'))    
                    setText(e.target.value)

                }
            }
        />

 
        </div>
    );
}