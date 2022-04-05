import React, { useState, useEffect } from 'react';
var convert = require('xml-js');

export const Box = ({tweet}) => {

    function clean(str) {
        // remove ": ↩️"

        return str.replace(/: ↩️/g, '');
    }

    
    return (
    <div className="tsocial-mirror-entry">
    <div className='asocial-entry-header-container-nomedia'>
    {/* <div className="asocial-source">{tweet.source}</div> */}
    <div className="asocial-date">{new Date(tweet.pubDate._text).toString()}</div>
    <div className="tsocial-text" dangerouslySetInnerHTML={{ __html: clean(tweet.description._cdata) }}>
    </div>
    <div className="asocial-link">
        <a href={tweet.link._text}>{tweet.title._cdata}</a>
    </div>
    </div>
  </div>
    )
}
export const TSocial = () => {
const [data, setData] = useState([]);    

    useEffect(() => {
        const url = `https://rsshub.app/twitter/user/danielassayag/readable=1%26authorNameBold=1%26showAuthorInTitle=1%26showAuthorInDesc=1%26showQuotedAuthorAvatarInDesc=1%26showAuthorAvatarInDesc=1%26showEmojiForRetweetAndReply=1%26showRetweetTextInTitle=0%26addLinkForPics=1%26showTimestampInDescription=1%26showQuotedInTitle=1%26heightOfPics=150`  
        Meteor.call('fetch', url, (e, r) => { 
            if(e) {
            } else {
               
                var res = JSON.parse(convert.xml2json(r, {compact: true, spaces: 4}));
                setData(res.rss.channel.item)
            }
        })

    }, []);

    const [nbOfTweets, setNbOfTweets] = useState(3);


    return (
        <div>
            
            {/* display the tweets */}
            
            {data? data.slice(0, nbOfTweets).map((tweet, i) => {
                return <Box tweet={tweet} key={i}/>
            }
            ) : "Loading "}
            <input type="number" min={1} max={20} defaultValue={3} onChange={(e) => {
                setNbOfTweets(e.target.value)
            }}/>
        </div>
    )
}
