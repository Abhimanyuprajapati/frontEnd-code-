import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import logo from '../assets/logo/Jalva.png'
import Link from 'next/link'; 
import vector from '../assets/loginPage/menu.png';
import install from '../assets/loginPage/install.png';
import cross from '../assets/image/Vector.png';
import { useRouter } from 'next/router';
import { useUserAuth } from '../context/UserAuthContext';
import avatar from '../assets/home/default.png';
import logoutt from '../assets/home/logout.svg';
import twitter from '../assets/image/twitter.png';
import insta from '../assets/new image/home/instagram.png';
import link from '../assets/new image/home/linkedin.png';
import face from '../assets/new image/home/facebook.png';
import you from '../assets/new image/home/Vector.png';
const Header = ({state,toggle}) => {
  const {userData,logout} = useUserAuth();
  const [flag,setflag]=useState(false)
  const [navbar,setNavbar]=useState(false)
  const [userId,setuserId]=useState('')
  const [subscribe,setsubscribe]=useState(null)
  const [path,setpath]=useState('')
  const [user,setUser]=useState({})
  const router = useRouter();
  
  useEffect(()=>{
    setpath(router.pathname)
    const id = localStorage.getItem('id');
    setuserId(id);
    const subflag = localStorage.getItem('subscribed');
    if(subflag === null){
      setsubscribe(false)
    }else{
      setsubscribe(true)
    }
    if(id){
      getData(id);
    }
  },[])
  const getData=async(userId)=>{
    const res = await userData(userId);
    if(!res.data.error){
      setUser(res.data.data);
      setflag(true);
    }
  }
  const close=()=>{
    document.getElementsByClassName('sidenav')[0].style.width = "0px";
  }
  const open=()=>{
    document.getElementsByClassName('sidenav')[0].style.width = "300px";
  }
  useEffect(()=>{
    if(toggle){
      open()
    }else{
      close()
    }
  },[toggle])
    

  return (
    <div className="header">
      <Image src={vector} alt="menu" className='menubar' onClick={open}/>
      <Link href="/"><Image src={logo} alt="logo" className="logo"/></Link>
        <div className='sidenav'>
          <div className='topnav'>
          <Image src={logo} alt='logo'/>
          <Image src={cross} alt="cross" onClick={close}/>
          </div>
          {
            !flag ? 
            <Link href="/login" className='hed'>Login / Register</Link>:
            <div className='topnav'>
              <Image src={avatar} width={50} height={50} style={{'borderRadius':'50%'}}/>
              <div className='in'>
              <p>{user.name}</p>
              <p>{user.email}</p>
              </div>
              <Image src={logoutt} width={20} height={20} style={{'marginTop':'14px'}} onClick={logout}/>
            </div>
          }
      
          <ul>
            <li>All</li>
            {flag ? <li><Link href={`/profile/${userId}`}>My Account</Link></li>:''}
            <li><Link href="/">Home</Link></li>
            <li><Link href="/search">Search</Link></li>
            <li><Link href="/upcoming">Upcoming</Link></li>
            <li><Link href="/subscription">Subscriptions</Link></li>
            <li>About</li>
            <li><Link href="/contactus">Contact Us</Link></li>
            <li><Link href="/aboutus">About Us</Link></li>
            <li>Others</li>
            <li><Link href="/privacypolicy">Privacy Policy</Link></li>
            <li><Link href="/refundpolicy">Refund Policy</Link></li>
            <li><Link href="/termsandcondition">Terms And Condition</Link></li>
          </ul>
          <div className='topnav bot'>
          <Image src={insta} alt='logon'/>
          <Image src={you} alt='logoy'/>
          <Image src={face} alt='logof'/>
          <Image src={link} alt='logol'/>
          <Image src={twitter} alt='logot'/>
          </div>
        </div>
      {!flag  ?
      <Image src={install} alt="install-btn" className='install'/>:
      <div className='topnav up'>
      <Image src={avatar} width={50} height={50} style={{'borderRadius':'50%'}} onClick={()=>router.push(`/profile/${userId}`)}/>
      <div className='in'>
      <p>{user.name}</p>
      <p>{user.email}</p>
      </div>
      </div>
      }
    </div>
  )
}

export default Header