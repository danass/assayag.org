import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from "react";
import { Tooltip } from './Tooltip';

export const TweetRender = ({ tweet }) => {
  const [tcourl, settcourl] = useState('');
  const [fetchedData, setfetchedData] = useState("<html>Hello</html>");
  return <div>
    <div key={tweet.id}>{tweet.text} </div>
    {tweet.media ? <img src={tweet.media[0].media_url_https} /> : null}
    <div className="twitter-usernames">{tweet.usernames ? tweet.usernames.map((u, i) => { return <div key={i}>{u}</div> }) : ""}</div>
    <div className="twitter-source">{tweet.source}</div>

  </div>;
};

export const Twitter = () => {

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

  useEffect(() => {
    console.log(randomIndex, 'initialized')
  }, [])

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
        console.log("error", document.querySelector("#twitter-comment-container h1 input").value  )
        // document.querySelector("#twitter-comment-container h1 input").value = 0
        setrandomIndex(0)
        return 
      }
      let usernames = tweet[0].text.match(/@[a-zA-Z0-9_]+/g);
      tweet[0].usernames = usernames ? usernames : [];
      tweet[0].text = tweet[0].text.replace(/@[a-zA-Z0-9_]+/g, '');
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

  const handleKey = (event) => {
    if (event.key === 'Enter' || event.key === 'ArrowLeft') {
      fetchData(userOptions)
    }
  }

  const handleChange = async (e) => {
    await fetchData(userOptions, 'change', e.target.value)
  }

  const [tweet, setTweet] = useState([{ text: "data is coming..", id: { high: 'a' } }])
  useEffect(() => {
    fetchData(userOptions)
  }, [])

  return (
    <div id="twitter-comment-container" onKeyDown={handleKey}>
      <h1>Asocial Networks Mirror</h1>
         Browse here <input type="number" value={randomIndex} onChange={(e) => handleChange(e)}></input> 
         <p>or click on grey box for random comment.</p>
      <div onClick={(e) => handleClick(e)}>
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
