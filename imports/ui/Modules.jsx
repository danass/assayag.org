import React, { useState } from 'react';
import * as tiktokdata from './../data/user_data.json';
import html2canvas from 'html2canvas';
import { ThreeDotText } from './Animations';
import { Tooltip } from './Tooltip';

export const Tiktok = () => {
    let data = tiktokdata.Comment.Comments.CommentsList;
    const [randomNb, setRandomNb] = useState(Math.floor(Math.random() * data.length -1));

    // create a random number between 0 and data.length -1
    let randNb = Math.floor(Math.random() * data.length -1);
    let ActivityList = tiktokdata.Activity['Video Browsing History'].VideoList
    
       const shuffle = () => {
       setRandomNb(Math.floor(Math.random() * data.length))
       }
       
       let randomtok = data[randomNb]
       function findUrl() {
       let dateOfComment = new Date(randomtok.Date) 
       
            let closestDate = ActivityList.reduce((prev, curr) => {
                return (Math.abs(new Date(curr.Date) - dateOfComment) < Math.abs(new Date(prev.Date) - dateOfComment) ? curr : prev)
            })

            let closestDateIndex = ActivityList.indexOf(closestDate)
            
            const video = closestDateIndex == ActivityList.length -1? { VideoLink: 'No video'} : closestDate
            const videoUrlprefix = "https://www.tiktok.com/@assayag/video/"            
            const id = video? video.VideoLink.split("/")[5]: closestDate.VideoLink.split("/")[5]
            const url = video? videoUrlprefix + id + '/': videoUrlprefix + id + '/'
            return url
        }

       const saveAs = (e) => {
        html2canvas(document.querySelector("h2"), {}).then(canvas => {
            canvas.className = "tiktok-img"
            document.body.appendChild(canvas)
        });
    }

        return (
            <div>
                <h1>Tiktok Mirror {randomNb}</h1>
                <Tooltip uuid="tiktok-comment-container" caption="Save" directCreation={true} clickforsave={true} >
                    <div  id="tiktok-comment-container">
                <h2 className="tiktok-comment" onClick={shuffle}>{randomtok.Comment}</h2>
                </div>
              </Tooltip>
                {/* <h2 className="tiktok-comment" onClick={shuffle}>{randomtok.Comment}</h2> */}
                {/* <button id="tiktok-save" onClick={saveAs}>save</button> */}
                {/* <a href={findUrl()} target="_blank" rel="noopener noreferrer">open on tiktok</a> */}


              
            </div>
        )
}

export const Mail = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [accuse, setAccuse] = useState(false);

    const sendmail = () => {
        console.log("iam")
        document.getElementById("mail-button").innerText = "Sending..."
        document.getElementById("mail-button").disabled = true
    Meteor.call("mail", email, message, accuse, (e, r) => {
        if (e) {
            document.getElementById("mail-button").innerText = "Error"
            console.log(e)
          return false;
        } else {
            console.log("ok!")
            document.getElementById("mail-button").disabled = true
            document.getElementById("mail-button").innerText = "Message Sent!"
            return true
        }
      });
    }

    return(
        <div>
            <h1>Mail</h1>
            <div id="mail-form">
            <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} />
            <div id="mail-accuse"> 
            <label htmlFor="accuse">Accuse de reception?</label> <input type="checkbox" id="accuse" onChange={e => setAccuse(e.target.checked)} /> </div>
            <button id="mail-button" onClick={sendmail}>Send</button>
            </div>
        </div>

    )
}

export const Virus = () => {

    return(
        <div>
            <h1>Virus</h1>
        </div>
    )
}