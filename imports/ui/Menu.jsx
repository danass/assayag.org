import React from 'react';

export const Menu = () => {
    return (
        <div className="menu" style= {{ display: "flex"}}>
            <div>
                <a href="/">Home</a>
            </div>
            <div>
                <a href="/rain">Rain</a>
            </div>
            <div>
                <a href="/fronteras">Fronteras</a>
            </div>
            <div>
                <a href="/tasks">Tasks</a>
            </div>
        </div>
    )
}