import React, { useContext } from 'react';
import { MusicContext } from '../MusicContext/MusicContext';

function MusicItem({isList, curSong}) {
  const {curList, setCurList} = useContext(MusicContext);
  
  const addSong = (targetSong) => {
    if (!curList.find(cur => cur.id === targetSong.id)) {
      setCurList([ ...curList, targetSong ]);  
    }
  }

  const deleteSong = (targetSong) => {
    setCurList(curList.filter((el) => (el.id !== targetSong.id)))
  }
  
  return (
    <>
      <td className="image-td"><a href={curSong.infoUrl} target="_blank"><img src={curSong.img} width="175px" alt={curSong.title}></img></a></td>
      <td>
        <h1>{curSong.titleDisplay}</h1>
        <p>{curSong.album}</p>
        <iframe src={curSong.musicUrl} className="player" hidden={(curSong.id===undefined)}></iframe>
      </td>
      <td>
        <button onClick={()=>addSong(curSong)} className="todo-button" hidden={isList || curSong.id === undefined}><h2>[ADD]</h2></button>
        <button onClick={()=>deleteSong(curSong)} className="todo-button" hidden={!isList}><h2>[DEL]</h2></button>
      </td>
    </>
  )
}

export default MusicItem;