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
    useEffect(() => {
        window.addEventListener('scroll', () => {
            // if the user is scrolling
            if (isScrolling() > 30) {
                document.getElementById('main-container-header-title').classList.add('menu-dissapear');
            }
            else {
                document.getElementById('main-container-header-title').classList.remove('menu-dissapear');
            }
        });
    }, [])

    return (
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
    )
}

export const Footer = () => {
    return (
        <div id="main-container-footer">
            <div id="footer-copyright">
                Copyright © 2022. All rights reserved
            </div>
        </div>
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