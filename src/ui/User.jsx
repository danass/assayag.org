import React, { useState, useEffect } from 'react';


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
    <div id="user-container-form">
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
  </div>
  

  </div>

</div>
</>
)
}

export const User = (props) => {
  
  const [now, setCountdowns] = useState(null)
  const [error, setError] = useState(null)
  const [step, setStep] = useState(0)
  const [user, setUser] = useState(props.user)


  useEffect(() => {
    setUser(props.user)
  }, [props, user]);

  useEffect(() => {
    const interval = Meteor.setInterval(() => { setCountdowns(Date.now()) }, 2000);
    return () => { Meteor.clearInterval(interval); };
  }, [now])

  useEffect(() => {
    if (user) { setStep(2) 

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

      {step == 2 ? <div>
        Welcome to your home broda
      </div> : null}

      {step == 8 ? <div>grandmasterfalsh</div>: null}
    </>
  )
}

