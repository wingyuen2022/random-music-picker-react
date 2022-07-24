import React, { useEffect } from 'react'
import MusicItem from '../MusicItem';
import { getBackgroundCSSColor, getTextCSSColor } from '../../util/color.js';
import { setRandom } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const MusicPicker = () => {
  const LIMIT = 350000;

  const dispatch = useDispatch();
  const random = useSelector(state => state.randomReducer);

  const wait = async(time) => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  const pickRandomMusic = async (e) => {
    e.preventDefault();
    await getPlayableSongs().then((playableSongs)=>{
      wait(1500).then(()=>{
        console.log(playableSongs);
        if (playableSongs.length > 0) {
          dispatch(setRandom(playableSongs));
        } else {
          alert("No luck, please try again!");
        }
      });
    }).catch((err)=>{
      console.log(err);
    });
    return;
  };

  const getPlayableSongs = () => {
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
        let songID = Math.round(rand*LIMIT);
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
            let newSongObject = {
              id: id,
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
    if (random.length > 0) {
      renderHTML(random);
      const num = random[0].id;
      if (typeof num === 'number') {
        document.body.style.background = getBackgroundCSSColor(num, false);
        document.body.style.color = getTextCSSColor(num);
      }
    }
  }, [random]);

  const renderHTML = (random) => {
    return (
      <>
        <form>
          <button onClick={pickRandomMusic} className="btn btn-light" type="button">I FEEL LUCKY</button>
        </form>
        <div className="align-center">
          <table className='table-style'>
            { random.map((cur)=><tr key={cur.id}><MusicItem allowAdd={true} allowDel={false} curSong={cur} /></tr>) }
          </table>
        </div>
        </>
    );
  };

  return renderHTML(random);
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

