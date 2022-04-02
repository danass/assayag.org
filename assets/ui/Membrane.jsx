import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Menu = () => {
    document.querySelector('html').setAttribute('lang', 'en')

    // add a react method to check if the user is scrolling and what is the current position on the page
    const isScrolling = () => {
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return top;
    }
    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         // if the user is scrolling
    //         if (isScrolling() > 30) {
    //             document.getElementById('main-container-header-title').classList.add('menu-dissapear');
    //         }
    //         if (isScrolling() < 30) {
    //             document.getElementById('main-container-header-title').classList.remove('menu-dissapear');
    //         }
    //     });
    // }, [])

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
        </div>
        </header>
    )
}

export const Footer = () => {
    return (
        <footer>
        <div id="main-container-footer">
    
            <div className="footer-social">
                <div class="footer-link-container"><a href="https://t.me/+qyB90R0t94k4MmVk" target={"_blank"}>Telegram</a></div>
                <div class="footer-link-container"><a href="https://www.instagram.com/superdani.el" target={"_blank"}>Instagram</a></div>
                <div class="footer-link-container"><a href="https://www.twitch.tv/danassadon" target={"_blank"}>Twitch</a></div>
                <div class="footer-link-container"><a href="https://www.buymeacoffee.com/danielassayag/posts" target={"_blank"}>Buy me a coffee</a></div>
                <div class="footer-link-container"><a href="https://github.com/danass" target={"_blank"}>Github</a></div>
                <div class="footer-link-container"><a href="https://stackoverflow.com/users/2244093/" target={"_blank"}>Stack Overflow</a></div>
                <div class="footer-link-container"><a href="https://soundcloud.com/zuperdaniel" target={"_blank"}>Soundcloud</a></div>
            </div>

  
            <div className="footer-links">
            <div class="footer-link-container"><Link to="/terms-of-use">Terms of Use</Link></div>
            <div class="footer-link-container"><Link to="/privacy">Privacy Policy</Link></div>
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

export const Membrane = (props) => {
    return (<>
        <Menu />
        {props.children}
        <Footer />
    </>
    )
}