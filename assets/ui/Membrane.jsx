import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(Meteor.userId());
    const [errorLoginMessage, setError] = useState('');

    const submit = e => {
      e.preventDefault();
      Meteor.loginWithPassword(username, password, (e, r) => {
          if (e) {
                setError(e.message);
            }
            else {
                setUser(Meteor.user())
                setError('');
                
            }
        });
    };

    
  
    return (
        <>
        {user?
        <div className="login login-logged">
        <div>
            <p>{user.username}</p>
            <button onClick={() => {
                Meteor.logout();
                setUser(null);
            }}>Logout</button>
        </div>
        </div>: '' }

        {!user?
        <div className="login">
            
      <form onSubmit={submit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={e => setUsername(e.target.value)}
        />
  
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={e => setPassword(e.target.value)}
        />
  
        <button type="submit">Log In</button>
      </form>
        <p>{errorLoginMessage}</p>
      </div>
      
        : ''}
      </>
    );
  };



export const Menu = () => {
    document.querySelector('html').setAttribute('lang', 'en')

    // add a react method to check if the user is scrolling and what is the current position on the page
    const isScrolling = () => {
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return top;
    }

    return (
        <header>
        <div className="menu" onScroll={(e) => hideMenu(e)}>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/asocial">Asocial</Link>
            </div>

            <div>
                <Link to="/rain">Rain</Link>
            </div>
            <div>
                <Link to="/remind">Re:mind</Link>
            </div>
        </div>
        <LoginForm />
        </header>
    )
}

  

export const Footer = () => {
    return (
        <footer>
        <div id="main-container-footer">
    
            <div className="footer-social">
                <div className="footer-link-container"><a href="https://t.me/+qyB90R0t94k4MmVk" target={"_blank"}>Telegram</a></div>
                <div className="footer-link-container"><a href="https://www.instagram.com/superdani.el" target={"_blank"}>Instagram</a></div>
                <div className="footer-link-container"><a href="https://www.twitch.tv/danassadon" target={"_blank"}>Twitch</a></div>
                <div className="footer-link-container"><a href="https://www.buymeacoffee.com/danielassayag/posts" target={"_blank"}>Buy me a coffee</a></div>
                <div className="footer-link-container"><a href="https://github.com/danass" target={"_blank"}>Github</a></div>
                <div className="footer-link-container"><a href="https://stackoverflow.com/users/2244093/" target={"_blank"}>Stack Overflow</a></div>
                <div className="footer-link-container"><a href="https://soundcloud.com/zuperdaniel" target={"_blank"}>Soundcloud</a></div>
            </div>

  
            <div className="footer-links">
            <div className="footer-link-container"><Link to="/terms-of-use">Terms of Use</Link></div>
            <div className="footer-link-container"><Link to="/privacy">Privacy Policy</Link></div>
            </div>

            <div id="footer-copyright">
                Copyright © 2022. All rights reserved
            </div>
            <div id="main-container-header-instructions">
                <ul> <Link to="/mail">contact</Link></ul>
             </div>
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

export const Membrane = (props, allo) => {
    return (<>
        <Menu />
        {props.children}
        <Footer />
    </>
    )
}