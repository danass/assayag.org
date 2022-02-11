import React, { useState } from 'react';
import * as tiktokdata from './../data/user_data.json';
import html2canvas from 'html2canvas';

export const Tiktok = () => {
    let data = tiktokdata.Comment.Comments.CommentsList;
    const [randomNb, setRandomNb] = useState(Math.floor(Math.random() * data.length));
   
       const shuffle = () => {
       setRandomNb(Math.floor(Math.random() * data.length))
       }
       let randomtok = data[randomNb].Comment

       const formula = (e) => {
        html2canvas(document.querySelector("h2"), {}).then(canvas => {
            canvas.className = "tiktok-img"
            document.body.appendChild(canvas)
        });
    }

        return (
            <div>
                <h1>Tiktok Mirror</h1>
                <h2 className="tiktok-comment" onClick={shuffle}>{randomtok}</h2>
                <button id="tiktok-save" onClick={formula}>save</button>
            </div>
        )
}