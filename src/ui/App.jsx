import React from 'react'
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom"
import { Home } from '/src/ui/pages/Home'
import { Rain }  from '/src/ui/pages/Rain'
import { Asocial } from '/src/ui/pages/Asocial'
import { Contact } from '/src/ui/pages/Contact'
import { Remind } from '/src/ui/pages/Remind'
import { Membrane } from '/src/ui/Membrane'
import { Terms } from '/src/ui/static/Terms'
import { Privacy } from '/src/ui/static/Privacy'
// import { Fauxprophet } from '/src/ui/pages/Fauxprophet'
import { User } from '/src/ui/User'
import { Rss } from '/src/ui/Rss'
import { Api } from '/src/ui/Api'
import { Blog } from '/src/ui/Blog'
// import { Gps } from '/src/ui/Gps'
import { France } from '/src/ui/France'

 const App = (props, context) => {
  return(
    <Router>
      <Routes>
      <Route path="/" index element={<Membrane><Home /></Membrane>} />
      <Route path="/rain/" element={<Membrane><Rain /></Membrane>} />
      <Route path="/asocial/"  element={<Membrane><Asocial /></Membrane>} />
      <Route path="/remind/" element={<Membrane><Remind /></Membrane>} />
      <Route path="/remind/:username/" element={<Membrane><Remind /></Membrane>} />
      <Route path='/mail/' element={ <Membrane><Contact /></Membrane>  } />
      <Route path="/france/" element={<Membrane><France /></Membrane>} />
      <Route path='/blog/' element={ <Membrane><Blog /></Membrane>  } />
      <Route path='/blog/:id' element={ <Membrane><Blog /></Membrane>  } />
      {/* <Route path='/fauxprophet/' element={ <Membrane><Fauxprophet /></Membrane>  } />
      <Route path='/fauxprophet/:usernameurl/' element={<Membrane><Fauxprophet /></Membrane>  } /> */}
      <Route path='/user/' element={<Membrane ><User /></Membrane>} />
      <Route path='/rss/' element={<Membrane ><Rss /></Membrane>} />
      <Route path='*' element={<Membrane><Handle404 /></Membrane>}/>
      <Route path='/terms-of-use/' element={ <Membrane><Terms /></Membrane>} />
      <Route path='/privacy/' element={<Membrane><Privacy /></Membrane>} />
      <Route path='/api/' component={<Api fuck={"fuck"} />} element={<Api />} />
      {/* <Route path='/gps' element={<Gps />} /> */}
      </Routes>
    </Router>
  ) 
}
export default App

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