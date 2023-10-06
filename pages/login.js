import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
import Image from 'next/image'
import facebook from '../assets/loginPage/Group 292 (1).png';
import google from '../assets/loginPage/Group 294.png';
// import whatsapp from '../assets/loginPage/Group 292.png';
// import user from "../assets/image/input_field_user.png";
// import password from "../assets/image/input_field_password.png";
// import logo from '../assets/logo/FilmCity.png';
// import LoginOr from '../assets/loginPage/Group 66873.png';
import { useUserAuth } from '../context/UserAuthContext';
import withRedirect from '../components/Auth/Redirect';
// import ReCAPTCHA from 'react-google-recaptcha';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

const Login = () => {
  const { handleFacebookSignIn, login_with_otp, handlegoogleSignIn, loginwithemail, forgetpass, verify } = useUserAuth();
  //state
  const [userinput, setuser] = useState('');
  const [loader, setloader] = useState(false);
  const [passwordinput, setpassword] = useState('');
  const [permission, setpermission] = useState('kangan');
  const [otp, setotp] = useState('')
  const [number, setnumber] = useState('')
  const [error, setError] = useState('')
  const [usercheck, setusercheck] = useState(true)
  const [show_msg, setshow_msg] = useState(false)
  const [flag1, setflag1] = useState(false)
  const [flag, setflag] = useState(false)
  var message = '';
  var pattern = new RegExp(/^[0-9\b]+$/);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const handleuser = (e) => {
    setuser(e.target.value)
    var ss = e.target.value
    if (ss.length === 10) {
      pattern.test(e.target.value) ? logic(e) : setusercheck(true);
    }
    //setusercheck(true)
  }

  const logic = (e) => {
    setusercheck(false)
    setnumber('+91-' + e.target.value)
    setotp('')
    setError('')
  }
  const handlepassword = (e) => {
    setpassword(e.target.value)
  }
  const handlepassword_otp = (e) => {
    setotp(e.target.value)
  }

  //validating its email sign in or mobile sign in using input value 
  const login = (e) => {
    e.preventDefault()
    const exp = !!regex.test(userinput)
    if (userinput === '') {
      setshow_msg(true)
      setError('please fill the mandatory fields*')
    }
    else {
      if (usercheck) {
        if (!exp) {
          setshow_msg(true)
          setError('please enter a valid email*')
        } else {
          const data = {
            email: userinput,
            password: passwordinput,
            permission: permission
          }
          loginwithemail(data).then(res => {
            if (!res) {
              setError('something went wrong')
            } else {
              setError(res.data.message)
            }
          })
        }
      } else {
        loginwithphone()
      }
      setshow_msg(true)
    }
  }

  const loginwithphone = async () => {
    setloader(true)
    if (!flag) {
      setError('please resolve recaptcha')
    } else {
      if (number.length === 14) {
        const params = {
          phoneNumber: number,
          platform: 'Web'
        }
        const data = await login_with_otp(params)
        setError(data.data.message)
        setloader(false)
        if (data.data.code === 0) {
          setflag1(true)
        } else {
          setflag1(false)
        }
      } else {
        setError('please enter valid number')
      }
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    if (otp === "" || otp === null) return setError("Please enter a valid OTP!");
    else {
      const params = {
        phoneNumber: number,
        platform: 'Web',
        otp: otp
      }
      const data = await login_with_otp(params)
      setError(data.data.message)
    }
  };


  const [check, setcheck] = useState(false)
  const handleforgetpassword = () => {
    setcheck(!check)
    setuser('')
  }
  const forgetpassword = async (e) => {
    e.preventDefault()
    const alert = await forgetpass(userinput)
    setError(alert)
    setshow_msg(true)
  }

  const handler = async (e) => {
    if (e === null) {
      setflag(false)
      setshow_msg(true)
      setError('recaptcha verfication unsuccessfull, please try agian later.')
    } else {
      const result = await verify(e);
      if (result.data.data.success) {
        setflag(true)
        setError('')
      } else {
        setError('Invalid Keys - Recaptcha')
      }
    }
  }
  return (
    <div className='login_page_css '>
      <h1>Login</h1>
      <p>Please enter your phone number to continue with us</p>
      <div>
        <fieldset>
          <legend>Phone Number</legend>
          <input type='number' placeholder='+00 9874561230' className='LoginPageInput' /><br />
        </fieldset>
        <input type="password" onChange={handlepassword} placeholder="enter password" /><br />
        <p>Forgot Password?</p>
        <button>Login</button>
        <p>or</p>
      </div>
      <div className=''>
        <button onClick={handlegoogleSignIn} className=''><Image src={google} width={20} height={20} style={{ marginRight: "0.7rem" }} /> Google</button>
        <button onClick={handleFacebookSignIn} className=''><Image src={facebook} width={20} height={20} style={{ marginRight: "0.7rem" }} /> Facebook</button>
      </div>
    </div>
  )
}

export default withRedirect(Login);


// filmcity login code

{/* <div className='LoginPage'>
<div className='LoginPageDetail'>
  <Image src={logo} alt="image"  width="100" height="100"/>
  <h4 style={{color:"white"}}>Welcome to FILMCITY</h4>
    <p style={{color:"rgba(154, 149, 141, 1)"}}>Please Sign Up or Login for a better experience.</p>
    <h5 style={{color:"white"}}>Login / Register</h5>
    <div className='Authbutton'>
    <button  onClick={handleFacebookSignIn} className='AuthLogin'><Image src={facebook} width={20} height={20} style={{marginRight:"0.7rem"}}/> Facebook</button>
    <button onClick={handlegoogleSignIn} className='AuthLogin'><Image src={google}  width={20} height={20} style={{marginRight:"0.7rem"}}/> Google</button>
    </div>
  </div>
</div> */}

{/*<input type='text' placeholder='Enter your phone number' className='LoginPageInput'/><br/>
            <button style={{
              background: "linear-gradient(276.9deg, #E11E25 0%, #F6AD1B 100%)",
              width:"8rem",
               padding:"0.5rem",
               borderRadius:"1rem"
               }}>Continue</button><br/>
    <Image src={LoginOr} alt="image"/> <br/>*/}
