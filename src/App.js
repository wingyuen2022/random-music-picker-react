import React, {useState, useEffect} from 'react';
import './App.css';
import { PlayList, MusicPicker } from './components';
function App() {
  const [musicList, setMusicList] = useState([]);
  const [musicListDisplay, setMusicListDisplay] = useState([]);

  /*function filterHandler() {
    if (status === 'all') {
      setTodosDisplay(todos);
    } else if (status === 'completed') {
      setTodosDisplay(todos.filter(cur=>(cur.completed === true)));
    } else if (status === 'uncompleted') {
      setTodosDisplay(todos.filter(cur=>(cur.completed === false)));
    }
  }

  useEffect(()=>{
    filterHandler();
  }, [todos, status])
*/
  return (
    <div className="App">
      <MusicPicker musicList={musicList} setMusicList={setMusicList} />
      <PlayList musicList={musicList} setMusicList={setMusicList}/>
      <div className="align-center">
        <br></br><br></br>
        Random Music Picker React (wingyuen2022)
      </div>
    </div>
  );
}

export default App;
