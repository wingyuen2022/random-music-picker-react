import React, { useContext } from 'react';
import { MusicContext } from '../MusicContext/MusicContext';

function MusicItem({allowAdd, allowDel, curSong}) {
  const historyLocalstorageName = "history-list";

  const {history, setHistory} = useContext(MusicContext);
  
  const addSong = (targetSong) => {
    if (!history.find(cur => cur.id === targetSong.id)) {
      setHistory([ ...history, targetSong ]);  
    }
  };

  const deleteSong = (targetSong) => {
    if (window.confirm("Delete [ " + targetSong.titleDisplay + " ] ?")) {
      const newHistoryList = history.filter((cur) => (cur.id !== targetSong.id));
      // Save song to history list
      setHistory(newHistoryList);
      // Save song to localstorage
      localStorage.setItem(historyLocalstorageName, JSON.stringify(newHistoryList));
      alert("Deleted");
    }
  };

  return (
    <>
      <td className="image-td"><a href={ `https://genius.com/${ curSong.infoId }` } target="_blank"><img src={curSong.img} width="175px" alt={curSong.title}></img></a></td>
      <td>
        <h1>{curSong.titleDisplay}</h1>
        <p>{curSong.album}</p>
        <iframe id={ curSong.id } class="player" src={ `https://genius.com/songs/${ curSong.id }/apple_music_player` } hidden={ curSong.apple_music_id === null || curSong.apple_music_id === undefined }></iframe>
      </td>
      <td>
        <button onClick={()=>addSong(curSong)} className="custom-button" hidden={!allowAdd || curSong.id === undefined}>Add</button>
        <button onClick={()=>deleteSong(curSong)} className="custom-button" hidden={!allowDel}>Del</button>
      </td>
    </>
  )
}

export default MusicItem;