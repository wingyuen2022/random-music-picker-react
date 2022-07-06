import React, {useState, useEffect} from 'react';
import './App.css';
import { PlayList, MusicPicker } from './components';
function App() {
  const [musicList, setMusicList] = useState([]);
  const [musicListDisplay, setMusicListDisplay] = useState([]);
  
  return (
    <div className="App">
      <MusicPicker musicList={musicList} setMusicList={setMusicList} />
      <PlayList musicList={musicList} setMusicList={setMusicList}/>
      <div className="align-center"><br></br>Random Music Picker React (wingyuen2022)</div>
	  <div className="align-center"><br></br>Powered by: <b><a href="https://docs.genius.com/" target="_blank">Genius API</a></b></div>
    </div>
  );
}

export default App;
