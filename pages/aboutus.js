import Image from 'next/image';
import React,{useState} from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import logo from '../assets/logo/FilmCity.png';
import Download from '../components/Contents/Download'
import withState from '../components/Auth/State';
import back  from '../assets/image/Rectangle 24.png';
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
    <>
    <div className='aboutus row'>
        <div className='container'>
        <div className='col-md-6'>
            <div className='innerabout'>
            <Image src={logo} alt="imd" width="300" height="300"/>
            </div>
        </div>
        <div className='col-md-6'>
        <h2>About Company</h2><br/>
        <p>filmcityi is a video streaming service that offers a wide variety of genres from drama, comedy, erotic and beyond. 
            Binge watch from our collection of web series, filmcityi originals and more. Enjoy unlimited video streaming at a 
            pocket friendly price all year long.<br/><br/>
            filmcityi is a video streaming service that offers a wide variety of genres from drama, comedy, erotic and beyond. 
                Binge watch from our collection of web series, filmcityi originals and more. Enjoy unlimited video streaming at a 
                pocket friendly price all year long.
        </p>
        </div>
        </div> 
        <div className='container'>
            <Download/>
        </div>      
    </div>
    </>
  )
}

export default withState(Aboutus);