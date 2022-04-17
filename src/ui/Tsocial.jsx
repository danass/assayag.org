import React, { useState, useEffect } from 'react';
import { Loading } from './Animations';

var convert = require('xml-js');

export const Box = ({tweet}) => {

    function clean(str) {
        // remove ": ↩️"
        // search for usernames formatted like this "@username" and remove them from string
        str = str.replace(/@[a-zA-Z0-9_]+/g, '');
        // search for :&ensp;
        // replace with space
        str = str.replace(/: ↩️/g, '');

        return str.replace(/: /g, '');
    }

    
    return (
    <div className="tsocial-mirror-entry">
    <div className='asocial-entry-header-container-nomedia'>
    {/* <div className="asocial-source">{tweet.source}</div> */}
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
        <>
            {data.length > 0? data.slice(0, nbOfTweets).map((tweet, i) => {
                return <Box tweet={tweet} key={i}/>
            }
            ) : <Loading />}
            <button onClick={() => {
                  setNbOfTweets(nbOfTweets + 3)
            }}>Load more</button>

        </>
    )
}
