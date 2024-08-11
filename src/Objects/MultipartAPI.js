import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;
const apiKEY=process.env.REACT_APP_API_KEY;

const MultipartAPI = axios.create({
    baseURL: baseURL,
    headers:{
    "Content-Type": "multipart/form-data",
    "API-KEY":apiKEY
    }
});
export default MultipartAPI;