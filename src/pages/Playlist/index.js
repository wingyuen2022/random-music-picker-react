import React, { useContext, useEffect } from 'react';
import PlayList from '../../components/PlayList';
import { MusicContext } from '../../components/MusicContext/MusicContext';

const Playlist = () => {
    const historyLocalstorageName = "play-list";

    const { playlist, setPlaylist } = useContext(MusicContext);

    useEffect(()=>{
        // Load playlist
        let playlistJSONString = localStorage.getItem(historyLocalstorageName);
        if (playlistJSONString !== null &&
            typeof playlistJSONString === 'string') {
            let playlist = JSON.parse(playlistJSONString);
            setPlaylist(playlist);
        }
    }, []);

    const downloadPlaylist = () => {
        let playlistString = localStorage.getItem(historyLocalstorageName);
        if (typeof playlistString === 'string' && playlistString !== "[]") {
            let blob = new Blob([playlistString], {
                type: "text/plain;charset=utf-8"
            });
            const fileSaver = require('file-saver');
            fileSaver.saveAs(blob, "Historylist");
        }
    };

    return (
        <>
            <div className="align-center">
                <table>
                    <tr>
                        <td>
                            <button className="custom-button" onClick={()=>downloadPlaylist()}>‣ Download Playlist ({ playlist.length })</button>
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