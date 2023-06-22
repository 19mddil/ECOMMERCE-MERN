import { API } from "../utils/config";
import axios from 'axios';

export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` //it will go to authorize middleware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}

export const createProduct = (token, data) => {
    console.log(data);
    return axios.post(`${API}/product`, data, {
        headers: {
            'Authorization': `Bearer ${token}` //it will go to authorize middleware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}

export const getCategories = () => {
    return axios.get(`${API}/category`);
}
