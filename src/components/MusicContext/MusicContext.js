import React, { createContext, useState, useEffect } from 'react';

export const MusicContext = createContext();

export const MusicProvider = (props) => {
    //const historyLocalstorageName = "history-list";

    const [random, setRandom] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [history, setHistory] = useState([]);

    /*
    useEffect(()=>{
        // Save to history
        if (curSong !== undefined && 
                curSong !== null && 
                curSong.id !== undefined &&
                history !== undefined &&
                history !== null) {
            if (!history.find(cur => cur.id === curSong.id)) {
                const newHistoryList = [ ...history, curSong ];
                // Save song to history list
                setHistory(newHistoryList);
                // Save song to localstorage
                localStorage.setItem(historyLocalstorageName, JSON.stringify(newHistoryList));
            }
        }

        // Load history
        let historyJSONString = localStorage.getItem(historyLocalstorageName);
        if (historyJSONString !== null &&
            typeof historyJSONString === 'string') {
            let history = JSON.parse(historyJSONString);
            setHistory(history);
        }
    }, [curSong]);
    */
    return (
        <MusicContext.Provider value={{random, setRandom, playlist, setPlaylist, history, setHistory}}>
            { props.children }
        </MusicContext.Provider>
    );
};