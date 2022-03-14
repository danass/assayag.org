import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from "react";
import { Global } from './Modules'
import { Loading } from './Animations';


export const TweetRender = ({ tweet, i }) => {

  const [result, setResult] = useState("");
  const [caption, setCaption] = useState("")
  const [wgetResult, setwgetResult] = useState([]);

  const getUrl = (url) => {
      setResult("not")
      if(tweet.source === "https://www.tumblr.com/"){
      setResult(undefined)
      setCaption(undefined)
      Meteor.call('wget', url, (err, res) => {
        if (err) {
          console.log("bug", err);
        } else {
          
          Meteor.call('wget', res, 1, (err2, res2) => {
            if (err) {
              console.log("bug", err);
            } else {
              
              if(res2) {
              let tumblrImg = res2.split("<div class=\"wide\">")[1]?res2.split("<div class=\"wide\">")[1]:"</div>";
              tumblrImg = tumblrImg.split("</div>")[0];
              tumblrImg = tumblrImg.split("<img src=\"")[1]?tumblrImg.split("<img src=\"")[1]:"";
              tumblrImg = tumblrImg.split("\"")[0];
              setResult(tumblrImg)

              let tumblrCaption = res2.split("<div class=\"caption\">")[1]?res2.split("<div class=\"caption\">")[1]:"</div>";
              tumblrCaption = tumblrCaption.split("</div>")[0];
              setCaption(tumblrCaption)
            }
            else {
              setResult("notumblr")
              
              Meteor.call('removeTweet', tweet.text, (err, res) => {
                if (err) {
                  console.log("bug", err);
                  } else {
                    console.log("removed", tweet.text);
                  }
                })
            }
            }
          });
  
        }
      });
    }

  }

  function parseText() {
  
    if (tweet.source == "https://www.tumblr.com/") {
      // remove "Photo :" from the text
      let checkersList = ["Photo : ", "Photo: ", "Diaporama : "]
      return checkersList.map(checker => {
        if (tweet.text.match(checker)) {
          let text = tweet.text.split(checker)[1]
          // link from the text if text match tweet.url
          if (text.match(tweet.url)) {
            text = text.split(tweet.url)[0];
          } 
          return <div className="asocial-text">{text}</div>
          }
      })
    }
    return <div className="asocial-text">{tweet.text}</div>
  }

  return <div className="asocial-mirror-entry">
    <div className="asocial-source">{tweet.source}</div>
    <div className="asocial-date">{new Date(tweet.date).toString()}</div>
    {parseText()}
    <div className="asocial-usernames">{tweet.usernames ? tweet.usernames.map((u, i) => { return <div key={i + u}>{u}</div> }) : ""}</div>    
    {useEffect(() => {
       if(tweet.url){
        setwgetResult(...wgetResult, getUrl(tweet.url[tweet.url.length - 1]))
       }
       

       }, [])}
   
    <div className="asocial-url">{tweet.url ?  wgetResult : []}</div>
    <div className="asocial-media">{tweet.media ? <img src={tweet.media[0].media_url_https} /> : null}</div>
    {result == undefined?<Loading props={{ init: "Fetching Tumblr"}} />:result == "notumblr"?<div>no tumblr data</div>:result =="not"? null:<div className="asocial-image"><img src={result} /></div>}
    {caption?<div className="asocial-caption" dangerouslySetInnerHTML={{ __html: caption }}></div>:null}
  </div>;
};

export const Asocial = () => {

  useEffect(() => {
    Global({ pageName: "Asocial Networks" })
  }, []);

  const [userOptions, setuserOptions] = useState({
    params: { maxRand: 1, listSize: 1 },
    insta: { clicked: false, size: 0, maxRand: 1, sources: ["http://instagram.com"] },
    twitter: { clicked: true, size: 0, sources: ["https://dev.twitter.com/docs/tfw", "http://twitter.com/download/android", "http://twitter.com", "http://twitter.com/download/iphone", "https://mobile.twitter.com"] },
    google: { clicked: false, size: 0, sources: ["https://www.google.com/"] },
    tumblr: { clicked: true, size: 0, sources: ["https://www.tumblr.com/"] },
    // assayag: { clicked: false, size: 0, sources: ["https://www.assayag.org"] },
    tiktok: { clicked: false, size: 0, sources: ["https://www.tiktok.com/"] },
    others: { clicked: false, size: 0, sources: ["http://www.linkedin.com/", "http://publicize.wp.com/", "http://www.buildagadget.com/Product.php?Code=Twitter", "https://www.assayag.org", "http://www.behance.net"] }
  });
  const [viewedIds, setviewedIds] = useState([]);
  const [maxRand, setmaxRand] = useState(1);
  const [randomIndex, setrandomIndex] = useState(1)

  const fetchData = async (userOptions, type, v, maxrandv) => {

    Meteor.call('getRandomTweet', userOptions, viewedIds, v ? v : randomIndex, (e, r) => {
      let tweets  = r[0][0] ? r[0][0] : [] && setrandomIndex(0)
      setmaxRand(r[1] ? r[1] : maxRand)
      setuserOptions(r[2])
      setrandomIndex(v ? v : randomIndex)
      // setviewedIds([...viewedIds, { id: r[0][0]?.id.high * 2 ** 32 + r[0][0]?.id.low }]);
      if (tweets[0] == null) {
        document.querySelector("#main-container-header-navigation input").value = 0
        tweets = [{ text: "(no data more..) Select a source just below!", id: 'no-data-id' }]
        setrandomIndex(0)
      }

      tweets.map((tweet, i) => {
        
      let usernames = tweet.text.match(/@[a-zA-Z0-9_]+/g);
      tweets[i].usernames = usernames ? usernames : [];
      tweets[i].text = tweet.text.replace(/@[a-zA-Z0-9_]+/g, '');
      let url = tweet.text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
      tweets[i].url = url ? url : [];
      console.log(i, tweets)
      })
      
      setTweet(tweets)

    });
  }

  const createBoxes = (userOptions) => {
    let boxes = [];
    for (const [key, value] of Object.entries(userOptions)) {
     if(key != "params"){
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
    
  }
    return boxes;
  }

  function handleClick(e) {
    if(e.target.nodeName  == 'A' ) {
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
          A mirror of my pityful social life through the main platforms, Tiktok, Youtube, Twitter.<br></br>
          A navigator through archives of the social media.
        </div>

        <div id="main-container-header-instructions">
          Browse using input box with an <b>id number</b>,<br></br>
          or <b>click on main box</b> to shuffle and get a new random entry.
        </div>

      </div>
      <div className="main-container-wrapper">
        
      <div id="main-container-selectors">
      <div id="main-container-header-navigation">
          id: <input className="main-container-header-navigation-input" tabIndex={1} type="number" min="0" value={randomIndex} onChange={(e) => handleChange(e)}></input>
      </div>
        {createBoxes(userOptions)}
       
          <p>wesh<input className="main-container-header-navigation-input" type="number" min="1" max="10" value={userOptions.params.listSize} onChange={(e) => { setuserOptions({ ...userOptions, params: { ...userOptions.params, listSize: e.target.value } }) }}></input>
          </p>
      </div>
      
      <div id="main-container-content" className="css-greydient" tabIndex={0} onClick={(e) => handleClick(e)} >
                {tweet.map((tweet_, i) => {
                return (
                  <TweetRender key={tweet_.date + i} tweet={tweet_} />
                )
              })}
      </div>
      </div>
      <div id="main-container-footer">
        <br></br>
      </div>

      
    </div>
    //     <Tooltip uuid="tiktok-comment-container" caption="Save" directCreation={true} clickforsave={true} >

  );
};
