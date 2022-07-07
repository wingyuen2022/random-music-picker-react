import React, { useContext } from 'react';
import PlayList from '../../components/PlayList';
import { MusicContext } from '../../components/MusicContext/MusicContext';

const Playlist = () => {
    const { curList, setCurList } = useContext(MusicContext);

    const savePlayList = () => {
        if (curList.length > 0) {
            localStorage.setItem("playlist", JSON.stringify(curList));
            alert("Saved");
        }
    };

    const loadPlayList = () => {
        let playlistString = localStorage.getItem("playlist");
        if (typeof playlistString === 'string') {
            let loadedList = JSON.parse(playlistString);
            setCurList(loadedList)
            alert("Loaded");   
        }
    };

    const clearPlayList = () => {
        localStorage.setItem("playlist", "[]");
        alert("Cleared");   
    };

    return (
        <>
            <div className="align-center">
                <table>
                    <tr>
                        <td>
                            <div className="align-center">
                                <button className="custom-button" onClick={()=>savePlayList()}>‣ Save to lsit</button>
                                <button className="custom-button" onClick={()=>loadPlayList()}>‣ Load from list</button>
                                <button className="custom-button" onClick={()=>clearPlayList()}>‣ Clear your list</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="align-center">
                                <PlayList />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
};
export default Playlist;