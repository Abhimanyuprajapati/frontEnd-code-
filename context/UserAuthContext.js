import { createContext, useContext,useState } from "react";
import { Access,Key,Multipart,Instance} from "../services/context";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import {auth} from '../services/firebase.js';
import { useRouter } from "next/router";
const userAuthContext = createContext();
export function UserAuthContextProvider({ children}) {
  const router = useRouter();
  var qq = null;
  if (typeof window !== 'undefined'){
    qq = localStorage.getItem('subscribed');
  }

const login_with_whatsapp=async(data)=>{
  return Instance.post('/loginWithWhatsapp',data)
    .then(res=>{
      console.log(res)
      if(res.data.error === false && res.data.data){
        login('login_with_whatsapp')
        if(qq === null && res.data.data.subscription_enddate){
          localStorage.setItem('subscribed',true)
        }else{
          localStorage.removeItem('subscribed');
        }
        localStorage.setItem('access-token',res.data.data.accessToken)
        localStorage.setItem('id',res.data.data.userId)
        refresh()
      }
      return res
    }).catch(err=>{
      console.log(err)
    })
}

const allSubscriptions=async()=>{
   const data = {
    "platform":"Android Phone",
    "countryCode":"in"
  }
  return Key.post('getAllPackages',data)
  .then(res=>{
    if(res.data.code === 0){
      return res.data.data
     }else{
      return []
     }
  }).catch(err=>{
    return err
  })
}
const allSubscriptionsprivate=async(userId)=>{
  const data = {
   "platform":"Android Phone",
   "countryCode":"in",
   "userId":userId
 }
 return Key.post('getPackages',data)
 .then(res=>{
   if(res.data.code === 0){
    return res.data.data
   }else{
    return []
   }
 }).catch(err=>{
   return err
 })
}
const allPayments=async()=>{
  const data ={
    "status":"active"
  }
  return Access.post('listPaymentGateways',data)
  .then(res=>{
    if(res.data.code === 0){
      return res.data.data
     }else{
      return []
     }
  }).catch(err=>{
    return err
  })
}

const contactus=async (data)=>{
  return Instance.post('/createSupportTicket',data)
  .then(res =>{
    return res;
  })
}

const Upcomingcontents=async()=>{
  return Instance.post('/getUpcoming')
  .then(res=>{
      return res.data.data;
  }).catch(err=>{
    console.log(err)
  })

}
const player=async (data)=>{
  return Access.post('/getplayInfoNew',data)
  .then(res =>{
    return res
  }).catch(err =>{
    console.log(err)
  })
}
const allContents=async(data)=>{
  return Access.get('/getContents?index=0&&limit=50')
  .then(res=>{
    if(res.data.code === 0){
      return res.data.data
     }else{
      return []
     }
  }).catch(err=>{    
    return null
  })
}

function facebookSignIn() {
  const facebookAuthProvider = new FacebookAuthProvider();
  return signInWithPopup(auth, facebookAuthProvider);
}
const handleFacebookSignIn = async (e) => {
  e.preventDefault();
  try {
    await facebookSignIn()
      .then(res => {
        login('facebook')
        register_mobile(res.user, res.providerId)
      })

  } catch (error) {
    console.log(error.message);
  }
};

const handlegoogleSignIn=(e)=>{
  e.preventDefault()
  const googleAuthProvider = new GoogleAuthProvider();
  const che = googleAuthProvider.addScope("email");
  signInWithPopup(auth, che)
  .then(res=>{    
    register_mobile(res.user,res.providerId)
  });
}
const register_mobile=async(user,providerId)=>{
  var obj = user.providerData[0] ;
  var nm = obj.phoneNumber
  var ne = obj.displayName
  var profile = obj.photoURL
  var email = obj.email
  var permission ;
  if(providerId === 'facebook.com'){
    permission = 'facebook'
  }else if(providerId === 'google.com'){
    permission='google'
  }else{
    permission='phone'
  }
  
  const data = {
    'name': !ne ? '':ne,
    'email':!email ? '':email ,
    'password':'',
    'permission':permission,
    'mobile': !nm ? '':nm,
    'profilePic': !profile ? '':profile,
    'fireBaseAuthUserID':obj.uid,
  }
  const response = await Signup(data)
  return response
}
//registration API call
const Signup= async(data)=>{
  return Access.post('/registration',data)
  .then(res =>{
    if(res.data.error === false){
      if(res.data.data.subscription_enddate){
        qq === null ? localStorage.setItem('subscribed',true) :''
      }
      localStorage.setItem('id',res.data.data.userId)
      localStorage.setItem('access-token',res.data.data.accessToken)
      router.replace('/')
      refresh()
    }
    return res.data
  }).catch(err =>{
    console.log(err)
  })
}
const refresh=()=>{
  setTimeout(()=>{
    window.location.reload()
},1000)}

const logout=()=>{
  signOut(auth);
  localStorage.clear()
  router.push('/')
}
const login_with_otp=async(data)=>{
  return Instance.post('/loginWithOTP', data)
      .then(res => {
        if (res.data.error === false && res.data.data) {
          if(res.data.data.subscription_enddate){
            qq === null ? localStorage.setItem('subscribed',true) :''
          }
          localStorage.setItem('access-token',res.data.data.accessToken)
          localStorage.setItem('id', res.data.data.userId)
          router.replace('/')
          refresh()
        }
        return res
      }).catch(err => {
        console.log(err)
      })
}
const loginwithemail=async (data)=>{
  try {
    const res = await Access.post('/login', data);
    if (res.data.error === false) {
      if(res.data.data.subscription_enddate){
        qq === null ? localStorage.setItem('subscribed',true) :''
      }
      localStorage.setItem('access-token', res.data.data.accessToken);
      localStorage.setItem('id', res.data.data.userID);
      router.replace('/')
    }
    return res;
  } catch (err) {
    console.log(err);
  }
}
const forgetpass=()=>{

}
const verify = async (token) => {
  const params = {
    token: token
  }
  return Instance.post('/verifyrecaptcha', params)
    .then(res => {
      return res
    }).catch(err => {
      return err
    })
}
const userData =async(userId)=>{
  if(userId !== undefined){
    const data = {
      'userId':userId
    }
    return Access.post('/getProfile',data)
    .then(res => {
      return res;
    }).catch(err=>{
      console.log(err)
    })
  }
}
const isLoggedIn=async()=>{
  const flag = localStorage.getItem('id');  
  if(flag !== null && flag !== undefined ){
    return true
  }else{
    return false
  }
} 
const ChangePassword = async (data) => {
  return Access.post('/changePassword', data).then(res => {
    return res.data
  }).catch(err => {
    if (err.response?.code === 403) {
      logout()
    }
  })
}
  return (
    <userAuthContext.Provider
      value={{
        isLoggedIn,
        allSubscriptions,
        allSubscriptionsprivate,
        contactus,
        Upcomingcontents,
        player,
        allContents,
        allPayments,
        handleFacebookSignIn,
        handlegoogleSignIn,
        loginwithemail,
        login_with_otp,
        forgetpass,
        verify,
        userData,
        logout,
        Signup,
        verify,
        ChangePassword,
        login_with_whatsapp
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}