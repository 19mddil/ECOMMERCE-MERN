import axios from 'axios';
import { API } from '../utils/config';

export const register = user => {
    return axios.post(`${API}/user/signup`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const login = user => {
    return axios.post(`${API}/user/signin`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const sendEmail = (token, code) => {
    return axios.post(`${API}/user/send/email`, code, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const verifyUser = (token, data) => {
    return axios.post(`${API}/user/email/verify`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const sendEmailForForgottenPassword = (data) => {
    return axios.post(`${API}/user/send/email/forgot/password`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const updateUserWithNewPassword = data => {
    return axios.post(`${API}/user/set/new/password`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}