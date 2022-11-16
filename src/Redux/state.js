import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, post: 'Hi, how are you?', likesCount: 10},
                {id: 2, post: 'It\'s my first post!', likesCount: 15},
                {id: 3, post: 'Fuck that shit!', likesCount: 2},
                {id: 4, post: 'IT WORKS!', likesCount: 656},
            ],
            newPostText: 'Чиркани пару строк, братишка'
        },
        dialogsPage: {
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
            newMessageText: 'Как дела?'
        }
    },

    getState() {return this._state},
    subscribe(observer) {this._callSubscriber = observer;},

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
        }
};

export default store;
window.store = store;