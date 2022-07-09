import React, { createContext, useState, useEffect } from 'react';

export const MusicContext = createContext();

export const MusicProvider = (props) => {
    const historyLocalstorageName = "history-list";

    const [curList, setCurList] = useState([]);
    const [curHistory, setHistory] = useState([]);
    const [curSong, setCurSong] = useState({});

    useEffect(()=>{
        // Save to history
        if (curSong !== undefined && 
                curSong !== null && 
                curSong.id !== undefined &&
                curHistory !== undefined &&
                curHistory !== null) {
            if (!curHistory.find(cur => cur.id === curSong.id)) {
                console.log(curSong);
                const newHistoryList = [ ...curHistory, curSong ];
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

    return (
        <MusicContext.Provider value={{curSong, setCurSong, curList, setCurList, curHistory, setHistory}}>
            { props.children }
        </MusicContext.Provider>
    );
};