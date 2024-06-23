import React, { useContext } from 'react';
import { AuthContext } from './pages/Authentication/AuthContext.js';

export default function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="nav">
            <div>
                <a href="/" className="site-title">
                    Site Name
                </a>
            </div>
            <ul>
                <CustomLink href="/pricing">Pricing</CustomLink>
                <CustomLink href="/about">About</CustomLink>
                {isAuthenticated ? (
                    <CustomLink onClick={logout}>Logout</CustomLink>
                ) : (
                    <CustomLink href="/signinout">Signin</CustomLink>
                )}
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
