import {AuthAPI, SecurityAPI} from "../API/Api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'crz/auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'crz/auth/GET_CAPTCHA_URL';

type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

type setAuthUserDataPayloadActionType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataPayloadActionType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL,
    payload: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await AuthAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email, captcha} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true, captcha));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, catpcha: string) => async (dispatch: any) => {
    let response = await AuthAPI.login(email, password, rememberMe, catpcha);
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());

        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error!';
        dispatch(stopSubmit('login', {_error: message}));

    }}
};

export const logout = () => async (dispatch) => {
    let response = await AuthAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
    };

export default authReducer;