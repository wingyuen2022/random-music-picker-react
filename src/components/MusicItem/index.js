import React, { useContext } from 'react';
import { getBackgroundCSSColor, getTextCSSColor } from '../../util/color.js';
import { MusicContext } from '../MusicContext/MusicContext';

const MusicItem = ({allowAdd, allowDel, curSong}) => {
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

  const renderHTML = (curSong) => {
    let html = ``;
    if (curSong.id !== undefined && curSong.id !== null) {
      html = (
        <>
          <td className="image-td"><a href={ `https://genius.com/${ curSong.infoId }` } target="_blank"><img src={curSong.img} width="175px" alt={curSong.title}></img></a></td>
          <td>
            <h1>{curSong.titleDisplay}</h1>
            <p>{curSong.album}</p>
            <iframe id={ curSong.id } className="player" src={ `https://genius.com/songs/${ curSong.id }/apple_music_player` } hidden={ curSong.apple_music_id === null || curSong.apple_music_id === undefined }></iframe>
          </td>
          <td>
            <button onClick={()=>addSong(curSong)} className="custom-button" hidden={!allowAdd}>Add</button>
            <button onClick={()=>deleteSong(curSong)} className="custom-button" hidden={!allowDel}>Del</button>
          </td>
        </>
      );
      const iframe = document.getElementById(curSong.id);
      if (iframe !== undefined && iframe !== null) {
        iframe.style.background = getBackgroundCSSColor(curSong.random, true);
        iframe.style.color = getTextCSSColor(curSong.random);
      }
    }
    return html;
  };

  return (
    <>
      { renderHTML(curSong) }
    </>
  )
}

export default MusicItem;