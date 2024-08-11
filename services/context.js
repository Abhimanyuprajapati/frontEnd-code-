import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKEY=process.env.NEXT_PUBLIC_API_KEY;
var token,userId;
if (typeof window !== 'undefined') {
    // Perform localStorage action
    token =localStorage.getItem('access-token') ;
    userId = localStorage.getItem('id') 
  }
const Instance = axios.create({
    baseURL: baseURL,
    headers:{
    "Content-Type": "application/json",
    "signature":"kWVK7yyA9i7NWo9tJpl6ZpZYvsk=",
    }
});

const Access = axios.create({
    baseURL: baseURL,
    headers:{
    "Content-Type": "application/json",
    "signature":"kWVK7yyA9i7NWo9tJpl6ZpZYvsk=",
    "accesstoken":token
    }
});
const Key = axios.create({
    baseURL: baseURL,
    headers:{
    "Content-Type": "application/json",
    "signature":"kWVK7yyA9i7NWo9tJpl6ZpZYvsk=",
    "API-KEY":apiKEY
    }
});
const Multipart = axios.create({
    baseURL: baseURL,
    headers:{
    "userId":userId,
    "signature":"kWVK7yyA9i7NWo9tJpl6ZpZYvsk=",
    "accesstoken":token
    }
});
export {Access,Key,Multipart,Instance};