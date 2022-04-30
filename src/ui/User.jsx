import React, { useState, useEffect } from 'react';
import { ToggleButton } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

export const Register = (props) => {
  return (
  <>
  <div id="main-container">

  <div id="main-container-header">
    <div id="main-container-header-title">
      <h1>Register</h1>
    </div>
    <div id="main-container-header-instructions">
      <ul>Let's get started, b.</ul>
    </div>
  </div>

  <section id="user-container-form">
      <form id="user-form" onSubmit={(e) => {
          e.preventDefault(); const credentials = { username: e.target.login.value, email: e.target.email.value, password: e.target.password.value };
          Meteor.call('user.create', credentials, ((e, r) => { if (e) { props.setError(e)  }
            else { props.setStep(1); }
          }))
        }}>
          <input type="text" placeholder="Login" name="login" required />
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button id="userform-button" type="submit">Create</button>
        </form>
        {props.error?.message}
  </section>
  

</div>
</>
)
}

export const User = (props) => {
  
  const [now, setCountdowns] = useState(null)
  const [error, setError] = useState(null)
  const [step, setStep] = useState(0)
  const [user, setUser] = useState(props.user)
  const [userdata, setUserdata] = useState(null)
  const [rainData, setrainData] = useState(null)

  useEffect(() => {
    setUser(props.user)
  }, [props, user]);



  useEffect(() => {
    if (user) { 
      Meteor.call('user.getdata', ((e, r) => {
        if(e) return
        setUserdata(r)
      }))

      Meteor.call('rain.save', null, null, null, ((e, r) => {
        if(e) return
        setrainData(r)
        }))

      setStep(2) 
    }
    else { setStep(0) }
  }, [user])

  return (
    <>
      {step == 0 ?<>
        <Register error={error} setError={setError} setStep={setStep}/>
        </>
        : null}

      {step == 1 ?
        <div>
          bravo, you just registered.
          just login now btch</div>
        : null}

      {step == 2 ? <>
        <section>
          <h1>Welcome to your home broda {user?.username},</h1>

          <div className='user-data-input'>
            <label>username</label>
            <div>{user?.username}</div>
          </div>

          <div className='user-data-input'>
            <label>email</label>
            <div>{user?.email[0].address}</div>
          </div>

          <div className='user-data-input'>
            <label>twitterid</label>
            <div className="contentEditable" contentEditable suppressContentEditableWarning spellCheck="false" onBlur={(e) => { 
              Meteor.call('user.update', "app.conf.twitter.twitterid", e.target.innerText) }}>
              { userdata?.app?.conf?.twitter?.twitterid }
            </div>
            </div>

            <div className='user-data-input'>
            <label>telegramid</label>
            <div className="contentEditable" contentEditable suppressContentEditableWarning spellCheck="false" onBlur={(e) => { 
              Meteor.call('user.update', "app.conf.telegram.telegramid", e.target.innerText) }}>
              { userdata?.app?.conf?.telegram?.telegramid }
           
            </div>

        </div>
        </section>

          
        <section>
        <div id="rain-library-public">
            <div className="rain-frontispice">HALL-OF-FAME</div>
            <div>{rainData?.length} / 10</div>
          {userdata?.app?.rain.map((canvas) => {
            
            let visible = rainData?.some(currentCanvas => currentCanvas._id === canvas._id)
            console.log(visible, canvas._id)
            return (
              <div key={canvas._id} id={canvas._id} className="rain-book">
                <img src={canvas.canvas} />
                <ToggleButton selected={visible} value="saved" className="rain-button" onClick={() => {
                  Meteor.call('rain.save', canvas, visible, null, (err, res) => {
                    if(err) return console.error(err);
                    setrainData(res)
                  })
                  
                }}>{visible?<LibraryAddCheckIcon />:
                <LibraryAddIcon />}
                </ToggleButton>
              </div>
            )
            
          }) }
          </div>
        </section>
       

        </>

       : null}

      {step == 8 ? <div>grandmasterfalsh</div>: null}
    </>
  )
}

