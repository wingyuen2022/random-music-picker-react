const playlistReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_PLAYLIST":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
export default playlistReducer;