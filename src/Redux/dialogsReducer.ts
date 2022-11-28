const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    text: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, text: 'Hi!'},
        {id: 2, text: 'Hello!'},
        {id: 3, text: 'Guten Tag!'},
        {id: 4, text: 'Привет!'},
        {id: 5, text: 'Hola Amigo!'}
    ]as Array<MessagesType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action): InitialStateType => {

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
};

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageText: string
}

export const sendMessageCreator = (newMessageText: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageText});

export default dialogsReducer;