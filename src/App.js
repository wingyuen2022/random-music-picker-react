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
      <div className="align-center">
        <br></br><br></br>
        Random Music Picker React (wingyuen2022)
		<br>
		<a src="https://docs.genius.com/" target="_blank">Genius API</a>
      </div>
    </div>
  );
}

export default App;
