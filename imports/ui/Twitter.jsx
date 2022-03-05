import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection, TwitterCollection } from '../api/Collection.js';
import { Tooltip } from './Tooltip';

export const TweetRender = ({ tweet }) => {

  return <div>

    {tweet.text.split(' ').map((word, index) => {
      if (word.includes('http')) {
        return <a href={word} target="_blank" key={index}>{word}</a>
      }
      else {
        return <span key={index}>{word} </span>
      }
    })}





    {tweet.media ? <img src={tweet.media[0].media_url_https} /> : null}
    <div className="twitter-usernames">{tweet.usernames ? tweet.usernames.map((u, i) => { return <div key={i}>{u}</div> }) : ""}</div>
    <div className="twitter-source">{tweet.source}</div>
  </div>;
};

export const Twitter = () => {

  const [userOptions, setuserOptions] = useState({ insta: true, twitter: true, youtube: true, google: true, tumblr: true, assayag: true });
  const [viewedIds, setviewedIds] = useState([]);
  const fetchData = (userOptions) => {
    Meteor.call('getRandomTweet', userOptions, viewedIds, (e, r) => {
      setviewedIds([...viewedIds, r[0].id.high]);
      console.log(r[0], r[0].source, r[0].id.high)
      let tweet = r;
      let usernames = tweet[0].text.match(/@[a-zA-Z0-9_]+/g);
      tweet[0].usernames = usernames ? usernames : [];
      tweet[0].text = tweet[0].text.replace(/@[a-zA-Z0-9_]+/g, '');
      // transform text link into a a href link
      setTweet(tweet)

    });
  }

  const createBoxes = (userOptions) => {
    let boxes = [];
    for (const [key, value] of Object.entries(userOptions)) {


        boxes.push(
          <label key={key}>
          <input type="checkbox" checked={value} onChange={(e) => {
            let newOptions = { ...userOptions };
            
            newOptions[key] = e.target.checked;
            newOptions['insta'] = false
            console.log(newOptions)
            setuserOptions(newOptions);

          }} />
          {key}

        </label>
        );
      
    }
    return boxes;
  }


  const handleClick = () => {
    fetchData(userOptions)
  }
  const handleKey = (event) => {
    if (event.key === 'Enter' || event.key === 'ArrowLeft') {
      fetchData(userOptions)
    }
  }
  const [tweet, setTweet] = useState([{ text: "data is coming..", id: { high: 'a' } }])
  useEffect(() => {
    fetchData(userOptions)
  }, [])

  return (
    <div id="twitter-comment-container" onClick={handleClick} onKeyDown={handleKey}>
      <h1>Asocial Networks: Twitter Mirror</h1>
      <ul>
        <Tooltip uuid="tiktok-comment-container" caption="Save" directCreation={true} clickforsave={true} >
          <div id="tiktok-comment-container" >
            <h2 className="tiktok-comment">
              {tweet.map((tweet_) => {
                return (
                  <TweetRender key={tweet_.id.high} tweet={tweet_} />
                )
              })}

            </h2>
          </div>
        </Tooltip>
      </ul>
      // create an input checkbox to update each key of userOptions
          


      <div>
        {createBoxes(userOptions)}

        {/* <label>
          <input type="checkbox" checked={userOptions.insta} onChange={(e) => {
            setuserOptions({ ...userOptions, insta: e.target.checked })
          }} />
          Instagram
        </label>
        <label>
          <input type="checkbox" checked={userOptions.twitter} onChange={(e) => {
            setuserOptions({ ...userOptions, twitter: e.target.checked })
          }} />
          Twitter
        </label>
        <label>
          <input type="checkbox" checked={userOptions.youtube} onChange={(e) => {
            setuserOptions({ ...userOptions, youtube: e.target.checked })
          }} />
          Youtube
        </label>
        <label>
          <input type="checkbox" checked={userOptions.google} onChange={(e) => {
            setuserOptions({ ...userOptions, google: e.target.checked })
          }} />
          Google
        </label>
        <label>
          <input type="checkbox" checked={userOptions.tumblr} onChange={(e) => {
            setuserOptions({ ...userOptions, tumblr: e.target.checked })
          }} />
          Tumblr
        </label>
        <label>
          <input type="checkbox" checked={userOptions.assayag} onChange={(e) => {
            setuserOptions({ ...userOptions, assayag: e.target.checked })
          }} />
          Assayag
        </label> */}


      </div>
    </div>
  );
};
