import React, { useContext } from 'react';


export default function Navbar() {
    return (
        <nav className="nav">
            <div>
                <a href="/" className="site-title">
                    Site Name
                </a>
            </div>
            <ul>
                <CustomLink href="/task">Task Manager</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>
                {children}
            </a>
        </li>
    );
}
