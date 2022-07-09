import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav className="sticky-top">
                <div className="sticky-top">
                    <Link className="custom-button" to="/">Home</Link>
                    <Link className="custom-button" to="/random">Random</Link>
                    <Link className="custom-button" to="/playlist">Playlist</Link>
                </div>
            </nav>
            <br />
        </>
    );
}

// <Link className="custom-button" to="/history">History</Link>

export default Header;
