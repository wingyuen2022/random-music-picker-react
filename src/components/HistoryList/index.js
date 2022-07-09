import React, { useContext, useEffect } from 'react';
import MusicItem from '../MusicItem';
import { MusicContext } from '../MusicContext/MusicContext';

const HistoryList = () => {
  const { curHistory } = useContext(MusicContext);

  const renderRows = () => {
    return curHistory.map((cur) => (<tr key={cur.id}><MusicItem allowAdd={false} allowDel={false} curSong={cur}/></tr>));
  }

  useEffect(() => {
    renderRows();
  }, [curHistory]);

  return (
    <>
      <table className='table-style'>
        { renderRows() }
      </table>
    </>
  );
}

export default HistoryList;