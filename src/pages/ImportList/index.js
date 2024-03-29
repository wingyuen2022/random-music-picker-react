import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { setPlaylist } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Import = () => {
    const localstorageName = "play-list";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlist = useSelector(state => state.playlistReducer);

    useEffect(()=>{
        // Load playlist
        let playlistJSONString = localStorage.getItem(localstorageName);
        if (playlistJSONString !== null &&
            typeof playlistJSONString === 'string') {
            let playlist = JSON.parse(playlistJSONString);
            dispatch(setPlaylist(playlist));
        }

        const textArea = document.getElementById("importPlaylist");
        textArea.value = JSON.stringify(playlist);
    }, []);

    const addSong = (e) => {
        e.preventDefault();
        const songId = document.getElementById("addSong").value;
        if (songId !== undefined && songId !== null && songId !== "" && songId !== 0) {
            const newPlaylist = [ ...playlist, {"id": songId} ];
            // Save song to playlist
            dispatch(setPlaylist(newPlaylist));
            // Save song to localstorage
            localStorage.setItem(localstorageName, JSON.stringify(newPlaylist));
            alert("Added");
            navigate("/playlist");
        } else {
            alert("Song ID must be a number");
        }
    };

    const importList = (e) => {
        e.preventDefault();
        const newPlaylist = document.getElementById("importPlaylist").value;
        if (formatValid(newPlaylist)) {
            if (window.confirm("Confirm to replace list in your localstorage?")) {
                // Save song to playlist
                dispatch(setPlaylist(JSON.parse(newPlaylist)));
                // Save song to localstorage
                localStorage.setItem(localstorageName, newPlaylist);
                alert("Imported");
                navigate("/playlist");
            }
        }
    };

    const formatValid = (string) => {
        if (string.length < 10) {
            alert("List format seems incorrect");
            return false;
        }
        if (string.substring(0,7) !== '[{"id":') {
            alert("List format seems incorrect");
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="align-center">
                <table>
                    <tr>
                        <td>
                            <div className="align-center">
                                <form>
                                    <label for="addSong"><h1>Song ID:</h1></label>
                                    <input id="addSong" type="number"></input>
                                    <button onClick={addSong} className="btn btn-light" type="button">Add Song</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <form>
                                <label for="importPlaylist"><h1>Playlist:</h1></label>
                                <textarea id="importPlaylist" className="text-area"></textarea>
                                <button onClick={importList} className="btn btn-light" type="button">Import</button>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <form>
                                <button onClick={(e)=>{
                                    e.preventDefault();
                                    navigate("/playlist");
                                }} className="btn btn-light" type="button">Back</button>
                            </form>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
};
export default Import;