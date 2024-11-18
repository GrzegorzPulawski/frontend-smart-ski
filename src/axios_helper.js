import axios from "axios";
import {jwtDecode} from "jwt-decode";

axios.defaults.baseURL ="https://smart-ski-a8fba8950c38.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers["Content-Type"] = 'application/json';

export const getAuthToken =() => {
    return window.localStorage.getItem("auth_token");
};
export const setAuthToken = (token) => {
     window.localStorage.setItem("auth_token", token);
};
export const getUserRole = () => {
    const token = getAuthToken();
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.role;
    }
    return null;
};
export const isUserInRole = (role) => {
    const userRole = getUserRole();
    return userRole === role;
};
export const request = (method, url, data) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null"){
        headers = {"Authorization": `Bearer ${getAuthToken()}`};
    }
    return axios({
        method:method,
        headers: headers,
        url: url,
        data: data
    });
};

export default axios;
