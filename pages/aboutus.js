import Image from 'next/image';
import React,{useState} from 'react'
import { useUserAuth } from '../context/UserAuthContext';
// import logo from '../assets/logo/FilmCity.png';
// import Download from '../components/Contents/Download'
import withState from '../components/Auth/State';
// import back  from '../assets/image/Rectangle 24.png';
const Aboutus = () => {
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [number,setnumber]=useState('')
    const [messaged,setmessaged]=useState('')
    const [subject,setsubject]=useState('')
    const [message,setmessage]=useState('')
    const [flag,setflag]=useState(false)
    const { contactus} = useUserAuth();
        
    const contact=async (e)=>{
        e.preventDefault();
        const data = {
            "email": email, 
            "mobile": number, 
            "name": name, 
            "issueType": subject, 
            "description": messaged         
        }
        const result = await contactus(data)
        setmessage(result.message)
    }
      const handler=async(e)=>{
        if(e === null){
            setflag(false)
            setmessage('Recaptcha not verfied !!')
        }else{
            const result = await verify(e);
            if(result.data.data.success){
                setflag(true)
                setmessage('')  
            }
        }
      }
  return (
    <div className='AboutUsPage_css'>
        <h1>About Us</h1>
        <h5>Get hooked to binge-worthy content</h5>
        <h5>tailored to your taste in your language!</h5>
        <p>Jalva is a video streaming service that offers a wide variety of genres from drama, horror, suspense, thriller to comedy & beyond. 
            Binge watch from our collection of web series, movies, Jalva Originals and more in your regional language. 
            Start a Free Trial and your first 2 videos will be on us. 
            Enjoy unlimited video streaming and downloads at a pocket friendly price all year long.
        </p>
        <ul>
            <li>check Flip through trailers to help choose what to watch first.</li>
            <li>check Personalized content according to your geographical location.</li>
            <li>check Unlimited HD streaming and downloading 24x7.</li>
            <li>check Personalize your membership plan to suit your need.</li>
            <li>check Access content anywhere in the world.</li>
            <li>check Download videos for offline viewing-on-the-go.</li>
        </ul>
    </div>
  )
}

export default withState(Aboutus);