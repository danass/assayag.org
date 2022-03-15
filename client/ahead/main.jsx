import React from 'react'
import { Meteor } from 'meteor/meteor'
import  {render} from 'react-dom'
import { Home } from '/assets/ui/Home'
import { Rain }  from '/assets/ui/Rain'
import { Asocial } from '/assets/ui/Asocial'
import { Contact } from '/assets/ui/Contact'
import { Membrane } from '/assets/ui/Membrane'
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
      <Route path="/" index element={<Membrane><Home /></Membrane>} />
      <Route path="/rain" element={<Membrane><Rain /></Membrane>} />
      <Route path="/asocial"  element={<Membrane><Asocial /></Membrane>} />
      <Route path='/mail' element={ <Membrane><Contact /></Membrane>  } />
      <Route path='*' element={ <Membrane><Handle404 /></Membrane> }/>
      
    </Routes>
    </BrowserRouter>, 
    rootElement
  ) 

Meteor.startup(() => {
  // code to run on server at startup
}
);

