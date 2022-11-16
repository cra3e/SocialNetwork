import {ProfileAPI, UsersAPI} from "../API/Api";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 10},
        {id: 2, post: 'It\'s my first post!', likesCount: 15},
        {id: 3, post: 'Fuck that shit!', likesCount: 2},
        {id: 4, post: 'IT WORKS!', likesCount: 656},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                post: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId),
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await UsersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export default profileReducer;