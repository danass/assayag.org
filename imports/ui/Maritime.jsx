import React, { useState } from 'react';

export const Maritime = () => {

    
    const [maritime, setMaritime] = useState('')

window.onload = function(e) {
    Meteor.call('maritime', (err, res) => {
      setMaritime(res)
     })
}

if(maritime.maritime) {
    if(maritime.maritime.includes('suspendues')) {
    document.body.classList.add('background-no')
}

}
if(maritime.date == undefined) {

  return (
    <div className="loading-snippet">
            <div className="loading-text">Loading...</div>
           <div className="dot-spin"></div>
      </div>
 )
}

    return (
        <div style={{padding: "2vw"}}>
    <div>Information en date du {maritime.date}</div>
    <h1 style={{ fontSize: "2vw" }}>{maritime.maritime}</h1>
    <h1 style={{ fontSize: "2vw" }}>{maritime.terrestre}</h1>
        

    </div>
    )

}
