import React, { useState } from 'react';

export const ThreeDotText = (data) => {

    const [text, setText] = useState(data);
    const initlength = text.length;

    setInterval(() => {
        setText(text + ".");
        if(text.length > initlength + 3) {
            setText(text.substring(0, initlength));
        }
    }, 300)
    console.log("hello!", text)
    return ({text})
}


