import React, { useContext, useEffect } from 'react'
import MusicItem from '../MusicItem';
import { getBackgroundCSSColor, getTextCSSColor } from '../../util/color.js';
import { MusicContext } from '../MusicContext/MusicContext';

const MusicPicker = () => {
  const {curSong, setCurSong } = useContext(MusicContext);

  async function pickRandomMusic(e) {
    e.preventDefault();
    await getOnePlayableSongs().then((playableSongs)=>{
      console.log(playableSongs);
      wait1Second().then(()=>{
        const firstSong = playableSongs[0];
        if (firstSong !== undefined && firstSong !== null) {
          console.log(firstSong);
          setCurSong(firstSong);
        } else {
          alert("No luck, please try again!");
        }
      });
    }).catch((err)=>{
      console.log(err);
    });
    return;
  };

  const wait1Second = async() => {
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const getOnePlayableSongs = () => {
    return new Promise((resolve, reject) => {
      let playableSongs = [];
      let promises = [];
      for (let index = 0; index < 7; index++) {
        let rand = Math.random();
        promises.push(getASong(rand));
      }
      Promise.all(promises.map((curPromise)=>curPromise.catch((err)=>err)));
      //console.log(promises);
      promises.map((curPromise)=>{
        curPromise.then((curSong)=>{
          playableSongs.push(curSong);
        }).catch((err)=>err);
      });
      resolve(playableSongs);
    });
  };

  const getASong = (rand) => new Promise((resolve, reject) => {
    const newSong = new Promise((resolve, reject) => {
      try {
        const APISong = "https://api.genius.com/songs/";
        let songID = Math.round(rand*200000);
        const accessToken= "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
        let url = APISong+songID+accessToken;
        fetch(url).then((res)=>res.json()).then((data)=>{
          if (data.meta.status === 200) {
            let song = data.response.song;
            let apple_music_id = song.apple_music_id;
            if (apple_music_id !== undefined && apple_music_id !== null) {
              resolve(song);
            } else {
              reject("apple_music_id is null");
            }
          } else {
            reject("Status: " + data.meta.status + " with songID: " + songID);
          }
        });
      } catch(err) {
        reject(err);
      }
    });
    newSong.then((curSong)=>{
      //console.log("Has apple music ID: " + curSong.apple_music_id);
      try {
        const apple_music_id = curSong.apple_music_id;
        const url = `https://itunes.apple.com/lookup?entity=song&id=${apple_music_id}`;
        fetch(url).then((res)=>res.json()).then((res)=>{
          let list = res.results;
          if (list !== undefined && list !== null && typeof list === 'object' && list.length > 0) {
            let id = curSong.id;
            let title = curSong.full_title;
            let titleDisplay = title;
            if (titleDisplay.length > 50) {
              titleDisplay = titleDisplay.substring(0, 50) + "...";
            }
            let album = "";
            if (curSong.album !== null) {
              album = curSong.album.full_title;
            }
            let coverArt = curSong.song_art_image_url;
            let infoId = curSong.description_annotation.id;
            let year = curSong.release_date;
            if (year !== null) {
              year = year.substring(0, 4);
              titleDisplay = titleDisplay + " ( " + year + " ) ";
            }
            let newSongObject = {
              id: id,
              apple_music_id: apple_music_id,
              infoId: infoId,
              title: title,
              titleDisplay: titleDisplay,
              album: album,
              img: coverArt,
              year: year,
              random: rand
            };
            resolve(newSongObject);
          } else {
            reject("Not found in iTune");
          }
        }).catch((err)=>{
          reject(err);
        });
      } catch(err) {
        reject(err);
      }
    }).catch((err)=>{
      reject(err);
    });
  });

  useEffect(()=>{
    const rand = curSong.random;
    document.body.style.background = getBackgroundCSSColor(rand, false);
    document.body.style.color = getTextCSSColor(rand);
  }, [curSong]);

  return (
    <>
    <form>
      <button onClick={pickRandomMusic} className="todo-button">I FEEL LUCKY</button>
    </form>
    <div className="align-center">
      <table width="1000px">
        <tr>
          <MusicItem allowAdd={false} allowDel={false} curSong={curSong} />
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

