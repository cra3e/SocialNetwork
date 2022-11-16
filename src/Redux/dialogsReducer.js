const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ],
    messages: [
        {id: 1, text: 'Hi!'},
        {id: 2, text: 'Hello!'},
        {id: 3, text: 'Guten Tag!'},
        {id: 4, text: 'Привет!'},
        {id: 5, text: 'Hola Amigo!'}
    ],
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = action.newMessageText;
            return  {
                ...state,
                messages: [...state.messages, {id: state.messages.length + 1, text: newMessage}],
            };
        default:
            return state;
    }
    /*
        return stateCopy;
    */
};

export const sendMessageCreator = (newMessageText) => ({type: SEND_MESSAGE, newMessageText});

export default dialogsReducer;