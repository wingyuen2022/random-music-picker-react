export const setPlaylist = (playlist) => {
    return {
        type: "SET_PLAYLIST",
        payload: playlist
    }
};

export const setRandom = (random) => {
    return {
        type: "SET_RANDOM",
        payload: random
    }
};