import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import withRedirect from '../components/Auth/Redirect'
import facebook from "../assets/image/facebook_icon.png";
import google from "../assets/image/google_icon.png";
import emmail from '../assets/image/input_field_email.png';
import user from "../assets/image/input_field_user.png";
import password from "../assets/loginPage/lock.png";
import EyePassword from "../assets/loginPage/mail.png"
import logo from '../assets/logo/kangan.png';
import { useUserAuth } from '../context/UserAuthContext';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha'
import termsandcondition from './termsandcondition';
const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;
const register = () => {
    const { handleFacebookSignIn, handleGoogleSignIn, Signup, register_mobile, verify } = useUserAuth();
    const [passwordalert, setpasswordalert] = useState({ pass: '', match: '' })
    const [name, setname] = useState('')
    const [loader, setloader] = useState(false)
    const [emailinput, setemail] = useState('')
    const [passwordinput, setpassword] = useState('')
    const [confirmp, setconfirmp] = useState('')
    const [gender, setgender] = useState('')
    const [dob, setdob] = useState({})
    const [check, setcheck] = useState(false)
    const [usercheck, setusercheck] = useState(true)
    const [number, setnumber] = useState('')
    const [otp, setotp] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState('')
    const [flag, setflag] = useState(false)
    const [flag_indicator, setflagind] = useState(false)

    const register = (e) => {
        e.preventDefault();
        registerwithemail()
    }

    var pattern = new RegExp(/^[0-9\b]+$/);
    var regularExpression = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const handleuser = (e) => {
        var email_val = e.target.value
        if (email_val !== '') {
            setemail(email_val)
            setem('')
        }
    }

    const handlepassword = (e) => {
        let pass_val = e.target.value
        /*regularExpression.test(e.target.value) ? setpassword(e.target.value) : validation()*/
        if (pass_val !== '') {
            setpassword(pass_val)
            setpasswordalert({ pass: '' })
        }
    }
    const handleconfirmpassword = (e) => {
        setconfirmp(e.target.value)
    }
    //Linkpi for registration using email 
    const [em, setem] = useState('')
    const [alert_name, setalert_name] = useState('')
    const [alert_dob, setalert_dob] = useState('')
    const [ui_msg, setui_msg] = useState('')
    const [datevalid, setdatevalid] = useState(false)
    const [msg, setmsg] = useState('')
    //call for register with phone number 

    const handledate = (e) => {
        setdob(e.target.value)
        const d = e.target.value;
        const ch = d.split('-').join('/')
        ValidateDOB(ch)
    }

    function ValidateDOB(date) {
        var dateString = new Date(date);
        var curr_date = new Date();
        var take_dateString = dateString.getUTCFullYear();
        var take_curr_date = curr_date.getUTCFullYear();
        const diff = take_curr_date - take_dateString;
        if (diff < 14) {
            setalert_dob('age must be greater than 14 years')
            setdatevalid(false)
        } else {
            setalert_dob('')
            setdatevalid(true)
        }

    }

    const handlegenre = (e) => {
        setgender(e.target.value)
    }

    const handlename = (e) => {
        setname(e.target.value)
        if (e.target.value.length > 0) {
            setalert_name('')
        }
    }

    const handle = (e) => {
        setmsg('')
        setcheck(e.target.checked)
    }
    //registeration API
    const registerwithemail = async () => {
        const exp = !!regex.test(emailinput)
        if (check !== true) {
            setmsg('please accept terms and condition')
        }
        if (name === '') {
            setalert_name('Name is mandatory')
        }
        if (exp === false) {
            setem('Enter a valid email ')
        }
        if (!regularExpression.test(passwordinput)) {
            setpasswordalert({ pass: 'Password must contain minimum 1 unique special character and 1 numeric value.' })
        }
        if (passwordinput !== confirmp) {
            setpasswordalert({ match: 'Confirm Password not matching' })
        }
        if (check === true && regularExpression.test(passwordinput) && passwordinput === confirmp && exp === true && datevalid === true) {
            setpasswordalert({ pass: '', match: '' })
            setalert_name('')
            setmsg('')
            setem('')
            const dateToday = new Date(dob)
            const birth = Date.parse(dateToday)

            const data = {
                name: name,
                email: emailinput,
                password: passwordinput,
                permission: 'kangan',
                dob: birth,
                userGenre: gender
            }
            const response = await Signup(data)
            setflagind(true)
            setui_msg(response.message)
        } else {
            setui_msg('please fill up all the mandatory details')
            setflagind(false)
        }
    }
    const handler = async (e) => {
        if (e === null) {
            setflag(false)
            setflagind(true)
            setui_msg('recaptcha verfication unsuccessfull, please try agian later.')
        } else {
            const result = await verify(e);
            if (result.data.data.success) {
                setflag(true)
                setui_msg('')
            }
        }
    }
    return (
        <>
            <div className='RegisterPage'>
                <div className='registerMain'>
                    <h2 style={{ color: "white" }}>Register</h2>
                    <p style={{ color: "rgba(154, 149, 141, 1)" }}>Please enter your details to register</p>
                    <form onSubmit={register}>
                        <small className='small'>{em}</small>
                        <div className="registerInput">
                            <input type="text" onChange={handleuser} placeholder="Enter Your Email" />
                        </div>
                        <small className='small'>{alert_name}</small>
                        <div className="registerInput">
                            <input type="text" onChange={handlename} placeholder="Enter Your Full Name *" name="" />
                        </div>

                        <div className='selecterDateGender'>
                            <div>
                                <small className='small'>{alert_dob}</small>
                                <div className='selecterMobile'>
                                    <input type="date" className='selecterDate' onChange={handledate} name="date" />
                                </div>
                            </div>
                            <div className='selecterGender'>
                                <select name="gender" className='selecterDate' onChange={handlegenre}>
                                    <option value="">Select Gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                       
                        <small className='small'>{passwordalert.pass}</small>
                        <div className="registerInput">
                            <input type="password"  onChange={handlepassword} placeholder="Create Password *" name="" />
                            <span className="lockerPassword"><Image src={password} alt="lock" /></span>
                        </div>

                        <small className='small'>{passwordalert.match}</small>
                        <div className="registerInput">
                            <input type="password" onChange={handleconfirmpassword} placeholder="Confirm Password *" name="" />
                            <span className="lockerPassword"><Image src={EyePassword} alt="lock" /></span>
                        </div>

                        <p style={{ color: "white" }}>By proceeding you agree to our  <Link href="/termsandcondition" style={{textDecoration:"none"}}><span style={{ color: "rgba(255, 168, 0, 1)"}}>Terms of Use </span></Link>and <Link href="/privacypolicy" style={{textDecoration:"none"}}><span style={{ color: "rgba(255, 168, 0, 1)" }}>Privacy Policy</span></Link></p>
                        <input type="submit" value="REGISTER"  className='registerSubmit'/>
                    </form>
                </div>
            </div>
        </>
    )
}
export default withRedirect(register)





//old code of kanganweb

// <section className="login">
// <div className={loader ? 'loader' : 'loader hide'}>
//     <div className='spin' />
// </div>
// <div className="login_form left">
//     <div className="login_form_area">
//         <div className="login_inner_area">
//             <Link href="/" className="back_home"><i className='fa fa-arrow-left' style={{ 'color': '#fff' }}></i></Link>
//             {flag_indicator ? ui_msg : ''}
//             <form onSubmit={register}>
//                 <div className="input_field_area">
//                     <div>
//                         <small className='small'>{alert_name}</small>
//                         <div className="input_field_col">
//                             <span><Image src={user} alt="" /></span><input type="text" onChange={handlename} placeholder="Enter Your Full Name *" name="" />
//                         </div>
//                         <small className='small'>{em}</small>
//                         <div className="input_field_col">
//                             <span><Image src={emmail} alt="" /></span>
//                             <input type="text" onChange={handleuser} placeholder="Enter Your Email or Contact Number" />
//                         </div>
//                     </div>


//                     <div>
//                         <small className='small'>{alert_dob}</small>
//                         <div className="input_field_col">
//                             <span><Image src={emmail} alt="" /></span>
//                             <input type="date" className="form-control" onChange={handledate} name="" />
//                         </div>
//                         <div className="input_field_col  mb-3" style={{ 'display': 'inline-flex' }}>
//                             <div className="form-check">
//                                 <input className="form-check-input" name="gender" id="M" type="radio" value="M" onChange={handlegenre} />
//                                 <label className="form-check-label">
//                                     Male
//                                 </label>
//                             </div>
//                             <div className="form-check" style={{ 'marginLeft': '10px' }}>
//                                 <input className="form-check-input" name="gender" id="F" type="radio" value="F" onChange={handlegenre} />
//                                 <label className="form-check-label">
//                                     Female
//                                 </label>
//                             </div>

//                         </div>
//                         <small className='small'>{passwordalert.pass}</small>
//                         <div className="input_field_col">
//                             <span><Image src={password} alt="" /></span><input type="password" className="form-control" onChange={handlepassword} placeholder="Create Password *" name="" />
//                         </div>
//                         <small className='small'>{passwordalert.match}</small>
//                         <div className="input_field_col">
//                             <span><Image src={password} alt="" /></span><input type="password" className="form-control" onChange={handleconfirmpassword} placeholder="Confirm Password *" name="" />
//                         </div>
//                     </div>
//                     <ReCAPTCHA className='recap' sitekey={SITE_KEY} onChange={handler} />
//                     <br />
//                     <div className="input_field_col">
//                         <div className="new">
//                             <small className='small'>{msg}</small><br />
//                             <div className="form-group">
//                                 <input type="checkbox" onChange={handle} value={check} id="html" />
//                                 <label style={{ 'marginLeft': '10px' }}>I Accept All<span> Terms  Conditions</span></label>
//                             </div>
//                             {flag ?
//                                 <input type="submit" value="REGISTER" name="" /> :
//                                 <input type="submit" value="REGISTER" disabled name="" />
//                             }
//                         </div>
//                         <br /><br /><br />

//                     </div>
//                 </div>
//             </form>

//             <div className="or_devider"><span>OR</span></div>
//             <ul className="social_connect">
//                 <li><Link href="/" onClick={handleFacebookSignIn}><span><Image src={facebook} alt="" /></span> Facebook</Link></li>
//                 <li><Link href="/" onClick={handleGoogleSignIn}><span><Image src={google} alt="" /></span> Google</Link></li>
//             </ul>
//         </div>
//     </div>
// </div>
// <div className="logincontent right">
//     <div className="content_area">
//         <div className="content_inner_area">
//             <Link href="/" className="login_logo"><Image src={logo} alt="ff" width="200" height="200" /></Link>
//             <ul>
//                 <li>New web series release every week</li>
//                 <li>Unlimited streaming</li>
//                 <li>HD + (2k) Qualtiy</li>
//                 <li>Get full access to all premium content</li>
//             </ul>
//             <h3>Already Have An Account?</h3>
//             <div className="flip_btn_area">
//                 <Link href="/login" className="flip_btn">LOGIN NOW</Link>
//             </div>
//         </div>
//     </div>
// </div>
// </section>