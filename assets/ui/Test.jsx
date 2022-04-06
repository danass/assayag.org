

import React, { useState, useEffect } from "react"

export const Test = () => {
    const [data, setData] = useState(null);
    const [responseTweets, setresponseTweets] = useState([]);

    useEffect(() => {
        Meteor.call('getTwitter', (err, twitterClient) => {
            if (err) {
                console.log("bug", err);
            } else {
                setData(twitterClient._realData)
            }
        })

    }, [])

    function getTweet(id) {
        Meteor.call('getTwitter', id, (err, tweet) => {
            if (err) {
                console.log("bug", err);
            } else {
                setresponseTweets([...responseTweets, tweet.full_text])
            }
        })


    }


    return (
        <>
            {data ? data.map((tweet, i) => {
                // console.log(tweet)
                // remove all usernames: '@username' from the tweet.full_text

                let newTweet = tweet.full_text.replace(/@[a-zA-Z0-9_]+/g, '');
                newTweet = newTweet.replace(/https?:\/\/[^\s]+/g, '');

                // {getTweet(tweet.in_reply_to_status_id_str)}

                return <div key={i}>
                    <b>{tweet.in_reply_to_screen_name}</b>
                    {newTweet}
                    <br></br>
                    {responseTweets ? responseTweets[i] ? responseTweets[i] : "walou" : "loading    "}
                    <br></br>
                </div>
            }) : "loading"}

        </>
    )
}
