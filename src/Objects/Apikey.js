import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;
const apiKEY=process.env.REACT_APP_API_KEY;
const Apikey = axios.create({
    baseURL: baseURL,
    headers:{
    "API-KEY":apiKEY
    }
});
export default Apikey;

