import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from "react";
import { Tooltip } from './Tooltip';

export const TweetRender = ({ tweet }) => {

  const getUrl = (url) => {
    const [result, setResult] = useState("");
    useEffect(() => {
    Meteor.call('wget', url, (err, res) => {
    if (err) {
      console.log("bug", err);
    } else {
      setResult(res)
    }
  });
  }, [url]);

  }
  return <div>
    <div key={tweet.id}>{tweet.text} </div>
    {tweet.media ? <img src={tweet.media[0].media_url_https} /> : null}
    <div className="twitter-usernames">{tweet.usernames ? tweet.usernames.map((u, i) => { return <div key={i}>{u}</div> }) : ""}</div>
    <div className="twitter-source">{tweet.source}</div>
    <div className="twitter-url">{tweet.url? getUrl(tweet.url[0]):[]}</div>

  </div>;
};

export const Asocial = () => {

  const [userOptions, setuserOptions] = useState({ 
    insta: { clicked: false, size: 0, maxRand: 1, sources: ["http://instagram.com"]}, 
    twitter: { clicked: true, size: 0, sources: ["https://dev.twitter.com/docs/tfw", "http://twitter.com/download/android", "http://twitter.com", "http://twitter.com/download/iphone", "https://mobile.twitter.com"]}, 
    google: { clicked: false, size: 0, sources: ["https://www.google.com/"] },
    tumblr: { clicked: false, size: 0, sources: ["https://www.tumblr.com/"]},
    assayag: { clicked: false, size: 0, sources: ["https://www.assayag.org"] },
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
      
      let tweet = r[0]? r[0] : [] && setrandomIndex(0)
      setmaxRand(r[1]?r[1]:maxRand)
      setuserOptions(r[2])
      setrandomIndex(v ? v : randomIndex)
      // setviewedIds([...viewedIds, { id: r[0][0]?.id.high * 2 ** 32 + r[0][0]?.id.low }]);
      if(tweet[0] == null) {
        console.log("error", document.querySelector("#twitter-comment-container input").value  )
        document.querySelector("#twitter-comment-container input").value = 0
        tweet = [{ text: "(no data more..) Select a source just below!" , id: 'no-data-id' }]
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
        <label className="checkboxlabel" key={key}>
          <input type="checkbox" checked={userOptions[key].clicked} onChange={(e) => {
            let newOptions = { ...userOptions };
            newOptions[key].clicked = e.target.checked;
            setuserOptions(newOptions);
            fetchData(newOptions)
          }} />
          {key} ({userOptions[key].size})
        </label>
      );
    }
    return boxes;
  }

  function handleClick(e) {
    fetchData(userOptions, 'click',  Math.floor(Math.random() * maxRand) + 1)
  }

  const handleChange = async (e) => {
    // set e.target.value (input value) as currentIndex
    await fetchData(userOptions, 'change', e.target.value)
  }

  const [tweet, setTweet] = useState([{ text:  "data is coming..", id: 666 }])
  useEffect(() => {
    fetchData(userOptions)
  }, [])

  return (
    <div id="twitter-comment-container">
      <h1>Asocial Networks Mirror</h1>
         Browse here <input type="number"  min="0" value={randomIndex} onChange={(e) => handleChange(e)}></input> 
         <p>or click on grey box for random comment.</p>
      <div tabIndex={0} onClick={(e) => handleClick(e)}>
        <Tooltip uuid="tiktok-comment-container" caption="Save" directCreation={true} clickforsave={true} >
          <div id="tiktok-comment-container" >
            <h2 className="tiktok-comment">
              {tweet.map((tweet_) => {
                return (
                  <TweetRender key={tweet_.id} tweet={tweet_} />
                )
              })}

            </h2>
          </div>
        </Tooltip>
      </div>

      <div>
        {createBoxes(userOptions)}
      </div>
      <div id="salam"></div>
    </div>
  );
};
