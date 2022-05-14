import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const humanizeDuration = require("humanize-duration");
import { Loading } from '../Animations';

import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { TextField, Tooltip, Zoom, ToggleButton, Button, LinearProgress } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
// create a function that store in memory the end date of each event and use it create a countdown that updates every second without refreshing the page (useEffect, useState, Promise, without using useTracker)

export const Remind = (props) => {
  const [events, setEvents] = useState([])
  const [now, setCountdowns] = useState(null)
  const [error, setError] = useState(null)
  const [colors, setColors] = useState([135, 55, 255, 1]) //143,102, 255
  const [eSel, seteSel] = useState(0)
  const [user, setUser] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    setUser(props.user)
  }, [user, props])

  useEffect(() => {
    const interval = Meteor.setInterval(() => {
      setCountdowns(Date.now())
    }, 100);

    fetchData = async () => {
      Meteor.call('remind.find', null, username, (e, r) => {
          setEvents(r)
      })
    }

    fetchData()

    return () => {
      Meteor.clearInterval(interval);
    };
  }, [now])

  function toNow(date) {
    let diff = now - new Date(date)
    return diff
  }



  function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  function logToColorInt(date, inverted) {
    if (inverted) { return parseInt(scale(Math.abs(Math.log(Math.abs(toNow(date))) / Math.log(0.012) * 10), 20, 60, 0, 255)) }
    return parseInt(scale(Math.abs(Math.log(Math.abs(toNow(date))) / Math.log(0.012) * 10), 20, 60, 255, 0))
  }

  function logToColorDomInt(date, color) {
    let main = parseInt(scale(Math.abs(Math.log(Math.abs(toNow(date))) / Math.log(0.012) * 10), 20, 60, 255, 0))
    color = parseInt(color)
    return scale(main + color, 0, 310, 0, 255)
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
          <div id="main-container-header-instructions">
            {user ? <ul>Add and edit your event reminders</ul> : <ul>Login to edit.</ul>}
          </div>
        </div>
      </div>

      {events.length > 0 ?

        <div id="remind-selectors">

          <div onClick={() => {
            seteSel(0)
          }} className={`remind-selector ${eSel == 0 ? "remind-selected" : ""}`}>{user && !username ? <div>All <i>(edit)</i></div> : <div>All</div>}  </div>

          { events.filter(e => toNow(e.end) <= 0 && e.private).length > 0 ?
          <div onClick={() => {
            seteSel(1)
          }} className={`remind-selector ${eSel == 1 ? "remind-selected" : ""}`}>Present </div>
          : null}

          { events.filter(e => toNow(e.end) >= 0 && e.private).length > 0  ? 
          <div onClick={() => { seteSel(2) }} className={`remind-selector ${eSel == 2 ? "remind-selected" : ""}`}>Past</div>
          : null}

          { events.filter(e => e.archived).length > 0  ? 
          <div onClick={() => { seteSel(4) }} className={`remind-selector ${eSel == 4 ? "remind-selected" : ""}`}>Archived</div>
          : null}

          {eSel == 0 ?
            <div className="remind-selector event-create">
              <div onClick={() => {
                Meteor.call('remind.new', ((e, r) => {
                  if (e) {
                    setError(e.message)
                    setTimeout(() => {
                      setError("")
                    }, 1000);
                  } else {
                    document.querySelectorAll('.event-container')[document.querySelectorAll('.event-container').length - 1].scrollIntoView({ behavior: "smooth" })
                    // scrollIntoView("#me mbrane .event-container:last-child")
                  }
                }))
              }}>
                {user && !username ? <Tooltip TransitionComponent={Zoom} title={error ? error : ""}><b className='div-purple-slim'>+ new event</b></Tooltip> : null}
              </div>
            </div>
            : null}
        </div>
        : null}


      {events ?
        events.filter((event) => {
          if (eSel == 0) { return user || true && event.private  } // everything (including private) || everything (only public)
          if (eSel == 1) { return event.private && toNow(event.end) <= 0 } // present  (public)
          if (eSel == 2) { return event.private && toNow(event.end) >= 0 } // past (public)
          if (eSel == 3) { return !event.private && user } // private
          if (eSel == 4) { return event.archived && user }
        }) // private
          .sort((a, b) => {
            // console.log(new Date(a.end) - new Date(b.end)  )
            return new Date(a.end) - new Date(b.end)  })
          .map((event, i) => {
            return <section className="event-container" style={{
              backgroundColor: toNow(event.end) <= 0 ? `rgba( ${logToColorDomInt(event.end, colors[0])} , ${logToColorDomInt(event.end, colors[1])}, ${logToColorDomInt(event.end, colors[2])} , 1)` : 'rgb(2, 1, 34)',
              color: toNow(event.end) <= 0 ? `black` : '#e1a0ff'
            }} key={event._id}>

              <div className="event">
                <div className="event-wrapper">
                  <div onBlur={(e) => {
                    Meteor.call('remind.update', event, { name: e.currentTarget.innerText })
                  }}
                    className="event-name" contentEditable={user ? true : false} suppressContentEditableWarning><b>{event.name}</b></div>

                  <div className="event-remain">
                    {event.archived? <time>{humanizeDuration(event.end - event.archivedTime)}</time>: 
                     toNow(event.end) <= 0 ? 
                    <time>{humanizeDuration(toNow(event.end))}</time>
                     : eSel == 0 ? event.end == "" ? "Select a date.." : "it's been " + humanizeDuration(toNow(event.end)) : "it's been " + humanizeDuration(toNow(event.end))}</div>
                 
                  {user  ? 
                  <div className="event-choices">
                    {eSel == 0 || event.end == "" || toNow(event.end) <= 0 ?
                      <div className={`"event-enddate" ${toNow(event.end) <= 0 ? "" : "event-ended"}`}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker disabled={user ? false : true} renderInput={(props) => <TextField  {...props} />}
                            label="DateTimePicker" value={event.end} onChange={(newValue) => {
                              Meteor.call('remind.update', event, { end: newValue })
                            }} />
                        </LocalizationProvider>
                      </div> : <div className="date-skeleton" />}

                    <div className="event-choices-buttons-wrapper">
                      { toNow(event.end) <= 0? 
                      <div className="event-choice">
                        <ToggleButton className="choice-black"
                        disabled={user ? false : true} value="check" selected={event.telegram} onClick={() => {
                          Meteor.call('remind.update', event, { telegram: !event.telegram })
                        }}>
                          { event.telegram? <TelegramIcon sx={{ color: toNow(event.end) <= 0? "#2d1252": "#e3c2ff"  }} />: <TelegramIcon sx={{ color: "#d8bbff7d" }} /> }
                        </ToggleButton>
                      </div>
                      : null}

                      <div className="event-choice">
                        <ToggleButton disabled={user ? false : true} value="check" selected={event.private} onClick={() => {
                          Meteor.call('remind.update', event, { private: !event.private })
                        }}>
                          {event.private ? <VisibilityIcon sx={{ color: toNow(event.end) <= 0? "#2d1252": "#e3c2ff" }} /> : <VisibilityOffIcon sx={{ color: "#d8bbff7d" }} />}
                        </ToggleButton>
                      </div>


                      <div className="event-choice">
                        <ToggleButton disabled={user ? false : true} value="check" selected={event.archived} onClick={() => {
                          Meteor.call('remind.update', event, { archivedTime: new Date(Date.now()), archived: !event.archived })
                        }}>
                          {event.archived ? <Inventory2RoundedIcon  sx={{color: toNow(event.end) <= 0? "#2d1252": "#e3c2ff"  }} /> : <Inventory2RoundedIcon  sx={{ color: "#d8bbff7d" }} />}
                        </ToggleButton>
                      </div>
                    </div>
                  </div>
                  : <div className="date-skeleton" />}
                </div>
                <div className="event-meta">
                  <Tooltip TransitionComponent={Zoom} title={error ? error : ""}>
                    <Button variant="Delete" onClick={() => {
                      Meteor.call('remind.remove', event._id, ((e, r) => {
                        if (e) {
                          setError(e.message)
                          setTimeout(() => {
                            setError("")
                          }, 1000);
                        }

                      }));
                    }}><ClearIcon /></Button>
                  </Tooltip>
                </div>

                {event.telegramSent ?
                  <div className="event-meta">
                    <LinearProgress />
                  </div>
                  : null}
              </div>
            </section>
          }) : username ? null : user ? null : <Loading />
      }



      {eSel == 0 ?
        <div className="remind-selector event-create">
          <div onClick={() => {
            Meteor.call('remind.new', ((e, r) => {
              if (e) {
                setError(e.message)
                setTimeout(() => {
                  setError("")
                }, 1200);
              } else {
                // document.querySelectorAll('.event-container')[0].scrollIntoView({ behavior: "smooth" })
              }
            }))
          }}>

            {user && !username ? <Tooltip TransitionComponent={Zoom} title={error ? error : ""}><b className='div-purple-slim'>+ new event</b></Tooltip> : null}

          </div>
        </div>
        : null}


    </>
  )

}