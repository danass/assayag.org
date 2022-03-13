import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from "react";
import { Tooltip } from './Tooltip';
import { Global } from './Modules'

export const TweetRender = ({ tweet }) => {
  
  const [result, setResult] = useState("");

  const getUrl = (url) => {
    useEffect(() => {
      Meteor.call('wget', url, (err, res) => {
        if (err) {
          console.log("bug", err);
        } else {
          
          setResult(res)
          console.log( res)
        }
      });
    }, [url]);

  }
  return <div className="asocial-mirror-entry" key={tweet.id}>
    <div className="asocial-source">{tweet.source}</div>
    <div className="asocial-date">{new Date(tweet.date).toString()}</div>
    <div className="asocial-text">{tweet.text}</div>
    <div className="asocial-usernames">{tweet.usernames ? tweet.usernames.map((u, i) => { return <div key={i}>{u}</div> }) : ""}</div>    
    <div className="asocial-url">{tweet.url ? getUrl(tweet.url[0]) : []}</div>
    <div className="asocial-media">{tweet.media ? <img src={tweet.media[0].media_url_https} /> : null}</div>
    {result?<div><a target="_blank" href={result}>open</a></div>:null}
  </div>;
};

export const Asocial = () => {


  useEffect(() => {
    Global({ pageName: "Asocial Networks" })
  }, []);

  const [userOptions, setuserOptions] = useState({
    insta: { clicked: false, size: 0, maxRand: 1, sources: ["http://instagram.com"] },
    twitter: { clicked: true, size: 0, sources: ["https://dev.twitter.com/docs/tfw", "http://twitter.com/download/android", "http://twitter.com", "http://twitter.com/download/iphone", "https://mobile.twitter.com"] },
    google: { clicked: false, size: 0, sources: ["https://www.google.com/"] },
    tumblr: { clicked: false, size: 0, sources: ["https://www.tumblr.com/"] },
    // assayag: { clicked: false, size: 0, sources: ["https://www.assayag.org"] },
    tiktok: { clicked: false, size: 0, sources: ["https://www.tiktok.com/"] }
  });
  const [viewedIds, setviewedIds] = useState([]);
  const [maxRand, setmaxRand] = useState(1);
  const [randomIndex, setrandomIndex] = useState(1)

  const fetchData = async (userOptions, type, v, maxrandv) => {
    // if (v == undefined && randomIndex != undefined) {
    //   console.log(v, "parameter is undefined")
    //   console.log(randomIndex, 'is defined currentval')
    // }
    // if (v != undefined) {
    //   console.log(v, "v is defined")
    //   console.log("but currentval is", randomIndex)
    // }

    Meteor.call('getRandomTweet', userOptions, viewedIds, v ? v : randomIndex, (e, r) => {

      let tweet = r[0] ? r[0] : [] && setrandomIndex(0)
      setmaxRand(r[1] ? r[1] : maxRand)
      setuserOptions(r[2])
      setrandomIndex(v ? v : randomIndex)
      // setviewedIds([...viewedIds, { id: r[0][0]?.id.high * 2 ** 32 + r[0][0]?.id.low }]);
      if (tweet[0] == null) {
        document.querySelector("#main-container-header-navigation input").value = 0
        tweet = [{ text: "(no data more..) Select a source just below!", id: 'no-data-id' }]
        setrandomIndex(0)
      }

      let usernames = tweet[0].text.match(/@[a-zA-Z0-9_]+/g);
      tweet[0].usernames = usernames ? usernames : [];
      tweet[0].text = tweet[0].text.replace(/@[a-zA-Z0-9_]+/g, '');
      let url = tweet[0].text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
      tweet[0].url = url ? url : [];
      setTweet(tweet)

    });
  }

  const createBoxes = (userOptions) => {
    let boxes = [];
    for (const [key, value] of Object.entries(userOptions)) {
      boxes.push(
        <div className="selector-checkbox" key={key}>
          <label className="checkboxlabel">{key}</label><br></br>
          <input type="checkbox" checked={userOptions[key].clicked} onChange={(e) => {
            let newOptions = { ...userOptions };
            newOptions[key].clicked = e.target.checked;
            setuserOptions(newOptions);
            fetchData(newOptions)
          }} />
          <div className="selector-checkbox-info">({userOptions[key].size})</div>
        </div>
      );
    }
    return boxes;
  }

  function handleClick(e) {
    if(e.target.nodeName == 'A' ) {

        console.log("what", e.target.href)
        Meteor.call('wget', e.target.href, (err, res) => {
          if (err) {
            console.log("bug", err);
          } else {
            console.log( res)
          }
        });

      return
    }
    fetchData(userOptions, 'click', Math.floor(Math.random() * maxRand) + 1)
  }

  const handleChange = async (e) => {
    // set e.target.value (input value) as currentIndex
    await fetchData(userOptions, 'change', e.target.value)
  }

  const [tweet, setTweet] = useState([{ text: "data is coming..", id: 666 }])
  useEffect(() => {
    fetchData(userOptions)
  }, [])

  return (
    <div id="main-container">

      <div id="main-container-header">

        <div id="main-container-header-title">
          <h1>Asocial Networks Mirror</h1>
        </div>

        <div className="main-container-block">
          A mirror of my pityful social life through the main platforms, Tiktok, Youtube, Twitter.
        </div>

        <div id="main-container-header-instructions">
          Browse using input box with an <b>id number</b>,<br></br>
          or <b>click on text</b> to retrieve a random entry.
        </div>

      </div>
      <div className="main-container-wrapper">
        
      <div id="main-container-selectors">
      <div id="main-container-header-navigation">
          id: <input type="number" min="0" value={randomIndex} onChange={(e) => handleChange(e)}></input>
        </div>
        {createBoxes(userOptions)}
      </div>
      
      <div id="main-container-content" className="css-greydient" tabIndex={0} onClick={(e) => handleClick(e)} >
                {tweet.map((tweet_) => {
                return (
                  <TweetRender key={tweet_.id} tweet={tweet_} />
                )
              })}
      </div>
      </div>
      <div id="main-container-footer">
        <br></br>
      </div>

      
    </div>

    // <div id="twitter-comment-container">
    //   <h1>Asocial Networks Mirror</h1>
    //     
    //   <div tabIndex={0} onClick={(e) => handleClick(e)}>
    //     <Tooltip uuid="tiktok-comment-container" caption="Save" directCreation={true} clickforsave={true} >
    //       <div id="tiktok-comment-container" >
    //         <h2 className="tiktok-comment">
    //           {tweet.map((tweet_) => {
    //             return (
    //               <TweetRender key={tweet_.id} tweet={tweet_} />
    //             )
    //           })}

    //         </h2>
    //       </div>
    //     </Tooltip>
    //   </div>

    //   <div>
    //     {createBoxes(userOptions)}
    //   </div>

    // </div>
  );
};
