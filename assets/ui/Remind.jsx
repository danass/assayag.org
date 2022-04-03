import React, { useEffect, useState } from 'react';
const humanizeDuration = require("humanize-duration");
import { Loading } from './Animations';

import { DateTimePicker} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

// create a function that store in memory the end date of each event and use it create a countdown that updates every second without refreshing the page (useEffect, useState, Promise, without using useTracker)

export const Remind = () => {
    const [events, setEvents] = useState(null)
    const [countdowns, setCountdowns] = useState(null)

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
    }, [countdowns])

    function diffDate(date1, date2) {
        let diff = date2 - new Date(date1)
        return humanizeDuration(diff)
    }

    function updateEvent(id, key, e) {
        let currentEvent = {
            [key]: e.currentTarget.innerText ? e.currentTarget.innerText : undefined
        }
     Meteor.call('remind.update', id, currentEvent);
    }

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
        <ul>Login to edit.
        </ul>
      </div>
        </div>
        </div>

            {events ?
                events.map((event, i) => {
                    return <section className="event-container" key={event._id}>
                                               <button className="event-meta" onClick={() => {
                                Meteor.call('remind.remove', event._id);
                            }}>Delete</button>
                    
                        <div className="event">
                            <div className="event-wrapper">
                            <div onBlur={(e) => { updateEvent(event._id, "name", e) }} className="event-name" contentEditable suppressContentEditableWarning><b>{event.name}</b></div>
                            <div className="event-remain">{diffDate(event.end, countdowns)}</div>
                            <div className="event-enddate">
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
                        </div>
                        </div>


                        
                    </section>
                }) : <Loading />}
            <div className="event-create">
                <div onClick={() => { Meteor.call('remind.new') }}><b>+ new event</b></div>
            </div>
        </>
    )

}