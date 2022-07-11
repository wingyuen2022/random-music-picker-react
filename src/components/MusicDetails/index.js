export const getMusicDetails = (songId) => {
    return new Promise((resolve, reject) => {
        try {
          const url = `https://api.genius.com/songs/${songId}?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx`;
          fetch(url).then((res)=>res.json()).then((data)=>{
            if (data.meta.status === 200) {
              let song = data.response.song;
              let apple_music_id = song.apple_music_id;
              if (apple_music_id !== undefined && apple_music_id !== null) {
                resolve(song);
              } else {
                reject("apple_music_id is null");
              }
            } else {
              reject("Status: " + data.meta.status + " with songId: " + songId);
            }
          });
        } catch(err) {
          reject(err);
        }
      });
};