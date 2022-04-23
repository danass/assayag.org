import React, { useEffect, useState } from 'react';
import { Global } from '../Membrane'
import '../static/twitch'
import Twitch from '../static/twitch';
import { TSocial } from '/src/ui/Tsocial'



export const Home = () => {
  const [rainData, setrainData] = useState(null)
  const globalState = Global({ pageName: "Home", description: "{Home} => Daniel Assayag is an Artist and Project Leader in Education. (2022) {Paris-Casablanca}. [Experimentations, Daily Artivities, Retrospective]." })

  useEffect(() => {
    Meteor.call('rain.save', null, null, null, ((e, r) => {
      if(e) return
      setrainData(r)
    }))
  }, [])

  useEffect(() => {
    // let player = new Twitch.Player("twitch-embed", {
    //   channel: "danassadon",
    //   width: "50%",
    //   height: "400px"
    // });
    // player.addEventListener(Twitch.Player.READY, initiate)

    function initiate() {
      player.addEventListener(Twitch.Player.ONLINE, handleOnline);
      player.addEventListener(Twitch.Player.OFFLINE, handleOffline);
      player.removeEventListener(Twitch.Player.READY, initiate);
    }
    function handleOnline() {
      document.getElementById("twitch").classList.remove('hide-twitch');
      player.removeEventListener(Twitch.Player.ONLINE, handleOnline);
      player.addEventListener(Twitch.Player.OFFLINE, handleOffline);
      // player.setMuted(false);
    }

    function handleOffline() {
      document.getElementById("twitch").classList.add('hide-twitch');
      player.removeEventListener(Twitch.Player.OFFLINE, handleOffline);
      player.addEventListener(Twitch.Player.ONLINE, handleOnline);
      // player.setMuted(true);
    }

  }, [])


  return (
    <div id="main-container">

      <div id="main-container-header">
        <div id="main-container-header-title">
          <h1>Home</h1>
        </div>
        <div  id="main-container-header-instructions" >
            <ul>Welcome, salam, bonjour.
            </ul><ul>Que la ptite souris soit avec vous.
            </ul>
          </div>

      </div>

      <section  className={"p-5 flex items-center flex-col main-container-content p-1 "} >
        {rainData?.map((r, i) => {
          return (
            <div key={i} className={"p-2"}>
              <img src={r.canvas} />
            </div>
          )
        })}
      </section>

      <section className={"main-container-content"}>
      <TSocial />
      </section>



      {/* <section id="twitch" className="main-container-content">
        <div id="twitch-embed"></div> 
      </section> */}
   
   
    </div>

  )
}

