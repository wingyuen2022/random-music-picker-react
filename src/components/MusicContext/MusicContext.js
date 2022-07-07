import React, { createContext, useState } from 'react';


export const MusicContext = createContext();

export const MusicProvider = (props) => {
    const [curList, setCurList] = useState([]);
    const [curSong, setCurSong] = useState({});

    return (
        <MusicContext.Provider value={{curSong, setCurSong, curList, setCurList}}>
            { props.children }
        </MusicContext.Provider>
    );
};