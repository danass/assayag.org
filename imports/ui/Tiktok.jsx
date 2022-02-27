import React, { useState } from 'react';
import * as tiktokdata from './../data/user_data.json';

import { Tooltip } from './Tooltip';
// let tiktokdata = {

//     "Comment": {
//         "Comments": {
//           "CommentsList": [
//             {
//               "Date": "2022-02-01 21:15:42",
//               "Comment": "Merci"
//             },
//             {
//               "Date": "2022-01-24 16:54:45",
//               "Comment": "« Ah non jvais voyager » oui. à la nage"
//             },
//         ]
//         }
//     }
    
// };

export const Tiktok = () => {
    let data = tiktokdata.Comment.Comments.CommentsList;
    const [randomNb, setRandomNb] = useState(Math.floor(Math.random() * data.length - 1));
    const [currentTok, setCurrentTok] = useState(data[randomNb]);
    // create a random number between 0 and data.length -1
    let randNb = Math.floor(Math.random() * data.length - 1);


    const shuffle = () => {
        setRandomNb(Math.floor(Math.random() * data.length))
        setCurrentTok(data[randomNb]);
    }
    
    
    
    function findUrl() {
        let ActivityList = tiktokdata.Activity['Video Browsing History'].VideoList
        let dateOfComment = new Date(currentTok.Date)

        let closestDate = ActivityList.reduce((prev, curr) => {
            return (Math.abs(new Date(curr.Date) - dateOfComment) < Math.abs(new Date(prev.Date) - dateOfComment) ? curr : prev)
        })

        let closestDateIndex = ActivityList.indexOf(closestDate)

        const video = closestDateIndex == ActivityList.length - 1 ? { VideoLink: 'No video' } : closestDate
        const videoUrlprefix = "https://www.tiktok.com/@assayag/video/"
        const id = video ? video.VideoLink.split("/")[5] : closestDate.VideoLink.split("/")[5]
        const url = video ? videoUrlprefix + id + '/' : videoUrlprefix + id + '/'
        return url
    }


    return (
        <div>
            <h1>Tiktok Mirror {randomNb}</h1>
            <Tooltip uuid="tiktok-comment-container" caption="Save" directCreation={true} clickforsave={true} >
                <div id="tiktok-comment-container" onClick={shuffle}>
                    <h2 className="tiktok-comment">{currentTok.Comment}</h2>
                </div>
            </Tooltip>
            {/* <h2 className="tiktok-comment" onClick={shuffle}>{randomtok.Comment}</h2> */}
            {/* <button id="tiktok-save" onClick={saveAs}>save</button> */}
            {/* <a href={findUrl()} target="_blank" rel="noopener noreferrer">open on tiktok</a> */}



        </div>
    )
}