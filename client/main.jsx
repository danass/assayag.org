import React from 'react'
import { Meteor } from 'meteor/meteor'
import  {render} from 'react-dom'
import { App } from '/assets/ui/App'
import { Menu } from '/assets/ui/Menu'
import { Rain }  from '/assets/ui/Rain'
import { Asocial } from '../assets/ui/Asocial'
import { Contact } from '../assets/ui/Contact'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const rootElement = document.getElementById('react-target')

export const Handle404 = (props) => {
    let metas = [['errorpage', 'true'], ['errortype', '404 - Not Found'], ['prerender-status-code', '404']]
    
    metas.map((meta) => {
        let metaTag = document.createElement('meta')
        metaTag.setAttribute('name', meta[0])
        metaTag.setAttribute('content', meta[1])
        document.head.appendChild(metaTag)
    })

  return(
    <div>
      <h1>404</h1>
    </div>
  )
}

  render(
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<div ><Menu /><App /></div>} />
      <Route path="/rain" element={<div><Menu /><Rain /></div>} />
      <Route path="/asocial"  element={<div><Menu /><Asocial /></div>} />
      <Route path="/mail"  element={<div><Menu /><Contact /></div>} /> 
      <Route path='*' element={<div><Menu /><Handle404 /></div>}/>
    </Routes>
    </BrowserRouter>, 
    rootElement
  ) 

Meteor.startup(() => {
  // code to run on server at startup
}
);

