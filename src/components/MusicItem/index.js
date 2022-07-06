import React from 'react'

function MusicItem({isList, curSong, musicList, setMusicList}) {

  function addSong() {
    if (!musicList.find(cur => cur.id === curSong.id)) {
      setMusicList([ ...musicList, curSong]);
    }
  }

  function deleteSong() {
    setMusicList(musicList.filter((el) => (el.id !== curSong.id)))
  }

  return (
    <>
      <td><a href={curSong.infoUrl} target="_blank"><img src={curSong.img} width="175px" alt={curSong.title}></img></a></td>
      <td><h1>{curSong.titleDisplay}</h1><p>{curSong.album}</p></td>
      <td><iframe src={curSong.musicUrl} className="player" hidden={curSong==={}}></iframe></td>
      <td><a href="#" onClick={addSong} className="anchor" hidden={isList || curSong === {}}><h1>[ADD]</h1></a></td>
      <td><a href="#" onClick={deleteSong} className="anchor" hidden={!isList}><h1>[DEL]</h1></a></td>
    </>
  )
}

export default MusicItem;