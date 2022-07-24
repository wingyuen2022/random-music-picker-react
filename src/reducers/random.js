const randomReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_RANDOM":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
export default randomReducer;