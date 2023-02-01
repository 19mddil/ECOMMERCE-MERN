import { API } from "../utils/config";
import axios from 'axios';

export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}
