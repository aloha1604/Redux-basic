console.log(window.Redux);

const { createStore } = window.Redux;
//state
//reducer
//store

const initialState = [
    'Listen to music',
];

const hobbyReducer = (state = initialState, action) => {
    return state;
}

const store = createStore(hobbyReducer);

//-----------


