import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;
const apiKEY=process.env.REACT_APP_API_KEY;

if(localStorage.token){
    var Access = localStorage.getItem('token');
}

const Instance = axios.create({
    baseURL: baseURL,
    headers:{
    "Content-Type": "application/json",
    "API-KEY":apiKEY,
    "access-token":Access
    }
});
export default Instance;

