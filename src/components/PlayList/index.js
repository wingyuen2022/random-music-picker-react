import React from 'react'
import MusicItem from '../MusicItem';

function PlayList({musicList, setMusicList}) {
  return (
    <div className="todo-container">
        <table className='table-style'>
            {musicList.map((curSong) => (<tr> <MusicItem isList={true} curSong={curSong} musicList={musicList} setMusicList={setMusicList}/> </tr>))}
        </table>
    </div>
  );
}

export default PlayList;