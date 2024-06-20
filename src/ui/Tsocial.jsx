import React, { useState, useEffect } from 'react';
import { Loading } from './Animations';
import { Checkbox }  from '@mui/material';

export const TSocial = (props) => {
const [data, setData] = useState([]);    
const [nbOfTweets, setNbOfTweets] = useState(20);

fetchData = async () => {
    Meteor.call('twitter.find', "daniel", (e, r) => {
        if (r == null) { return }
        setData(r)
    })
}

useEffect(() => {
   
    fetchData()
  }, [props.user])


const Box = ({tweet}) => {

    function clean(str) {
        // remove ": ↩️"
        // search for usernames formatted like this "@username" and remove them from string
        str = str.replace(/@[a-zA-Z0-9_]+/g, '');
        // search for :&ensp; // replace with space
        str = str.replace(/: ↩️/g, '');
        return str.replace(/: /g, '');
    }

    return (
    <div className="tsocial-mirror-entry">
        {props.user ? 
        <div className='t-social-edit'>
          <Checkbox type="checkbox" checked={tweet.visible} onChange={(e)=> {
              Meteor.call("twitter.update", tweet, {visible: !tweet.visible}, (e, r) => {
                  setData(r)
                  })
                  }} />
          <button className='class-button-link' onClick={()=> { 
                Meteor.call('twitter.delete', tweet, null, ((e, r) => { 
                    setData(r)
                }))
          }}>Delete</button>
        </div> : null}
    <div className='asocial-entry-header-container-nomedia'>
    <div className="asocial-date"><time>{new Date(tweet.pubDate._text).toString()}</time></div>
    <div className="tsocial-text" dangerouslySetInnerHTML={{ __html: clean(tweet.description._cdata) }}>
    </div>
    <div className="asocial-link">
        <a href={tweet.link._text}>{tweet.title._cdata}</a>
    </div>
    </div>
  </div>
    )
}    
  

    return (
        <>
            { data.length > 0? data.filter((tweet) => {
                if(!props.user) { return tweet.visible == true}
                    return true
            }).sort((a, b)=> {return new Date(b.pubDate._text) - new Date(a.pubDate._text)}).map((tweet, i) => {return <Box tweet={tweet} key={`${tweet._id}-${i}`}/>}): <Loading />}
            

        </>
    )
} 
