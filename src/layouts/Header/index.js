import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav>
                <form>
                <Link className="custom-button" to="/"><h2>Home</h2></Link>
                <Link className="custom-button" to="/random"><h2>Random</h2></Link>
                <Link className="custom-button" to="/playlist"><h2>Playlist</h2></Link>
                </form>
            </nav>
        </>
    );
}

export default Header;
