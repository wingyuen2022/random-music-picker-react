import React, { useContext } from 'react';
import { getBackgroundCSSColor, getTextCSSColor } from '../../util/color.js';
import { MusicContext } from '../MusicContext/MusicContext';

const MusicItem = ({allowAdd, allowDel, curSong}) => {
  const playlistLocalstorageName = "play-list";

  const { playlist, setPlaylist } = useContext(MusicContext);

  const wait1Second = async() => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };
  
  const addSong = (targetSong) => {
    if (targetSong !== undefined && 
          targetSong !== null && 
          targetSong.id !== undefined &&
          playlist !== undefined &&
          playlist !== null) {
      if (!playlist.find(cur => cur.id === targetSong.id)) {
          const newPlaylist = [ ...playlist, targetSong ];
          // Save song to playlist
          setPlaylist(newPlaylist);
          // Save song to localstorage
          localStorage.setItem(playlistLocalstorageName, JSON.stringify(newPlaylist));
          const musicDiv = document.getElementById("music_" + targetSong.id);
          if (musicDiv !== undefined && musicDiv !== null) {
            musicDiv.hidden = true;
          }
          alert("Added");
      }
    }
  };

  const deleteSong = (targetSong) => {
    if (window.confirm("Delete [ " + targetSong.titleDisplay + " ] ?")) {
      const newPlaylistList = playlist.filter((cur) => (cur.id !== targetSong.id));
      // Save song to playlist
      setPlaylist(newPlaylistList);
      // Save song to localstorage
      localStorage.setItem(playlistLocalstorageName, JSON.stringify(newPlaylistList));
      alert("Deleted");
    }
  };

  const renderHTML = (curSong) => {
    let html = ``;
    if (curSong.id !== undefined && curSong.id !== null) {
      html = (
        <>
          <td>
            <div id={ "music_" + curSong.id }>
              <table className='table-style'>
                <tr>
                  <td className="image-td"><a href={ `https://genius.com/${ curSong.infoId }` } target="_blank"><img src={curSong.img} width="175px" alt={curSong.title}></img></a></td>
                  <td>
                    <h1>{curSong.titleDisplay}</h1>
                    <p>{curSong.album}</p>
                    <iframe id={ "iframe_" + curSong.id } className="player" src={ `https://genius.com/songs/${ curSong.id }/apple_music_player` } hidden={ curSong.apple_music_id === null || curSong.apple_music_id === undefined }></iframe>
                  </td>
                  <td>
                    <button onClick={()=>addSong(curSong)} className="custom-button" hidden={!allowAdd}>Add</button>
                    <button onClick={()=>deleteSong(curSong)} className="custom-button" hidden={!allowDel}>Del</button>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </>
      );
      wait1Second().then(()=>{
        const iframe = document.getElementById("iframe_" + curSong.id);
        if (iframe !== undefined && iframe !== null) {
          iframe.style.background = getBackgroundCSSColor(curSong.random, true);
          iframe.style.color = getTextCSSColor(curSong.random);
        }
      });
    }
    return html;
  };

  return renderHTML(curSong);
}

export default MusicItem;