import React, { useState, useEffect } from 'react';
export const Test = () => {

    // retrieve the data from https://rsshub.app/twitter/user/danielassayag/readable=1&authorNameBold=1&showAuthorInTitle=1&showAuthorInDesc=1&showQuotedAuthorAvatarInDesc=1&showAuthorAvatarInDesc=1&showEmojiForRetweetAndReply=1&showRetweetTextInTitle=0&addLinkForPics=1&showTimestampInDescription=1&showQuotedInTitle=1&heightOfPics=150

const [data, setData] = useState([]);    


    useEffect(() => {
        fetch('https://rsshub.app/twitter/user/danielassayag/readable=1&authorNameBold=1&showAuthorInTitle=1&showAuthorInDesc=1&showQuotedAuthorAvatarInDesc=1&showAuthorAvatarInDesc=1&showEmojiForRetweetAndReply=1&showRetweetTextInTitle=0&addLinkForPics=1&showTimestampInDescription=1&showQuotedInTitle=1&heightOfPics=150')
        .then(response => response.json())
        .then(data => setData(data.items));
    }, []);


    return (
        <div>
        <h1>Test</h1>
        </div>
    );
    }
