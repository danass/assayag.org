import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';

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
    // attach the event listener to the window
  


    return (
        <div className="menu" onScroll={(e)=> hideMenu(e)}>
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

export const isMobile = () => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true
       }
       return false
    }