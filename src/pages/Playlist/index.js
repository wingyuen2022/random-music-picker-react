import React, { useContext } from 'react';
import PlayList from '../../components/PlayList';
import { MusicContext } from '../../components/MusicContext/MusicContext';

const Playlist = () => {
    const { curList, setCurList } = useContext(MusicContext);

    const savePlayList = () => {
        if (curList.length > 0) {
            localStorage.setItem("playlist", JSON.stringify(curList));
            alert("Saved playlist");
        }
    };

    const loadPlayList = () => {
        let playlistString = localStorage.getItem("playlist");
        if (typeof playlistString === 'string') {
            let loadedList = JSON.parse(playlistString);
            setCurList(loadedList)
            alert("Loaded playlist");   
        }
    };

    const clearPlayList = () => {
        if (window.confirm("Confirm to delete the playlist?")) {
            localStorage.setItem("playlist", "[]");
            alert("Deleted");
        }
    };

    const downloadPlayList = () => {
        let playlistString = localStorage.getItem("playlist");
        if (typeof playlistString === 'string' && playlistString !== "[]") {
            let blob = new Blob([playlistString], {
                type: "text/plain;charset=utf-8"
            });
            const fileSaver = require('file-saver');
            fileSaver.saveAs(blob, "Playlist");
        }
    };

    const launchFileSelector = () => {
        const fileInput = document.getElementById("filePlaylist");
        fileInput.click();
    };

    const uploadPlayList = () => {
        const fileName = document.getElementById("filePlaylist").value;
        const fs = require('fs');
        fs.readFile(fileName, 'utf8', (err, data) => {
            console.log(data);
        });
    };

    return (
        <>
            <div className="align-center">
                <table>
                    <tr>
                        <td>
                            <div>
                                <h2>Cookies: </h2>
                                <button className="custom-button" onClick={()=>savePlayList()}>‣ Save playlist</button>
                                <button className="custom-button" onClick={()=>loadPlayList()}>‣ Load playlist</button>
                                <button className="custom-button" onClick={()=>clearPlayList()}>‣ Delete playlist</button>
                                <h2>File: </h2>
                                <button className="custom-button" onClick={()=>downloadPlayList()}>‣ Download playlist</button>
                                <button className="custom-button" onClick={()=>launchFileSelector()}>‣ Upload playlist</button>
                                <input id="filePlaylist" type="file" onChange={()=>uploadPlayList()} hidden></input>
                                <br />
                                <br />
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