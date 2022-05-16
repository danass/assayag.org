import React, { useState, useEffect } from 'react';
import { Loading } from '/src/ui/Animations';
import { useSearchParams } from "react-router-dom";
import { onPageLoad } from 'meteor/server-render';  


export const Api = (props) => { 
  onPageLoad((sink) => { 
    console.log(sink)
  })


  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const authKeys = ['userId', 'token', 'expires', 'url']
  useEffect(()=> { 
    setLoading(<Loading />  )
    Meteor.call('user.isLogged', ((e,r) => { if(e) return console.error(e); setUser(r)
      if(!r) { setLoading('Not Logged') }
     })) 
    
  },[]);


  if(user) {
    return (
      <>
        <h1>Api</h1>
    </>
  
    )
  }

  return (
    <>
    {loading}
    </>
    )

}