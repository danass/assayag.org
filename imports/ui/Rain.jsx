import React, { useState } from 'react';
import  { TaskForm } from '/imports/ui/TaskForm';

export const Rain = () => {
    
const [currentDiv, setDiv] = useState(document.body.children[1])

const handleSubmit = (e) => {
const {body} = document

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.width = document.body.children[1].clientWidth
canvas.height = document.body.children[1].clientHeight
const tempImg = document.createElement('img')
tempImg.addEventListener('load', onTempImageLoad)
setDiv(document.body.children[1])
tempImg.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + document.body.children[0].clientWidth +  '" height="'+ document.body.children[1].clientHeight+'">  <style>#rainfall { padding: 30px; background: aquamarine; width: fit-content;} </style><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">' + currentDiv.innerHTML + ' </div></foreignObject></svg>')
const targetImg = document.createElement('img') 
body.appendChild(targetImg)

e.preventDefault();

function onTempImageLoad(e){
    setDiv(document.body.children[1])
    ctx.drawImage(e.target, 0, 0)
    targetImg.src = canvas.toDataURL()
  }

}

    return (
        <div>
        <form onSubmit={ handleSubmit } className="tas-form">

        <button type="submit">generate image</button>
        </form>
            <TaskForm />
        </div>
    )
    
}