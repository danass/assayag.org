import React, { useEffect, useState } from 'react';
const humanizeDuration = require("humanize-duration");
import { Loading } from '../Animations';

import { DateTimePicker} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { Tooltip, Zoom } from '@mui/material';
// create a function that store in memory the end date of each event and use it create a countdown that updates every second without refreshing the page (useEffect, useState, Promise, without using useTracker)

export const Remind = () => {
    const [events, setEvents] = useState(null)
    const [now, setCountdowns] = useState(null)
    const [error, setError] = useState(null)
    const [colors, setColors] = useState([135,55,255, 1]) //143,102, 255
    const [eSel, seteSel] = useState(1)
    
    useEffect(() => {
        
        const interval = Meteor.setInterval(() => {
            setCountdowns(Date.now())
        }, 100);

        fetchData = async () => {
            Meteor.call('remind.find', (e, r) => {
                setEvents(r)
            })
        }

        fetchData()
        
        return () => {
            Meteor.clearInterval(interval);
          
        };
    }, [now])




    function toNow(date1) {
        let diff = now - new Date(date1)
        return diff
    }

    function updateEvent(id, key, e) {
        let currentEvent = {
            [key]: e.currentTarget.innerText ? e.currentTarget.innerText : undefined
        }
     Meteor.call('remind.update', id, currentEvent);
    }

    function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    
    function logToColorInt(date, inverted) {
        if(inverted) {
            return parseInt(scale(Math.abs(Math.log(Math.abs(toNow(date))) / Math.log(0.012) *10), 20, 60, 0, 255))
        }
        return parseInt(scale(Math.abs(Math.log(Math.abs(toNow(date))) / Math.log(0.012) *10), 20, 60, 255, 0))
    }

    function logToColorDomInt(date, color) {
        let main = parseInt(scale(Math.abs(Math.log(Math.abs(toNow(date))) / Math.log(0.012) *10), 20, 60, 255, 0))
        color = parseInt(color)
        return scale(main + color, 0, 310, 0, 255)
    }

    // function hexToRgb(hex) {
    //     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //     return result ? {
    //       r: parseInt(result[1], 16),
    //       g: parseInt(result[2], 16),
    //       b: parseInt(result[3], 16)
    //     } : null;
    //   }

    return (
        <>
           <div id="main-container">
        <div id="main-container-header">
          <div id="main-container-header-title">
            <h1>Remind</h1>
          </div>
          <div className="main-container-block">
            <ul>This is a <b>tool</b> to <b>create events</b> and get a notification on your Telegram.
            </ul><ul>You can also have an <b>overview of your current tasks</b> and the time before they end.
            </ul>
          </div>
          <div  id="main-container-header-instructions">
       
        {Meteor.userId() ? <ul>Add and edit your event reminders</ul> : <ul>Login to edit.</ul> }
      </div>
        </div>
        </div>
        <div id="remind-selectors">
            <div onClick={()=> {seteSel(1)
            document.querySelector('#remind-selectors').scrollIntoView({behavior: "smooth"})
        }} className={`remind-selector ${eSel == 1 ? "remind-selected" : ""}`}>Present&Future </div>
            <div onClick={()=> {seteSel(0) 
            document.querySelector('#remind-selectors').scrollIntoView({behavior: "smooth"})
                        
            }} className={`remind-selector ${eSel == 0 ? "remind-selected" : ""}`}>All</div>
           
            <div onClick={() => {seteSel(2)}} className={`remind-selector ${eSel == 2 ? "remind-selected" : ""}`}>Past</div>
           {eSel == 0? 
            <div className="remind-selector event-create">
                <div onClick={() => { Meteor.call('remind.new', ((e, r) => {
                    if(e) {
                    setError(e.message)
                    setTimeout(() => {
                        setError("")
                    }, 1000);
                    } else {
                        document.querySelectorAll('.event-container')[document.querySelectorAll('.event-container').length-1].scrollIntoView({behavior: "smooth"})
                        // scrollIntoView("#membrane .event-container:last-child")
                        
                    } 
                })) }}>
                <Tooltip TransitionComponent={Zoom} title={error? error: ""}>
                    <b className='div-purple-slim'>+ new event</b>
                </Tooltip>
                </div>
            </div>
            : null}
        </div>
            {events ?
                events.filter((event) => {
                    if(eSel == 0) { // all
                        return true
                    }
                     if(eSel == 1) // present and future
                      { return toNow(event.end) <= 0 } 
                     if(eSel == 2) // past
                      { return toNow(event.end) >= 0 }}).sort((a, b) => {
                        let diff = new Date(a.end) - new Date(b.end) 
                        // console.log(diff + now)
                    return diff

                }).map((event, i) => {
                    return <section className="event-container" style={{
                        backgroundColor: toNow(event.end) <= 0 ? `rgba( ${logToColorDomInt(event.end, colors[0])} , ${logToColorDomInt(event.end, colors[1])}, ${logToColorDomInt(event.end, colors[2])} , 1)` : 'rgba(0,0,0,0.9)',
                        color : toNow(event.end) <= 0 ? `black`  : 'darkgrey'
                    }} key={event._id}>

                          
                    
                        <div className="event">
                            
                            <div className="event-wrapper">
                            <div onBlur={(e) => { updateEvent(event._id, "name", e) }} className="event-name" contentEditable suppressContentEditableWarning><b>{event.name}</b></div>
                            
                            <div className="event-remain">{toNow(event.end) <= 0? humanizeDuration(toNow(event.end)) : eSel == 0? event.end == ""? "Select a date.." : "passed" : "it's been " + humanizeDuration(toNow(event.end)) }</div>
                            {eSel == 0 || event.end == "" || toNow(event.end) <= 0? <div className="event-enddate">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="DateTimePicker"
                                        value={event.end}
                                        onChange={(newValue) => {
                                            let currentEvent = {
                                                end: newValue
                                            }
                                            Meteor.call('remind.update', event._id, currentEvent);
                                        }}
                                    />
                                </LocalizationProvider>
                            
                            </div>
                            : <div className="date-skeleton" />}
                        </div>

                        <Tooltip TransitionComponent={Zoom} title={error? error: ""}>
                                  <button className="event-meta" onClick={() => {
                                Meteor.call('remind.remove', event._id, ((e, r) => {
                                    if (e) {
                                    setError(e.message)
                                    setTimeout(() => {
                                        setError("")
                                    }, 1000);
                                    }

                                    }));
                            }}>Delete</button>
                            </Tooltip>
                        </div>
                        
                    </section>
                }) : <Loading />}
    {eSel == 0? 
            <div className="remind-selector event-create">
                <div onClick={() => { Meteor.call('remind.new', ((e, r) => {
                    if(e) {
                    setError(e.message)
                    setTimeout(() => {
                        setError("")
                    }, 1000);
                    } else {
                        document.querySelectorAll('.event-container')[document.querySelectorAll('.event-container').length-1].scrollIntoView({behavior: "smooth"})
                        // scrollIntoView("#membrane .event-container:last-child")
                        
                    } 
                })) }}>
                <Tooltip TransitionComponent={Zoom} title={error? error: ""}>
                    <b className='div-purple-slim'>+ new event</b>
                </Tooltip>
                </div>
            </div>
            : null}
            

        </>
    )

}