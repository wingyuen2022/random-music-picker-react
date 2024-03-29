import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { default as Layout } from './layouts';
import * as Pages from './pages';

const App = () => {
  return (
    <>
      <div className="App">
        <Layout />
        <Routes>
          <Route path="/" element={<Pages.Random />} />
          <Route path="/song/:songId" element={<Pages.Details />} />
          <Route path="/random" element={<Pages.Random />} />
          <Route path="/playlist" element={<Pages.Playlist />} />
          <Route path="/playlist/import" element={<Pages.ImportList />} />
          <Route path="*" element={<Pages.NotFound />} />
        </Routes>
        <div className="align-center"><br></br>Random Music Picker React (wingyuen2022)</div>
        <div className="align-center"><br></br><b>Powered by: <a href="https://docs.genius.com/" target="_blank">Genius API</a></b></div>
      </div>
    </>
  );
}

// <Route path="history" element={<Pages.History />} />

export default App;
