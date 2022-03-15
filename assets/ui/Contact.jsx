
import React, { useState, useEffect } from 'react';
import { Global } from './Modules';
import { Footer } from './Footer';

export const Contact = () => {

    Global({ pageName: "Contact form", description: "{Contact} () => Contact me! (2022) {Paris-Casablanca}. [Experimentations, Daily Artivities, Retrospective]. )} " })

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [accuse, setAccuse] = useState(false);

  const sendmail = () => {
    document.getElementById("mail-button").innerText = "Sending..."
    document.getElementById("mail-button").disabled = true
    Meteor.call("mail", email, message, accuse, (e, r) => {
      if (e) {
        document.getElementById("mail-button").innerText = "Error"
        return false;
      } else {
        document.getElementById("mail-button").disabled = true
        document.getElementById("mail-button").innerText = "Message Sent!"
        return true
      }
    });
  }

  return (

    <div id="main-container">

      <div id="main-container-header">
        <div id="main-container-header-title">
          <h1>Contact form</h1>
        </div>
        <div id="main-container-header-instructions">
          <ul>Welcome to my contact page.</ul>
        </div>

      </div>
      <div id="main-container-form">

        <div id="mail-form">
          <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} />
          <textarea placeholder="Message.." value={message} onChange={e => setMessage(e.target.value)} />
          <div id="mail-accuse">
            <label htmlFor="accuse">Send yourself a copy</ label> <input type="checkbox" id="accuse" onChange={e => setAccuse(e.target.checked)} /> </div>
          <button id="mail-button" onClick={sendmail}>Send</button>
        </div>
      </div>
      <Footer />
    </div>

  )
}