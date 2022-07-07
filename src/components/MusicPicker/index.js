import React, { useContext, useEffect } from 'react';
import Invert from 'invert-color';
import MusicItem from '../MusicItem';
import { MusicContext } from '../MusicContext/MusicContext';

function MusicPicker() {
  const {curSong, setCurSong} = useContext(MusicContext);

  async function pickRandomMusic(e) {
    e.preventDefault();
    let rand = Math.random();
    getARandomMusic(rand).then((song)=>{
      setCurSong(song);
    }).catch((err) => {
      console.log(err);
    });
    return;
  }

  const getARandomMusic = (rand) => {
    return new Promise((resolve, reject) => {
      try {
        const APISong = "https://api.genius.com/songs/";
        let songID = Math.round(rand*200000);
        const accessToken= "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
        let url = APISong+songID+accessToken;
        fetch(url).then((res)=>res.json()).then((data)=>{
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
            let year = song.release_date;
            if (year !== null) {
              year = year.substring(0, 4);
              titleDisplay = titleDisplay + " ( " + year + " ) ";
            }
            let songObject = {
              id: id,
              title: title,
              titleDisplay: titleDisplay,
              album: album,
              img: coverArt,
              infoUrl: infoUrl,
              musicUrl: musicUrl,
              year: year,
              random: rand
            };
            resolve(songObject);
          } else {
            reject("Status: " + data.meta.status + " with songID: " + songID);
          }
        });
      } catch(err) {
        reject(err);
      }
    });
  }

  useEffect(()=>{
    let r = Math.round((curSong.random*3)*256);
    let g = Math.round((curSong.random*5)*256);
    let b = Math.round((curSong.random*7)*256);
    if (r > 256) {r = r % 256;}
    if (g > 256) {g = g % 256;}
    if (b > 256) {b = b % 256;}
    document.body.style.background = `rgb(${r}, ${g}, ${b})`;
    let hex = Invert([r,g,b]);
    r = parseInt( hex.substring( 1, 3 ), 16 );
    g = parseInt( hex.substring( 3, 5 ), 16 );
    b = parseInt( hex.substring( 5, 7 ), 16 );
    document.body.style.color = `rgb(${r}, ${g}, ${b})`;
    renderRow();
  }, [curSong]);

  const renderRow = () => {
    return (<MusicItem isList={false} curSong={curSong} />);
  };

  return (
    <>
    <form>
      <button onClick={pickRandomMusic} className="todo-button">I FEEL LUCKY</button>
    </form>
    <div className="align-center">
      <table width="1000px">
        <tr>
          { renderRow() }
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

