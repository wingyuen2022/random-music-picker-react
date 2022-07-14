import React, { useContext } from 'react';
import { getBackgroundCSSColor, getTextCSSColor } from '../../util/color.js';
import { MusicContext } from '../MusicContext/MusicContext';
import { getMusicDetails } from '../../components/MusicDetails/index.js';

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
    getMusicDetails(curSong.id).then((res)=>{
      if (res.id !== undefined && res.id !== null) {
        const imgDiv = document.getElementById("image_" + curSong.id);
        if (imgDiv !== undefined && imgDiv !== null) {
          imgDiv.innerHTML = `<a href='https://genius.com/${ res.description_annotation.id }' target='_blank'><img src='${res.song_art_image_url}' width='175px' alt='${res.full_title}'></img></a>`;
        }
        const contentDiv = document.getElementById("content_" + curSong.id);
        if (contentDiv !== undefined && contentDiv !== null) {
          let albumTitle = "";
          if (res.album !== null){
            albumTitle = res.album.full_title
          }
          let year = "";
          if (res.release_date != null) {
            year = res.release_date.substring(0, 4);
          }
          contentDiv.innerHTML = `<h1>${ res.full_title }</h1><p>${ albumTitle }</p><p><b>${ year }</b></p>`;
        }
        const urlDiv = document.getElementById("url_" + curSong.id);
        if (urlDiv !== undefined && urlDiv !== null) {
          let urlHTML = ``;
          const urlList = res.media;
          urlList.map((cur)=>{
            urlHTML = urlHTML + `<a href='${ cur.url }' target='_blank'>${ cur.provider } URL</a><br />`;
          });
          urlDiv.innerHTML = urlHTML;
          const playerDiv = document.getElementById("player_" + curSong.id);
          playerDiv.innerHTML = `<iframe id='iframe_${ res.id }' src='https://genius.com/songs/${ res.id }/apple_music_player'></iframe>`;
        }
        wait1Second().then(()=>{
          const backgroundColor = getBackgroundCSSColor(curSong.id, true);
          const textColor = getTextCSSColor(curSong.id);
          const contentStyle = document.getElementById("content_" + curSong.id);
          if (contentStyle !== undefined && contentStyle !== null) {
            contentStyle.style.color = textColor;
          }
          const urlStyle = document.getElementById("url_" + curSong.id);
          if (urlStyle !== undefined && urlStyle !== null) {
            const urlsStyle = urlStyle.getElementsByTagName("a");
            for (let ind = 0; ind < urlsStyle.length; ind++) {
              let cur = urlsStyle[ind];
              cur.style.color = textColor;
              cur.style.fontWeight = "bold";
            }
          }
          const iframeStyle = document.getElementById("iframe_" + curSong.id);
          if (iframeStyle !== undefined && iframeStyle !== null) {
            iframeStyle.style.background = backgroundColor;
            iframeStyle.style.color = textColor;
            iframeStyle.style.width = "600px";
            iframeStyle.style.height = "50px";
          }
          const playerStyle = document.getElementById("player_" + curSong.id);
          if (playerStyle !== undefined && playerStyle !== null) {
            playerStyle.style.color = textColor;
          }
        });
      }
    }).catch((err)=>{
        console.log(err);
    });
    
    return (
      <>
        <td>
          <div id={ "music_" + curSong.id }>
            <table className='table-style'>
              <tr>
                <td>
                  <div id={ "image_" + curSong.id } className="image-td"></div>
                </td>
                <td>
                  <div id={ "content_" + curSong.id }></div>
                  <br />
                  <div id={ "url_" + curSong.id }></div>
                  <div id={ "player_" + curSong.id }></div>
                </td>
                <td>
                  <button onClick={()=>addSong(curSong)} className="custom-button" hidden={!allowAdd}>Add</button>
                  <button onClick={()=>deleteSong(curSong)} className="custom-button" hidden={!allowDel}>Del</button>
                </td>
                <td>
                  <hr />
                </td>
              </tr>
            </table>
          </div>
        </td>
      </>
    );
  };

  return renderHTML(curSong);
}

//const youtubeUrl = youtubeObj.url.replace('http://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
//const youtubeDiv = document.getElementById("youtube_" + curSong.id);
//youtubeDiv.innerHTML = `<iframe width='560' height='315' src='${ youtubeUrl }' title='YouTube video player' frameborder='0' ></iframe>`;

export default MusicItem;