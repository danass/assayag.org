import React, { useState, useEffect } from 'react';

export const Loading = ({props = {init: "Loading", speed:200, text:"...   "}}) => {
 
  // properties: {
  //   props.text: string,
  //   props.speed: int,
  //   props.init: string
  // }

  // create a animation using a string (props.text)
  // and creating a loop that print each letter, starting with an empty string, and revealing a new caracter of the string every 0.5s
  // and start over when the string is finished

  const [textState, setText] = useState("");

  try {
  useEffect(() => {
    
    let interval = Meteor.setInterval(() => {
      if(props.text == undefined) {
        props.text = "...   "
      }
      if (textState.length < props.text.length) {
        setText(textState + props.text[textState.length]);
      } else {
        Meteor.clearInterval(interval);
        setText("");
      }
    }, props.speed);
    return () => {
      Meteor.clearInterval(interval);
    };
  }, [textState, props.text]);

} catch (error) {
  console.dir(error);
  }
  return <div>{props.init?props.init:""}{textState}</div>;
};
