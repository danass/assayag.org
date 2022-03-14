import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => {
    document.querySelector('html').setAttribute('lang', 'en')
    return (
        <div className="menu">
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