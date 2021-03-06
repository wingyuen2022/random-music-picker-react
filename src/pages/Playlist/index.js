import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PlayList from '../../components/PlayList';
import { MusicContext } from '../../components/MusicContext/MusicContext';

const Playlist = () => {
    const localstorageName = "play-list";
    const navigate = useNavigate();
    const { playlist, setPlaylist } = useContext(MusicContext);

    useEffect(()=>{
        // Load playlist
        let playlistJSONString = localStorage.getItem(localstorageName);
        if (playlistJSONString !== null &&
            typeof playlistJSONString === 'string') {
            let playlist = JSON.parse(playlistJSONString);
            setPlaylist(playlist);
        }
    }, []);

    const downloadPlaylist = () => {
        let playlistString = localStorage.getItem(localstorageName);
        if (typeof playlistString === 'string' && playlistString !== "[]") {
            let blob = new Blob([playlistString], {
                type: "text/plain;charset=utf-8"
            });
            const fileSaver = require('file-saver');
            fileSaver.saveAs(blob, "Historylist");
        }
    };

    const importPlaylist = () => {
        navigate("/playlist/import");
    };

    return (
        <>
            <div className="align-center">
                <table>
                    <tr>
                        <td>
                            <button className="custom-button" onClick={()=>downloadPlaylist()}>‣ Download Playlist ({ playlist.length })</button>
                            <button className="custom-button" onClick={()=>importPlaylist()}>‣ Import Playlist</button>
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