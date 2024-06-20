
// React 
import React, { useState, useEffect, useContext } from "react"
import { UserContext } from './userContext';


export const Gps = () => {
  const [gps, setGps] = useState([])

  function getgps() {
    navigator.geolocation.getCurrentPosition((position) => {
      setGps([position.coords.latitude, position.coords.longitude])
      console.log(position.coords.latitude, position.coords.longitude);
    });
    }

  useEffect(() => {
    getgps()
  }, [])


 

  return (
    <main>
      hello: {gps}
    </main>
  )
}
