import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Tooltip, Zoom } from '@mui/material';


export const Membrane = (props) => {
  
  const [user, setUser] = useState('');  

  return (<>
    <Menu setUser={setUser} />
    {React.cloneElement(props.children, {user, setUser})}
    <Footer />
  </>
  )
}

export const Menu = (props) => {
  document.querySelector('html').setAttribute('lang', 'en')

  const [user, setUser] = useState('');  

  useEffect(()=> {
    props.setUser(user)
  }, [user])

  return (
    <header>
      <div className="menu">
        <MenuItems />
      </div>
      <LoginForm setUser={setUser} />
    </header>
  )
}
export const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [errorLoginMessage, setError] = useState('');

  useEffect(() => {
    Meteor.call('user.isLogged', (e, r) => {
      if (r) {
        setUser(r); // set context user
        props.setUser(r); // set props for parent
      }
      if (e) console.log(e);
    });
  }, []);

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (e, r) => {
      if (e) {
        setError(e.message);
        props.setUser('');
	setUser('');
      } else {
        Meteor.call('user.isLogged', (e, r) => {
          if (r) {
            props.setUser(r);
            setUser(r);
            setError('');
          }
        });
      }
    });
  };

  function dropMenuChanges() {
    document.querySelector('.login-container').classList.toggle('show-menu');
    document.querySelector('.popup-menu-container').classList.toggle('transparent-bg');
  }

  function clickAwayMenu() {
    document.querySelector('.login-container').classList.remove('show-menu');
    document.querySelector('.popup-menu-container').classList.add('transparent-bg');
  }

  return (
    <>
      <ClickAwayListener onClickAway={clickAwayMenu}>
        <div className={"popup-menu-container transparent-bg"}>
          <div className="logo" onClick={dropMenuChanges}>
            {user ? <div className="logocover"></div> : ''}
            <img src="/favicon.ico" width={50} alt="logo" />
          </div>
          {user && <Link to="/user">{user.username}</Link>}
          <div className="login-container">
            {user ?
              <div className="login login-logged">
                <div>
                  <button onClick={() => {
                    Meteor.logout();
                    setUser(null);
                    props.setUser(null);
                  }}>Logout</button>
                </div>
              </div> : ''}

            {!user ?
              <div className="login">
                <form onSubmit={submit} className="login-form">
                  <input type="text" placeholder="Username" name="username" required onChange={e => setUsername(e.target.value)} />
                  <input type="password" placeholder="Password" name="password" required onChange={e => setPassword(e.target.value)} />
                  <Tooltip TransitionComponent={Zoom} title={errorLoginMessage ? errorLoginMessage : ""}><button type="submit">Log In</button></Tooltip>
                </form>
              </div>
              : ''}
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};


function goTop() {
  // when document is document.ready
  setTimeout(() => {
    document.querySelector('header').scrollIntoView({ behavior: "smooth" })
  }, 300);
}

export const MenuItems = () => {
  return (<>
  <nav>
    <Link to="/"> <div onClick={goTop}>Home</div></Link>
    <Link to="/asocial"><div onClick={goTop}>Asocial</div></Link>
    <Link to="/rain"><div onClick={goTop}>Rain</div></Link>
    <Link to="/remind"><div onClick={goTop}>Re:mind</div></Link>
    {/* <Link to="/fauxprophet"><div onClick={goTop}>Fauxprophet</div></Link> */}
    </nav>
  </>
  )
}

export const Footer = () => {
  return (
    <footer>
      <div id="main-container-footer">

        <div className="footer-social">
          <ul>
          <div className="footer-link-container"><Link to="/terms-of-use">Terms of Use</Link></div>
          <div className="footer-link-container"><Link to="/privacy">Privacy Policy</Link></div>
          </ul>
          <ul>
            <div className="footer-link-container"><a href="https://www.instagram.com/superdani.el" target={"_blank"}>Instagram</a></div>
            <div className="footer-link-container"><a href="https://soundcloud.com/zuperdaniel" target={"_blank"}>Soundcloud</a></div>
            <div className="footer-link-container"><a href="https://www.twitch.tv/danassadon" target={"_blank"}>Twitch</a></div>
          </ul>
          <ul>
            <div className="footer-link-container"><a href="https://stackoverflow.com/users/2244093/" target={"_blank"}>Stack Overflow</a></div>
            <div className="footer-link-container"><a href="https://github.com/danass" target={"_blank"}>Github</a></div>
          </ul>
          <ul>
            <div className="footer-link-container"><a href="https://t.me/+qyB90R0t94k4MmVk" target={"_blank"}>Telegram</a></div>
            <div className="footer-link-container"><a href="https://www.buymeacoffee.com/danielassayag/posts" target={"_blank"}>Buy me a coffee</a></div>
          </ul>
        </div>

      </div>
      <div id="footer-menu">
        <MenuItems />
      </div>

      <div className="footer-social">
        <div className="footer-contact-button">
          <ul> <Link to="/mail">contact</Link></ul>
        </div>
        </div>
    
      <div className="main-container-block" id="footer-copyright">
        <ul>Copyright © 2022. All rights reserved</ul>
        <div className={"break-words w-3/4 mx-auto pt-10 text-xs"}><b>XMR</b> 86nrjjee521DUtJXKKcw3M81DHHHxShiTPpMAPJXjcrgECjmzGhE9vuUsYNm2RSh2ZBK8PBLNnLcyCQ2KoomHqBDNgypGqg</div>

      </div>
    </footer>
  )
}

export const Uuid = () => {
  return 'xxxx-yxxx-xxxxx'.replace(/[xy]/g, function (c) {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16);
  })
}


export const isMobile = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

export function Global(currentState) {

  let localState = {
    pageName: currentState.pageName,
    year: new Date().getFullYear(),
    link: useLocation().pathname
  }

  document.title = "{" + localState.pageName + "} ${DANIEL@ASSAYAG} artist coder activist. <- \\1986-undefined/"
  let meta = document.getElementsByTagName('meta')
  meta.description.content = currentState.description

  var uC = document.querySelectorAll("link[rel='canonical']")[0];
  var newURL = "https://www.assayag.org" + localState.link + '/';
  uC.setAttribute("href", newURL);

  return (
    {
      title: document.title,
      link: localState.link
    }
  )
}
