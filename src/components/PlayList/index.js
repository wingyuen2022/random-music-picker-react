import React, { useEffect } from 'react';
import MusicItem from '../MusicItem';
import { useSelector } from "react-redux";

const PlayList = () => {
  const playlist = useSelector(state => state.playlistReducer);

  const renderRows = () => {
    return playlist.map((cur) => (<tr key={cur.id}><MusicItem allowAdd={false} allowDel={true} curSong={cur} /></tr>));
  }

  useEffect(() => {
    renderRows();
  }, [playlist]);

  return (
    <>
      <table className='table-style'>
        { renderRows() }
      </table>
    </>
  );
}

export default PlayList;