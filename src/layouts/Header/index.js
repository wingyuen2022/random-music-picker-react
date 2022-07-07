import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav>
                <form>
                <button className="todo-button"><Link to="/"><h2>Home</h2></Link></button>
                <button className="todo-button"><Link to="/search"><h2>Search</h2></Link></button>
                <button className="todo-button"><Link to="/playlist"><h2>Playlist</h2></Link></button>
                </form>
            </nav>
        </>
    );
}

export default Header;
