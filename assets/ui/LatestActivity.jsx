import React from "react";
const https = require('https');

export const LatestActivity = () => {
    // this component will retrieve a rss feed using https request
    // and display the three last items from each feed (twitter, instagram, youtube) and parse it accordingly in a div

    // example structure for the twitter feed: 
    // <item>
    // <title>
    // <![CDATA[ Daniel Assayag: Malkovitch fait un salut nazi quenelle #prodieudonné #inadmissible #crif #mediafrancais ]]>
    // </title>
    // <description>
    // <![CDATA[ <img width="0" height="0" hidden="true" src="https://pbs.twimg.com/media/FN9rongXoAk-vOK?format=png&amp;name=orig" referrerpolicy="no-referrer"><a href="https://twitter.com/danielassayag" target="_blank" rel="noopener noreferrer"><img width="48" height="48" src="https://pbs.twimg.com/profile_images/73138790/is21gilbru02_normal.jpg" hspace="8" vspace="8" align="left" referrerpolicy="no-referrer"><strong>Daniel Assayag</strong></a>: Malkovitch fait un salut nazi quenelle #prodieudonné #inadmissible #crif #mediafrancais<br clear="both"><div style="clear: both"></div><a href="https://pbs.twimg.com/media/FN9rongXoAk-vOK?format=png&amp;name=orig" target="_blank" rel="noopener noreferrer"><img height="150" style="height: 150px;" hspace="4" vspace="8" src="https://pbs.twimg.com/media/FN9rongXoAk-vOK?format=png&amp;name=orig" referrerpolicy="no-referrer"></a><br clear="both"><div style="clear: both"></div><hr><small>3/16/2022, 10:18:38 AM</small> ]]>
    // </description>
    // <pubDate>Wed, 16 Mar 2022 10:18:38 GMT</pubDate>
    // <guid isPermaLink="false">https://twitter.com/danielassayag/status/1504039430876803074</guid>
    // <link>https://twitter.com/danielassayag/status/1504039430876803074</link>
    // <author>
    // <![CDATA[ Daniel Assayag ]]>
    // </author>
    // </item>


    // structure for the instagram feed: undefined

    // structure for the youtube feed: undefined

    // => we will use the https request to retrieve the rss feed
    
    const [twitter, setTwitter] = React.useState([]);
    const [instagram, setInstagram] = React.useState([]);
    const [youtube, setYoutube] = React.useState([]);

    React.useEffect(() => {
        const getFeed = async () => {
            const twitter = await getTwitterFeed();
            setTwitter(twitter? twitter: [] );
        }
        getFeed();
    }
    , []);

    const getTwitterFeed = async () => {
        Meteor.call('fetchTwitter', (err, res) => {
            if (err) {
                console.log(err);
                } else {
                    console.log(res)
                }
            })
            
        }
        
        // return data.items.slice(0, 3);
    



    return (
        <div className="latest-activity">
            <div className="latest-activity-title">
                <h2>Latest activity</h2>
            </div>
            <div className="latest-activity-content">
                <div className="latest-activity-twitter">
                    <h3>Twitter</h3>
                    {twitter.map((item, index) => (
                        <div key={index} className="latest-activity-twitter-item">
                            <div className="latest-activity-twitter-item-title">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            </div>
                            <div className="latest-activity-twitter-item-description">
                                <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



