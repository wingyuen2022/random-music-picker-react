import React, { useContext, useEffect } from 'react';
import MusicItem from '../MusicItem';
import { MusicContext } from '../MusicContext/MusicContext';

const PlayList = () => {
  const { curList, setCurList } = useContext(MusicContext);

  const renderRows = () => {
    return curList.map((cur) => (<tr key={cur.id}><MusicItem allowAdd={false} allowDel={true} curSong={cur} /></tr>));
  }

  useEffect(() => {
    renderRows();
  }, [curList]);

  return (
    <>
      <table className='table-style'>
        { renderRows() }
      </table>
    </>
  );
}

export default PlayList;