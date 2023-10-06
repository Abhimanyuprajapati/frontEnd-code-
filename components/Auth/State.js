import React, { useEffect, useState } from "react";
import Header from "../Header";
// import Footer from "../Footer";
import { useUserAuth } from "../../context/UserAuthContext";
const withState =Component=> {
  const Auth =(props) => {
    // Login data added to props via redux-store (or use react context for example)
    const {isLoggedIn}=useUserAuth();
    const [state ,setstate]=useState(false)
    useEffect(()=>{
      isLoggedIn().then(res=>{
        if(res === true){
            setstate(true)
        }
        //Router.replace('/login')
    })
    })
    
    return (
      <div className="outer">
      <Header state={state}/>
      <Component {...props} />
      {/* <Footer/> */}
      </div>
    );
  };
  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
}; 
export default withState;