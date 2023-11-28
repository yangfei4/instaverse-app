import * as api from "../api";
import {
    AUTHENTICATION
} from "../constants/actionTypes";

export const login = (formValues, navigate) => async dispatch => {
    try {
        const { data } = await api.login(formValues);
        dispatch({
            type: AUTHENTICATION, 
            data: data
        });
        navigate("/");
    } catch (error) {
        window.alert("Invalid password or email");
        console.log(error.message);
    }
};

export const signup = (formValues, navigate) => async dispatch => {
    try {
        const { data } = await api.signup(formValues);
        dispatch({
            type: AUTHENTICATION, 
            data: data
        });
        navigate("/");
    } catch (error) {
        window.alert("Please provide valid credentials");
        console.log(error.message);
    }
};