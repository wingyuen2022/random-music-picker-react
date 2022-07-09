import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav class="sticky-top">
                <div class="sticky-top">
                    <Link className="custom-button" to="/">Home</Link>
                    <Link className="custom-button" to="/random">Random</Link>
                    <Link className="custom-button" to="/history">History</Link>
                </div>
            </nav>
            <br />
        </>
    );
}

// <Link className="custom-button" to="/playlist">Playlist</Link>

export default Header;
