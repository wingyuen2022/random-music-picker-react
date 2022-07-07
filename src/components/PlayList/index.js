import React, { useContext, useEffect } from 'react';
import MusicItem from '../MusicItem';
import { MusicContext } from '../MusicContext/MusicContext';

const PlayList = () => {
  const { curList } = useContext(MusicContext);

  const renderRows = () => {
    return curList.map((cur) => (<tr> <MusicItem isList={true} curSong={cur}/> </tr>));
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