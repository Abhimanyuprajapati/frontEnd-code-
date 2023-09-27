import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import facebook from  '../assets/loginPage/Group 292 (1).png';
import google from '../assets/loginPage/Group 294.png';
import whatsapp from  '../assets/loginPage/Group 292.png';
import user from "../assets/image/input_field_user.png";
import password from "../assets/image/input_field_password.png";
import logo from '../assets/logo/FilmCity.png';
import LoginOr from '../assets/loginPage/Group 66873.png';
import { useUserAuth } from '../context/UserAuthContext';
import withRedirect from '../components/Auth/Redirect';
import ReCAPTCHA from 'react-google-recaptcha';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

const Login = () => {
    const {handleFacebookSignIn, login_with_otp , handlegoogleSignIn,loginwithemail,forgetpass,verify} = useUserAuth();
    //state
    const [userinput,setuser]= useState('');
    const [loader,setloader]=useState(false);
    const [passwordinput,setpassword] = useState('');
    const [permission,setpermission]=useState('kangan');
    const [otp, setotp]=useState('')
    const [number , setnumber]=useState('')
    const [error,setError]=useState('')
    const [usercheck, setusercheck]= useState(true)
    const [show_msg,setshow_msg]=useState(false)
    const [flag1,setflag1]=useState(false)
    const [flag,setflag]=useState(false)
    var message='';
    var pattern = new RegExp(/^[0-9\b]+$/);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

     const handleuser =(e)=>{
        setuser(e.target.value)
        var ss = e.target.value
        if(ss.length === 10){
          pattern.test(e.target.value) ?   logic(e) : setusercheck(true);
        }
        //setusercheck(true)
     }

     const logic=(e)=>{
        setusercheck(false) 
        setnumber('+91-'+e.target.value)
        setotp('')
        setError('')
     }
     const handlepassword=(e)=>{
        setpassword(e.target.value)
     }
     const handlepassword_otp=(e)=>{
        setotp(e.target.value)
     }

    //validating its email sign in or mobile sign in using input value 
    const login=(e)=>{
        e.preventDefault()
        const exp = !!regex.test(userinput)
        if(userinput === ''){
          setshow_msg(true)
          setError('please fill the mandatory fields*')
        }
        else{
          if(usercheck){
            if(!exp){
              setshow_msg(true)
              setError('please enter a valid email*')
            }else{
              const data = {
              email: userinput,
              password:passwordinput,
              permission:permission
            }
              loginwithemail(data).then(res => {
                if(!res){
                  setError('something went wrong')
                }else{
                  setError(res.data.message)
                }
                }) 
            }
          }else{
            loginwithphone()
          }
          setshow_msg(true)
          }
    }

  const loginwithphone =async ()=>{   
    setloader(true)
    if(!flag){
      setError('please resolve recaptcha')
    }else{
      if(number.length === 14){
        const params = {
          phoneNumber:number,
          platform:'Web'
        }
        const data = await login_with_otp(params)
        setError(data.data.message) 
        setloader(false)
        if(data.data.code === 0){
          setflag1(true)
        } else{
          setflag1(false)
        } 
      }else{
        setError('please enter valid number') 
      }
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    if (otp === "" || otp === null) return setError("Please enter a valid OTP!");
    else{
      const params = {
        phoneNumber:number,
        platform:'Web',
        otp:otp
      }
      const data = await login_with_otp(params)
      setError(data.data.message)  
    }
  };


 const [check,setcheck]=useState(false)
  const handleforgetpassword=()=>{
    setcheck(!check)
    setuser('')
  }
  const forgetpassword=async (e)=>{
    e.preventDefault()
    const alert = await forgetpass(userinput)
    setError(alert)
    setshow_msg(true)
  }
  
 const handler=async (e)=>{
  if(e === null){
    setflag(false)
    setshow_msg(true)
    setError('recaptcha verfication unsuccessfull, please try agian later.')
  }else{
    const result = await verify(e);
    if(result.data.data.success){
      setflag(true)
      setError('')  
    }else{
      setError('Invalid Keys - Recaptcha')
    }
  }
 }
  return (
       <div className='LoginPage'>
        <div className='LoginPageDetail'>
          <Image src={logo} alt="image"  width="100" height="100"/>
          <h4 style={{color:"white"}}>Welcome to FILMCITY</h4>
            <p style={{color:"rgba(154, 149, 141, 1)"}}>Please Sign Up or Login for a better experience.</p>
            <h5 style={{color:"white"}}>Login / Register</h5>
            {/*<input type='text' placeholder='Enter your phone number' className='LoginPageInput'/><br/>
            <button style={{
              background: "linear-gradient(276.9deg, #E11E25 0%, #F6AD1B 100%)",
              width:"8rem",
               padding:"0.5rem",
               borderRadius:"1rem"
               }}>Continue</button><br/>
            <Image src={LoginOr} alt="image"/> <br/>*/} 
            <div className='Authbutton'>
            <button  onClick={handleFacebookSignIn} className='AuthLogin'><Image src={facebook} width={20} height={20} style={{marginRight:"0.7rem"}}/> Facebook</button>
            <button onClick={handlegoogleSignIn} className='AuthLogin'><Image src={google}  width={20} height={20} style={{marginRight:"0.7rem"}}/> Google</button>
            {/* <button style={{backgroundColor:"black",color:"rgba(146, 141, 133, 1)",padding:"0.5rem",borderRadius:"1rem",margin:"0px 1rem"}}><Image src={whatsapp}  width={20} height={20} style={{marginRight:"0.7rem"}}/> WhatsApp</button> */}
            </div>
          </div>
       </div>
  )
}

export default withRedirect(Login);


// this is register page  and login page of kangan code
{/* <section className="login">
<div className={ loader ? 'loader' : 'loader hide'}>
 <div className='spin'/>
 </div>
 <div className="logincontent left">
     <div className="content_area">
         <div className="content_inner_area">
             <Link href="/registration" className="login_logo"><Image src={logo} alt="ff" width="200" height="200"/></Link>
             <ul>
                 <li>New web series release every week</li>
                 <li>Unlimited streaming</li>
                 <li>HD + (2k) Qualtiy</li>
                 <li>Get full access to all premium content</li>
             </ul>
             <h3>Dont Have An Account?</h3>
             <div className="flip_btn_area">
                 <Link href="/register" className="flip_btn">REGISTER NOW</Link>
             </div>
         </div>
     </div>
 </div> 

 <div className="login_form right">
     <div className="login_form_area">
         <div className="login_inner_area">
             <Link href="/" className="back_home"><span>Back</span></Link>
           
             <div className="content_heading">
               <h2>Sign<span> In</span></h2>
               
               { show_msg ? 
                 <p style={{'color':'#ccc','marginTop':'10px'}}>{error}</p>
               :<p style={{'color':'#ccc','marginTop':'10px'}}>{!message ? '':message}</p>}
             </div>

             <form>
                 <div className="input_field_area">
                   {usercheck ? 
                     <div>
                     {check ? 
                     <div>
                     {/*password reset screen UI *
                     <i className="fa fa-arrow-left p-2" style={{'color':'#fff'}} onClick={()=> setcheck(!check)}></i>
                     <div className="input_field_col">
                         <span><Image src={user} alt="d" width="20" height="20"/></span>
                         <input required type="email" id="login_email" value={userinput} onChange={(e)=> setuser(e.target.value)} placeholder="Enter your email" />
                         <button className='login' onClick={forgetpassword}>Get Reset Link</button>
                     </div>
                     </div>
                     :
                     <div>
                     <p className="p-2" style={{'color':'#fff'}}><i className="fa fa-arrow-right"></i> <span className='p-2'>Sign In using Email</span></p>
                     <div className="input_field_col">
                         <span><Image src={user} alt="d" width="20" height="20"/></span>
                         <input type="email" id="login_email" onChange={handleuser} placeholder="enter your email or mobile number" />
                     </div>
                     
                     <div className="input_field_col">    
                         <span><Image src={password} alt="wd" width="20" height="20"/></span>
                         <input type="password" className='form-control' onChange={handlepassword} placeholder="enter password *"/>
                     </div> 
                     <ReCAPTCHA className='recap' sitekey={SITE_KEY} onChange={handler}/>
                     <div className="input_field_col">
                     <Link href="#" className="forgot" onClick={handleforgetpassword}>Forget Password?</Link>
                   
                     {flag ?
                     <button className='login' onClick={login}><p>LOGIN</p></button>:
                     <button className='login disbaled' disabled onClick={login}>LOGIN</button>
                     }
                     
                     </div>
                     </div>
                       }
                     
                     </div>
                     :

                     <div>
                       <p className="p-2" style={{'color':'#fff'}}><i className="fa fa-arrow-left" onClick={()=> setusercheck(!usercheck)}></i> 
                       <span className='p-2'>Sign In using Mobile </span>
                     </p>
                     <div className='input_field_col'>
                     <span><Image src={user} alt="user" width="20" height="20"/></span>
                     <input type="text" className='form-control' value={number} onChange={(e)=>setnumber(e.target.value)}  placeholder="Enter phone number*"/>
                     </div>
                     
                     {flag1 ?
                     <div className="input_field_col mt-3">
                       <span>
                       <svg style={{'width':'24px','height':'24px','color':'#fff','marginLeft':'-3px'}} viewBox="0 0 24 24">
                           <path fill="currentColor" d="M19 13C19.34 13 19.67 13.04 20 13.09V10C20 8.9 19.11 8 18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.89 4 10V20C4 21.11 4.89 22 6 22H13.81C13.3 21.12 13 20.1 13 19C13 15.69 15.69 13 19 13M9 6C9 4.34 10.34 3 12 3S15 4.34 15 6V8H9V6M12 17C10.9 17 10 16.11 10 15S10.9 13 12 13C13.1 13 14 13.89 14 15C14 16.11 13.11 17 12 17M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" />
                       </svg>
                       </span>
                       <input type="password"  onChange={handlepassword_otp} placeholder="Enter OTP *"/>
                     </div> :''}
                     <ReCAPTCHA className='recap' sitekey={SITE_KEY} onChange={handler}/>
                     <div className="input_field_col mt-2">
                     {flag  ? 
                     flag1 ?<button className='login' onClick={verifyOtp}>Submit</button>:<button className='login' onClick={login}>GET OTP</button>:
                     flag1 ?<button className='login' disabled onClick={verifyOtp}>Submit</button>:<button className='login disbaled' disabled onClick={login}>GET OTP</button>
                     }
                     </div>
                     </div>}
                 </div>
             </form>
             
             <div className="or_devider"><span>OR</span></div>
             <ul className="social_connect">
                 <li>
                 <div id="otpless" custom="true" style={{'userSelect':'none'}}><span><Image width="20" height="20" src={whatsapp} alt=""/></span> Whatsapp</div>
                 </li>
                 <li onClick={handleFacebookSignIn}><span><Image width="20" height="20" src={facebook} alt=""/></span> Facebook</li>
                 <li onClick={handlegoogleSignIn}><span><Image width="20" height="20" src={google} alt=""/></span> Google</li>
             </ul>
         </div>
     </div>
 </div>
</section> */}