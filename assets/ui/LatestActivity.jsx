import React, {useEffect} from "react";
const https = require('https');

export const LatestActivity = () => {
 
    const [twitter, setTwitter] = React.useState([]);
    const [instagram, setInstagram] = React.useState([]);
    const [youtube, setYoutube] = React.useState([]);

    useEffect(() => {
        Meteor.call('getInstaRapidAPI', async (err, res) => {
            if (err) {
                console.log(err);
            } else {
                setInstagram(res);
            }
        })  
    }, [instagram]);

    useEffect(() => {
        const getFeed = async () => {
            const twitter = await getTwitterFeed();
            setTwitter(twitter? twitter: [] );
        }
        getFeed();
    }
    , [twitter]);

    const getTwitterFeed = async () => {
        Meteor.call('fetchTwitter', (err, res) => {
            if (err) {
                console.log(err);
                } else {
                    console.log(res)
                }
            })
            
        }
        
        
    return (
        <>
       
            {twitter? twitter.map((tweet, i) => {
                return (
                    <div key={i}>
                        <p>{tweet.text}</p>
                    </div>
                )
            }) : null}
            

        </>
    )
}



