import React, { useContext, useEffect } from 'react';
import MusicItem from '../MusicItem';
import { MusicContext } from '../MusicContext/MusicContext';

const HistoryList = () => {
  const { history, setHistory } = useContext(MusicContext);

  const renderRows = () => {
    return history.map((cur) => (<tr key={cur.id}><MusicItem allowAdd={false} allowDel={true} curSong={cur} /></tr>));
  }

  useEffect(() => {
    renderRows();
  }, [history]);

  return (
    <>
      <table className='table-style'>
        { renderRows() }
      </table>
    </>
  );
}

export default HistoryList;