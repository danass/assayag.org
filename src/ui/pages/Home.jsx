import React, { useEffect } from 'react';
import { Global } from '../Membrane'
import '../static/twitch'
import Twitch from '../static/twitch';
import { TSocial } from '/src/ui/Tsocial'



export const Home = () => {
  const globalState = Global({ pageName: "Home", description: "{Home} => Daniel Assayag is an Artist and Project Leader in Education. (2022) {Paris-Casablanca}. [Experimentations, Daily Artivities, Retrospective]." })

  useEffect(() => {
    let player = new Twitch.Player("twitch-embed", {
      channel: "danassadon",
      width: "50%",
      height: "400px"
    });
    player.addEventListener(Twitch.Player.READY, initiate)

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

      <section className={"main-container-content"}>
      <TSocial />
      </section>

      <section id="twitch" className="main-container-content">
  
        Twitch
        <div id="twitch-embed"></div>
      </section>
   
   
    </div>

  )
}

