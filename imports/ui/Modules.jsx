import React, { useState } from 'react';


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