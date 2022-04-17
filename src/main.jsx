import React, {useState, useEffect} from 'react'
import  {render} from 'react-dom'
// import ReactDOM from "react-dom/client";
import { Home } from '/src/ui/pages/Home'
import { Rain }  from '/src/ui/pages/Rain'
import { Asocial } from '/src/ui/pages/Asocial'
import { Contact } from '/src/ui/pages/Contact'
import { Remind } from '/src/ui/pages/Remind'
import { Membrane } from '/src/ui/Membrane'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Terms } from '/src/ui/static/Terms'
import { Privacy } from '/src/ui/static/Privacy'
import { Test } from '/src/ui/Test'
import { User } from '/src/ui/User'

export const App = () => {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<Membrane><Home /></Membrane>} />
      <Route path="/rain" element={<Membrane><Rain /></Membrane>} />
      <Route path="/asocial"  element={<Membrane><Asocial /></Membrane>} />
      <Route path="/remind" element={<Membrane><Remind /></Membrane>} />
      <Route path="/remind/:username" element={<Membrane><Remind /></Membrane>} />
      <Route path='/mail' element={ <Membrane><Contact /></Membrane>  } />
      <Route path='/test' element={ <Membrane><Test /></Membrane>  } />
      <Route path='/user' element={<Membrane ><User /></Membrane>  } />
      <Route path='*' element={ <Membrane><Handle404 /></Membrane> }/>
      <Route path='/terms-of-use' element={ <Membrane><Terms /></Membrane>  } />
      <Route path='/privacy' element={ <Membrane><Privacy /></Membrane>  } />

    </Routes>
    </BrowserRouter>
  ) 
}


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


const rootElement = document.getElementById('membrane')
render(<App />, rootElement);
