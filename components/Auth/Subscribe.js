import React,{useState,useEffect} from "react";
import Router from "next/router";
import Header from "../Header";
import Footer from "../Footer";
// import Footer from "../Footer";
import { useUserAuth } from "../../context/UserAuthContext";
const withSubscribe=Component=> {
  const Auth =(props) => {
    // Login data added to props via redux-store (or use react context for example)
    const {isLoggedIn}=useUserAuth();
    const [state ,setstate]=useState(false)
    const [toggle ,settoggle]=useState(false)
    useEffect(()=>{
    const subs = localStorage.getItem('subscribed');
    if (subs === null || subs === undefined) {
      console.log(subs)
    }else{
      Router.replace('/')
    }

    isLoggedIn().then(res=>{
      if(res === true){
          setstate(true)
      }
    })
    },[])
   
    // If user is logged in, return original component
    return (
      <div className="outer">
     <Header state={state} toggle={toggle}/>
      <Component {...props} />
      <Footer more={()=>settoggle(!toggle)}/>
      </div>
    );
  };
  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
}; 
export default withSubscribe;