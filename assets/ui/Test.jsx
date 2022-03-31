import React, { useEffect, useState } from 'react';
import { RemindCollection } from '../api/Collection';


 // create a function that store in memory the end date of each event and use it create a countdown that updates every second without refreshing the page (useEffect, useState, Promise, without using useTracker)

export const Test = () => {
    let toz = "blue"

    const [events, sEvents] = useState([])
    const [countdowns, setCountdowns] = useState([])
    
    const fetchData = async () => {
        Meteor.call('remind.find', (e, r) => {
            toz = r
            sEvents(r)
        })
    }

    useEffect(()=> {
        fetchData()
       
        console.log(events)
    }, [toz])

    setInterval(function () {
        setCountdowns(Date.now())
    }, 1000)

    // create a function that take a end date ane return and object with the remaining time in years, semesters, months, weeks, days, hours, minutes and seconds
    // for example if the end date in in 1 month and 1 day, the function should return {months: 1, days: 1} and not 32 days
    
    function diffDate(date1, date2) {
  

        let diff = date2 - new Date(date1)
        
        let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
        let semesters = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 6))
        let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
        let weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
        let days = Math.floor(diff / (1000 * 60 * 60 * 24))
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((diff % (1000 * 60)) / 1000)

        return [
            years,
            semesters,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds
        ]
    }
    


    return (
        <>
        {events.map((event, i) => {
            return <div key={i}>
                {event._id}
                {diffDate(event.end, countdowns)}
            </div>
        }) }
        </>
    )

}