import React, { useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import withRedirect from '../components/Auth/Redirect'
import password from "../assets/loginPage/lock.png";
import EyePassword from "../assets/loginPage/mail.png"
import facebook from '../assets/loginPage/Group 292 (1).png';
import google from '../assets/loginPage/Group 294.png';
import { useUserAuth } from '../context/UserAuthContext';
const register = () => {
    const { Signup,handlegoogleSignIn,handleFacebookSignIn} = useUserAuth();
    const [passwordalert, setpasswordalert] = useState({ pass: '', match: '' })
    const [name, setname] = useState('')
    const [loader, setloader] = useState(false)
    const [emailinput, setemail] = useState('')
    const [passwordinput, setpassword] = useState('')
    const [confirmp, setconfirmp] = useState('')
     const [gender, setgender] = useState('')
    const [dob, setdob] = useState({})
    const [check, setcheck] = useState(false)   

    const register = (e) => {
        e.preventDefault();
        registerwithemail()
    }    
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
    //registeration API
    const registerwithemail = async () => {
        const exp = !!regex.test(emailinput)
        if (check !== true) {
            setmsg('please accept terms and condition')
        }else{
            setmsg('')
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
                permission: 'jalva',
                dob: birth,
                userGenre: gender
            }
            const response = await Signup(data)
            setui_msg(response.message)
        } else {
            setui_msg('please fill up all the mandatory details')
        }
    }
 
    return (
            <div className='login_page_css'>
                <div className='registerMain'>
                <h1>Register</h1>
                <p style={{ color: 'orange', margin: '10px','textAlign':'center' }}>
                {!ui_msg ? 'Please login and enjoy your favourites movies':msg}</p>
                     <div className='sociallogin'>
                        <button onClick={handlegoogleSignIn} className='googleAuth'><Image src={google} width={50} height={50} style={{ marginRight: "0.7rem" }} /> Google</button>
                        <button onClick={handleFacebookSignIn} className='googleAuth'><Image src={facebook} width={50} height={50} style={{ marginRight: "0.7rem" }} /> Facebook</button>
                    </div>
                    <p style={{ color: 'orange', margin: '10px','textAlign':'center' }}>have an account ? <Link href="/login">Login here </Link></p>
                </div>
            </div>
    )
}
export default withRedirect(register)