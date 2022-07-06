import React from 'react'
import {useState, useEffect} from 'react';
import MusicItem from '../MusicItem';

function MusicPicker({musicList, setMusicList}) {
  const [curSong, setCurSong] = useState({});
  const [isList] = useState(false);

  async function pickRandomMusic(e) {
    e.preventDefault();
    try {
      const APISong = "https://api.genius.com/songs/";
      let rand = Math.random();
      let songID = Math.round(rand*200000);
      const accessToken= "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
      let url = APISong+songID+accessToken;
      await fetch(url).then((res)=>res.json()).then((data)=>{
        if (data.meta.status === 200) {
          let song = data.response.song;
          let id = song.id;
          let title = song.full_title;
          let titleDisplay = title;
          if (titleDisplay.length > 50) {
            titleDisplay = titleDisplay.substring(0, 50) + "...";
          }
          let album = "";
          if (song.album !== null) {
            album = song.album.full_title;
          }
          let coverArt = song.song_art_image_url;
          let infoUrl = song.description_annotation.url;
          let musicUrl = song.apple_music_player_url;
          let songObject = {
            id: id,
            title: title,
            titleDisplay: titleDisplay,
            album: album,
            img: coverArt,
            infoUrl: infoUrl,
            musicUrl: musicUrl,
            random: rand
          };
          setCurSong(songObject);
        }
      });
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    let r = Math.round((curSong.random*3)*256);
    let g = Math.round((curSong.random*5)*256);
    let b = Math.round((curSong.random*7)*256);
    if (r > 256) {r = r % 256;}
    if (g > 256) {g = g % 256;}
    if (b > 256) {b = b % 256;}
    document.body.style.color = `rgb(${256-r}, ${256-g}, ${256-b})`;
    document.body.style.background = `rgb(${r}, ${g}, ${b})`;
  }, [curSong]);

  return (
    <>
    <form>
      <button onClick={pickRandomMusic} className="todo-button" type="submit">FEEL LUCKY</button>
    </form>
    <div className="align-center">
      <table width="1000px">
        <tr>
          <MusicItem isList={isList} curSong={curSong} musicList={musicList} setMusicList={setMusicList}/>
        </tr>
      </table>
    </div>
    </>
  )
}

/*
    <form>
        
        <div className="select">
          <select name="todos" className="filter-todo" onChange={handleStatus}>
            <option value="all">All</option>
            <option value="played">Played</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
    </form>*/

export default MusicPicker;

