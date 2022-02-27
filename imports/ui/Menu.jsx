import React from 'react';
// import { Link } from 'react-router-dom';


export const Menu = () => {
    document.body.classList.remove('background-no')
    return (
        <div className="menu" style= {{ display: "flex"}}>
            tesst
            <div>
                {/* <Link to="/">Home</Link> */}
            </div>
            <div>
                 {/* <Link to="/rain">Rain</Link> */}
            </div>
            {/* <div>
                <Link to="/fronteras">Fronteras</Link>
            </div> */}
            <div>
                {/* <Link to="/tiktok">TikTok</Link> */}
            </div>
            {/* <div>
                <Link to="/tasks">Tasks</Link>
            </div> */}
        </div>
    )
}