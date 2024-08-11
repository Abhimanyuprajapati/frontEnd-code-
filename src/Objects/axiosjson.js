import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;
const apiKEY=process.env.REACT_APP_API_KEY;

const sampler = axios.create({
    baseURL: baseURL,
    headers:{
    "Content-Type": "application/json",
    "API-KEY":apiKEY
    }
});
export default sampler;