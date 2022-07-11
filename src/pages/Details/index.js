import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getBackgroundCSSColor } from '../../util/color.js';
import MusicItem from '../../components/MusicItem';

const Details = () => {
    const { songId } = useParams();
    const [ curSong, sentCurSong] = useState(null);

    useEffect(()=>{
        if (songId !== undefined && songId !== null) {
            sentCurSong({id: songId, random: Math.random()});
            document.body.style.background = getBackgroundCSSColor(Math.random(), false);
        }
    }, [songId]);

    const renderHTML = () => {
        if (curSong !== null) {
            return (
                <>
                    <div class="align-center">
                        <table className='table-style'>
                            <tr>
                                <MusicItem allowAdd={false} allowDel={false} curSong={curSong} />
                            </tr>
                        </table>
                    </div>
                </>
            );
        }
    };

    return renderHTML();
};
export default Details;