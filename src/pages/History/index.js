import React, { useContext, useEffect } from 'react';
import HistoryList from '../../components/HistoryList';
import { MusicContext } from '../../components/MusicContext/MusicContext';

const History = () => {
    const historyLocalstorageName = "history-list";

    const { setHistory } = useContext(MusicContext);

    useEffect(()=>{
        // Load history
        let historyJSONString = localStorage.getItem(historyLocalstorageName);
        if (historyJSONString !== null &&
            typeof historyJSONString === 'string') {
            let history = JSON.parse(historyJSONString);
            setHistory(history);
        }
    }, []);

    const downloadHistory = () => {
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
                            <button className="custom-button" onClick={()=>downloadHistory()}>‣ Download history</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="align-center">
                                <HistoryList />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
};
export default History;