import { TwitterApi } from 'twitter-api-v2';
import { twitterconf } from '../conf.js';
import { TwitterCollection } from '../../src/api/Collection.js';
import fs from 'fs'

// import { tiktokdata } from '../data/tiktokdata.js';

// Module to access the Twitter API4
// :> method: createJsonTweetDatabase <: create a json from all tweets
// :> method: tweet <: tweet a message with an image

const twitterClient = new TwitterApi({
    appKey: twitterconf.CONSUMER_KEY,
    appSecret: twitterconf.CONSUMER_SECRET,
    accessToken: twitterconf.ACCESS_TOKEN_KEY,
    accessSecret: twitterconf.ACCESS_TOKEN_SECRET
});

export async function tweet(imgpath, text) {
    const image = await twitterClient.v1.uploadMedia(imgpath);
    const newTweet = await twitterClient.v1.tweet(text + '#TheAsocialNetworks', { media_ids: image });
}
async function createJsonTweetDatabase(nbOfPages) {
    let allTweets = []
    const userTimeline = await twitterClient.v1.userTimeline('@danielassayag', { include_entities: true });
    let tweetPages = await userTimeline.fetchNext()

    async function getPage() {
        tweetPages._realData.map((tweet, i) => {
            if (tweet.extended_entities) {
                tweet.extended_entities.media.map((media, i) => {
                    delete media.sizes
                    delete media.media_url
                    delete media.id_str
                })
            }
            if (tweet.full_text.includes('RT @')) {
                return
            }

            allTweets.push({ twid: tweet.id, text: tweet.full_text, date: tweet.created_at, media: tweet.extended_entities ? tweet.extended_entities.media : null, source: tweet.source })
            // iterate over allTweets and remove allTweets.media field if value is null
            allTweets.map((tweet, i) => {
                if (tweet.media === null) {
                    delete allTweets[i].media
                }
                
                // retrieve url only from string pattern
                if (tweet.source.includes('<a href')) {
                    let url = tweet.source.match(/<a href="(.*?)"/)
                    tweet.source = url[1]
                }
            })
        })
        await userTimeline.fetchNext();
    }

    for (let i = 0; i <= nbOfPages; i++) {
        await getPage()
    }
    // writing json archive from twitter api request
    fs.writeFile(process.cwd() + '/../../../../../' + __dirname + "/twitter.json", JSON.stringify([allTweets], undefined, 1), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    })

}
function updateData() {

function convertDate(date) {
let dayname = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }); 
let daynumber = new Date(date).getDate();
let month = new Date(date).toLocaleDateString('en-US', { month: 'short' });  
let time = new Date(date).toLocaleTimeString('en-US', { hour12: false });
let year = new Date(date).getFullYear();
let converted_date = dayname + " " + daynumber + " " + month + " " + time + " +0000 " + year;
return converted_date
}

uid = 0

tiktokdata.Comment.Comments.CommentsList.map(entry=> {

    // TwitterCollection.insert({
    //     id: uid,
    //     text: entry.Comment,
    //     date: entry.Date,
    //     source: "https://www.tiktok.com/",

    // })

        let data_schema = { 
        id: uid,
        text: entry.Comment,
        date: convertDate(entry.Date),
        source: "https://www.tiktok.com/",
    }
    TwitterCollection.insert(data_schema)
    uid += 1
    console.log(data_schema)
})
} 

//  updateData()
// createJsonTweetDatabase(60)

