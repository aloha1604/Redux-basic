console.log(window.Redux);

const { createStore } = window.Redux;
//state
//reducer
//store

const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        default:
            return state;

    }
    return state;
}

const store = createStore(hobbyReducer);

//-----------
// render Redux hobby list

const renderHobbyList = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

    const ulElenment = document.querySelector('#hobbyListId');
    if (!ulElenment) return;


    //reset previous content of ul
    ulElenment.innerHTML = '';

    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;

        ulElenment.appendChild(liElement);
    }

}

//render intinal hobby list

const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);


// handel form submit

const hobbyFormElement = document.querySelector('#hobbyFormId');

if (hobbyFormElement) {
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
        if (!hobbyTextElement) {
            console.log('SUBMIT');
        }

        console.log('Subbmit', hobbyTextElement.value);
        const action = {
            type: 'ADD_HOBBY',
            payload: hobbyTextElement.value
        };

        store.dispatch(action);
        // reset form
        hobbyFormElement.reset('');
    };

    hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    console.log('SATE UPDATE:', store.getState());
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);

    localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
});







