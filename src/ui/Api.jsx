import React, { useState, useEffect } from 'react';
import { Loading } from '/src/ui/Animations';
import { useSearchParams } from "react-router-dom";
import { WebActivity } from '../api/Collection'
const humanizeDuration = require("humanize-duration");

export const Api = (props) => {
  return (
    <div className="api">
      <h1>API</h1>
      </div>
  )
}

export const Addictions = (props) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [webactivity, setwebactivity] = useState(null)
  const authKeys = ['userId', 'token', 'expires', 'url']
  useEffect(() => {
    const handle = Meteor.subscribe('webactivity');

    setLoading(<Loading />)
    Meteor.call('user.isLogged', ((e, r) => {
      if (e) return console.error(e); setUser(r)
      if (!r) { setLoading('Not Logged') }
    }))
    callwebactivity()
  }, []);


  const callwebactivity = () => {
    Meteor.call('webactivity.save', (e, r) => {
      if (e) return console.error(e); setwebactivity(r);
    })
  }
  useEffect(() => {
    const handle2 = WebActivity.find().observeChanges({
      added: (_id) => {
        callwebactivity()
      }
    })
    return () => {
      handle2.stop();
    }
  }, [])


  if (webactivity) {
    let urls = new Set(webactivity?.map(r => r.url))

    const extractDomain = (url) => {
      let domain = url.split('/')[2].split('.')[1]
      if (domain === 'com') {
        domain = url.split('/')[2].split('.')[0]
      }
      return domain
    }

    let activities = {}
    let sites = ['youtube', 'twitter', 'tinder', 'bumble', 'tiktok', 'okcupid', 'pornhub']

    Array.from(urls).map(url => {
      activities[extractDomain(url)] = {}
      activities[extractDomain(url)].name = extractDomain(url)
      activities[extractDomain(url)].url = url
      activities[extractDomain(url)].visited = urls.has(url)
      activities[extractDomain(url)].visitedCount = webactivity.filter(r => r.url === url).length
      activities[extractDomain(url)].lastVisit = webactivity.filter(r => r.url === url).slice(-1).sort((a, b) => a -b)
      // retrieve the 2nd last visit
      activities[extractDomain(url)].previousVisit = webactivity.filter(r => r.url === url).slice(-2).sort((a, b) => a -b)
      // retrieve the 3rd last visit
      let previousVisit = activities[extractDomain(url)]?.previousVisit;
      let name = activities[extractDomain(url)]?.name;
      // if lastVisit date is less than 15 minutes ago
      if (previousVisit.length > 1 && previousVisit?.[0]?.date && previousVisit?.[0]?.date > Date.now() - 60 * 60 * 1000) {
        activities[extractDomain(url)].addicted = true
        console.log(`${name} is addicted`)
      }
    

    })

    const svgs = {
      youtube: <svg className={`${activities.youtube?.addicted ? "svg" : "svg svg-disabled"}`} viewBox="-3 -7 34 34" ><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"></path><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" ></path></svg>,
      twitter: <svg className={`${activities.twitter?.addicted ? "svg" : "svg svg-disabled"}`} viewBox="-4 -4 30 30" ><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" fill="rgb(29, 155, 240)"></path></svg>,
      tinder: <svg className={`${activities.tinder?.addicted ? "svg" : "svg svg-disabled"}`} viewBox="-3 -3 30 30"><path d="M8.21 10.08c-.02 0-.04 0-.06-.02-.67-.9-.84-2.44-.89-3.03 0-.11-.13-.18-.23-.12C4.93 8.08 3 10.86 3 13.54 3 18.14 6.2 22 11.7 22c5.15 0 8.7-3.98 8.7-8.46 0-5.87-4.2-9.77-7.93-11.53a.13.13 0 0 0-.19.14c.48 3.16-.18 6.6-4.07 7.93z" fill="#ff4458"></path></svg>,
      bumble: <svg className={`${activities.bumble?.addicted ? "svg" : "svg svg-disabled"}`} viewBox="-3 -6 45 45"> <path d="M 36.85 15.23 L 28.75 1.19 C 28.324 0.46 27.545 0.008 26.7 0 L 10.5 0 C 9.646 0.003 8.857 0.46 8.43 1.2 L 0.32 15.22 C -0.107 15.956 -0.107 16.864 0.32 17.6 L 8.42 31.63 C 8.844 32.373 9.634 32.831 10.49 32.83 L 26.69 32.83 C 27.542 32.828 28.328 32.37 28.75 31.63 L 36.85 17.6 C 37.277 16.864 37.277 15.956 36.85 15.22 L 36.85 15.23 Z M 14.05 7.33 L 23.11 7.33 C 24.688 7.33 25.674 9.038 24.885 10.405 C 24.519 11.039 23.842 11.43 23.11 11.43 L 14.04 11.43 C 12.462 11.43 11.476 9.722 12.265 8.355 C 12.631 7.721 13.308 7.33 14.04 7.33 L 14.05 7.33 Z M 21.09 25.57 L 16.06 25.57 C 14.482 25.57 13.496 23.862 14.285 22.495 C 14.651 21.861 15.328 21.47 16.06 21.47 L 21.09 21.47 C 22.668 21.47 23.654 23.178 22.865 24.545 C 22.499 25.179 21.822 25.57 21.09 25.57 Z M 26.79 18.49 L 10.37 18.49 C 8.792 18.49 7.806 16.782 8.595 15.415 C 8.961 14.781 9.638 14.39 10.37 14.39 L 26.79 14.39 C 28.368 14.39 29.354 16.098 28.565 17.465 C 28.199 18.099 27.522 18.49 26.79 18.49 Z" fill="#FFC629"></path></svg>,
      tiktok: <svg className={`${activities.tiktok?.addicted ? "svg" : "svg svg-disabled"}`} viewBox="-4 -6 512 512"><rect rx="15%" height="512" width="512" fill="#f3f3f3" /><defs><path id="t" d="M219 200a117 117 0 1 0 101 115v-128a150 150 0 0 0 88 28v-63a88 88 0 0 1-88-88h-64v252a54 54 0 1 1-37-51z" style={{ "mixBlendMode": "multiply" }} /></defs><use href="#t" fill="#f05" x="18" y="15" /><use fill="#0ee" href="#t" /></svg>,
      okcupid: <svg className={`${activities.okcupid?.addicted ? "svg" : "svg svg-disabled"}`} viewBox="0 0 100 100"><path d="M31.379,79.203C14.221,81.457,5.286,73.295,9.138,55.885c1.483-8.693,8.103-14.692,17.013-16.319     c9.369-1.938,22.191,0.725,23.694,11.884C52.285,64.662,45.454,77.661,31.379,79.203z" /><path d="M77.957,57.547c2.032,3.739,4.106,7.455,6.168,11.178c0.803,1.709,2.493,1.351,4.062,1.221     c1.703-0.195,2.2,0.165,2.522,1.859c1.328,7.51-9.128,7.851-14.249,7.36c-1.794-0.181-2.995-1.389-3.776-2.949     c-2.14-4.274-4.24-8.569-6.356-12.856c-0.434-0.526-0.739-2.297-1.386-2.21c-0.669,4.931-1.365,9.858-1.998,14.793     c-0.381,2.97-0.396,3.071-3.405,3.242c-4.207,0.258-10.162,0.733-9.779-5.161c1.778-16.18,3.975-32.361,6.368-48.462     c0.655-3.504,2.459-4.858,6.01-5.022c1.751-0.145,8.336,0.214,7.848,2.865c-1.306,10.791-3.137,21.486-4.115,32.304     c3.17-4.539,6.39-8.433,9.716-12.759c3.593-4.642,9.446-4.229,13.575-2.819c2.992,1.021,3.799,6.291,1.451,8.384     c-0.207,0.185-0.574,0.25-0.871,0.262c-0.606,0.026-1.225,0.036-1.823-0.05c-2.562-0.367-4.501,0.671-6.031,2.63     c-1.323,1.693-2.636,3.395-3.9,5.132C77.812,56.731,77.808,57.272,77.957,57.547z" /><path  d="M31.775,48.304c-8.674-0.793-10.996,10.454-9.676,17.197c0.332,2.567,1.836,4.516,4.575,4.769     c4.121,0.492,7.394-1.365,9.145-5.486c1.679-3.952,1.953-8.095,1.03-12.274C36.247,49.784,34.551,48.471,31.775,48.304z" /></svg>,
      pornhub: <svg className={`${activities.pornhub?.addicted ? "svg" : "svg svg-disabled"}`} viewBox="97 13 100 35">
      <path d="m184.05 10.15h-72.121c-2.244 0.252-3.478 1.624-3.696 4.128v41.445c0.215 2.501 1.447 3.868 3.676 4.129h72.158c2.23-0.261 3.461-1.629 3.677-4.129v-41.445c-0.217-2.504-1.452-3.876-3.694-4.128" fill="#f7971d"/>
      <path d="m180.44 29.451c-1.224-1.352-2.868-2.22-4.659-2.619-0.513-0.136-1.099-0.233-1.751-0.262-2.368-0.215-5.41 0.732-6.824 1.919l0.343-9.704h-5.759v30.044h5.35v-1.655c1.233 0.993 3.213 2.146 6.229 2.146 0.118 0 0.23-1e-3 0.339-3e-3 0.078 2e-3 0.157 3e-3 0.235 3e-3 2.528 0 4.677-1.004 6.445-3.012 1.769-2.01 2.654-4.87 2.654-8.586 0-3.594-0.868-6.35-2.602-8.271m-4.642 13.691c-0.894 1.086-1.977 1.628-3.248 1.628-1.654 0-2.979-0.765-3.976-2.295-0.71-1.079-1.066-2.745-1.066-5 0-2.186 0.458-3.815 1.373-4.887 0.916-1.072 2.063-1.609 3.443-1.609 1.408 0 2.562 0.55 3.464 1.649 0.901 1.1 1.353 2.894 1.353 5.379 0 2.338-0.448 4.048-1.343 5.135m-23.289-6.897c0 3.115-0.143 5.072-0.43 5.872-0.287 0.799-0.82 1.469-1.599 2.007-0.778 0.541-1.66 0.81-2.643 0.81-0.861 0-1.572-0.201-2.132-0.604s-0.947-0.95-1.158-1.64c-0.212-0.69-0.317-2.564-0.317-5.626v-10h-5.758v13.772c0 2.049 0.259 3.654 0.778 4.816 0.519 1.161 1.359 2.063 2.52 2.705 1.162 0.642 2.473 0.963 3.935 0.963 0.219 0 0.436-8e-3 0.651-0.023 0.01 0 0.011 0 0.017-2e-3 3.665-0.106 5.574-1.768 6.546-2.864v2.397h5.348v-21.764h-5.758zm-18.79-7.049c-0.54-0.764-1.342-1.393-2.407-1.885-0.964-0.445-2.033-0.686-3.209-0.729-0.02-1e-3 -0.038-3e-3 -0.058-4e-3 -2.427-0.129-5.531 0.579-6.98 1.973v-9.766h-5.758v30.043h5.758v-10.901c0-1.831 0.175-3.215 0.523-4.15 0.349-0.937 0.898-1.637 1.65-2.102 0.751-0.463 1.604-0.696 2.562-0.696 0.832 0 1.527 0.181 2.079 0.543 0.553 0.362 0.94 0.851 1.158 1.465 0.218 0.616 0.328 2.063 0.328 4.344v11.497h5.758v-12.767c0-1.953-0.1-3.395-0.298-4.323-0.197-0.931-0.567-1.777-1.106-2.542"/>
      <path fill="#fff"/>
    </svg>
    }

    return (
      <>
        <div className="svg-container" onClick={()=> callwebactivity()}>
          {sites.map(site => {


            return (
              <div className={'activity'} key={site}>
                <div>
                {svgs[site]}
                </div>
                
                <div className='svg-hidden' style={{'backgroundColor': '#fdfdfd'}}>
                
                {activities[site]?.visited?
                <>
                  <div>visited <b>{activities[site]?.visitedCount}</b> times today</div>
                  <div>last visit {activities[site]?.lastVisit.map(a => {
                    return humanizeDuration((new Date(Date.now()) - a.date), {round: true}) 
                    })} ago</div>
                </>
                    :
                    <div>not visited</div>}
                </div>

               
              </div>



            )
          })}
        </div>

      </>

    )
  }

  return (
    <>
      {loading}
    </>
  )

}