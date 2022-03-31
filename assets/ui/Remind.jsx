// let's create a component to create a list of event and for each event we will show a status (closed/open/expired) depending on a date.
// each event will be created in a MongoDB collection. 
// Each event will have: a name, a beginning date, an expiration date (based on a time interval), an interval, a description, a link a website, a status (based on date + interval)
// Each event will have button to remove the event, to edit the event.

import React, {useEffect, useState} from 'react';
import { RemindCollection } from '../api/Collection';
import { useTracker } from 'meteor/react-meteor-data';


export const EventRender = ({event}) => {
const [sogound, setsogound] = useState(0)
    const [countdowns, setCountdowns] = useState([])
    // let's print the event name, the begi nning date, the expiration date, the interval, the description, the link and the status
    // let's make a function to check if the event is expired or not
    useTracker(() => {
    setInterval(function () {
        setCountdowns(["countdown"])
        setsogound(sogound + 1)
    }, 1000)

    }, [])


    const RemainingTime = () => {
        let end = new Date(event.end)  
        let now = new Date() 
        let diff = (end - now)

        let seconds = Math.floor((diff % (1000 * 60)) / 1000)
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)) 

        let days =  Math.floor(diff/ (1000 * 60 * 60 * 24)) >= 365? Math.floor(diff/ (1000 * 60 * 60 * 24)) - years * 365: Math.floor(diff/ (1000 * 60 * 60 * 24)) ;
        
        let months = Math.floor(diff/(1000 * 60 * 60 * 24 * 30) *100)/100
        // let days = Math.floor((diff % (1000 * 60 * 60 * 24 * month)) / (1000 * 60 * 60 * 24))
        let daysinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                
        if(diff < 0) {
            years = Math.abs(years + 1)
            days = years>= 1? Math.abs(days + 1) - years * 365: Math.abs(days + 1)
            months = days < 30? 0:  Math.abs(months)
            hours = Math.abs(hours + 1)
            minutes = Math.abs(minutes + 1)
            seconds = Math.abs(seconds)

        }
        // let remaining = [
        let remaining =  [...(years == 1? years + " year ": years > 1? years + " years ": "" ),
                            ...(days == 1? days + " day ": days > 1? days + " days ": "" ),
                            ...(months >= 1 ? "(~" + months + " months) " : ""),
                            ...(hours == 1? hours + " hour ": hours > 1? hours + " hours ": "" ),
                            ...(minutes == 1? minutes + " minute ": minutes > 1? minutes + " minutes ": "" ),
                            ...(seconds == 1? seconds + " second ": seconds > 1? seconds + " seconds ": "0 second")
            ]

        if(diff < 0) {
            years = years + 1
           remaining.unshift( [...("elapsed: ")])
        }
     
        return(<>{remaining}</>)
    
    }
    function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    

    const updateCssColor = (event) => {
        
        let eldiv = document.getElementById(event._id)
        let end = new Date(event.end)  
        let now = new Date() 
        let simana = Math.floor((end - now) / (1000 * 60 * 60 * 24 * 7) )
        let chhar = Math.floor((end - now) / (1000 * 60 * 60 * 24) )
        let sa3a = Math.floor((end - now) / (1000 * 60 * 60) )
        let daqi9a = Math.floor((end - now) / (1000 * 60) )
        useEffect(() => {
        setsogound(sogound + 20)
        }, [])
        

        if(eldiv){
        eldiv.style.backgroundColor = `rgb(${sogound}, ${100}, ${sogound}, ${0.5} )` 
        }
        // return diff
    }
    const checkStatus = (event) => {
        let now = new Date()
        let begin = new Date(event.begin)
        let end = new Date(event.end)
            // Meteor.call('remind.update', event._id, {begin: end});

        if (now > end) {
            event.status = "expired";
            return "expired";
        }
        if (now > begin && now < end) {
            event.status = "open";
            return "open";
        }
        if (now < begin) {
            event.status = "not opened";
            return "closed";
        }
        else {
            event.status = "no date"
            return "no date"
        }
    }

    // let's create an input to create and edit the event
    const [events, setEvents] = useState([{
        name: event.name,
        begin: event.begin,
        end: event.end,
        interval: event.interval,
        description: event.description,
        link: event.link,
        status: checkStatus(event),

    }]);

    // let's print the event name, the beginning date, the expiration date, the interval, the description, the link and the status
    
    return(
        // print event a div, and make that div editable, update database when edited
        
        <div className="event" id={event._id}>
                   
            {Object.keys(event).map((key, i) => {
                if (event) {

                return <div onBlur={(e) => {
                    let currentEvent = {
                        [key]: e.currentTarget.innerText ?e.currentTarget.innerText: ""
                    }
                    Meteor.call('remind.update', event._id, currentEvent);
                   }} className={"event-" + key}  contentEditable={(key == "remaining" || key === "status" || key == "_id")? false:true} suppressContentEditableWarning key={event._id.slice(0, 3) + i}>
                    {key === "remaining"?  <RemainingTime event={event} />: ""}
                    {key == 'link'? <a href={event[key]}>{event[key]}</a>:event[key]}
                </div>
                }
            })}
             <div className="event-edit">
             {updateCssColor(event)}
                <button onClick={() => {
                    Meteor.call('remind.remove', event._id);
                }}>Delete</button>
            </div> 
            
        </div>
    )
}

export const Remind = () => {

    const { mEvents, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe('remind');
        if(!handler.ready()) {
            return { mEvents: [], isLoading: true };
        }
        const mEvents = RemindCollection.find().fetch();
        return { mEvents };
    })


  
    return (
        <div className="remind-container">
            <h1 style={{textAlign: 'left'}}>Remind</h1>
            <div className="events-container">
                <div className="event-label">
                <div>Id</div>
                <div>Name</div>
                <div>Begin</div>
                <div>End</div>
                <div>Description</div>
                <div>Link</div>
                <div>Remaining</div>
                <div>Status</div>
                <div>Edit</div>
                </div>

                {mEvents.map((event, i) => {
                    return (
                        <EventRender key={i} event={event} />
                    )
                }
                )}
            </div>
            <div onClick={()=> { Meteor.call('remind.new')}}><b>+ new event</b></div>
        </div>
    )
}