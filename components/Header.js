import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import logo from '../assets/logo/jalva.png'
import Link from 'next/link'; 
import vector from '../assets/loginPage/menu.png';
import install from '../assets/loginPage/install.png';
import cross from '../assets/image/Vector.png';
import { useRouter } from 'next/router';
import { useUserAuth } from '../context/UserAuthContext';
import avatar from '../assets/new image/home/profile.png';
import logoutt from '../assets/home/logout.svg';
import insta from '../assets/new image/home/instagram.png';
import face from '../assets/new image/home/facebook.png';
import you from '../assets/new image/home/Vector.png';

const Header = ({state,toggle}) => {
  const {userData,logout,InstallReferer} = useUserAuth();
  const [flag,setflag]=useState(false)
  const [navbar,setNavbar]=useState(false)
  const [userId,setuserId]=useState('')
  const [subscribe,setsubscribe]=useState(null)
  const [path,setpath]=useState('')
  const [user,setUser]=useState({})
  const [mdevice,setMdevice]=useState(false);
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
    if(window.innerWidth < 600){
      setMdevice(true)  
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
    document.getElementsByClassName('sidenav')[0].style.width = "320px";
  }
  useEffect(()=>{
    if(toggle){
      open()
    }else{
      close()
    }
  },[toggle])
  const generateRandomHexUUID=async ()=>{
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    return genRanHex(16);
  }

  const handleInstallReferer=async ()=>{
    let body ={}
    body =router.query;
    if(body.utm_source && body.utm_id  && body.utm_medium && body.utm_campaign){
      body["platform"] = "web"
      let hexId =  await generateRandomHexUUID();
      body["uuid"] = hexId
      let res  = await InstallReferer(body)
      if(res.data && !res.data.error){
        const prefix = "https://play.google.com/store/apps/details?id=com.jalva.android&referrer="
        let redirect = `utm_source=${body.utm_source}&utm_medium=${body.utm_medium}&utm_campaign=${body.utm_campaign}&utm_id=${body.utm_id}&utm_content=${hexId}&utm_term=test-term`
        let encoded = encodeURIComponent(redirect);
        router.push(prefix + encoded)
      }
    }else{
      router.push("https://play.google.com/store/apps/details?id=com.jalva.android")
    }
  }  
  return (  
    <div className="header">
      <Image src={vector} alt="menu" className='menubar' onClick={open}/>
      <Link href="/"><Image src={logo} alt="logo" className="logo" height={100} width={220}/></Link>
        <div className='sidenav'>
          <div className='topnav'>
          <Image src={logo} alt='logo'/>
          <Image src={cross} alt="cross" onClick={close}/>
          </div>
          {
            !flag ? 
            <Link href="/login" className='hed'>Login / Register</Link>:
            <div className='topnav'>
              <Image src={user.profilePic} width={50} height={50} style={{'borderRadius':'50%'}} onClick={()=>router.push(`/profile/${userId}`)}/>
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
            {!subscribe?<li><Link href="/subscription">Subscriptions</Link></li>:''}
            <li>About</li>
            <li><Link href="/contactus">Contact Us</Link></li>
            <li><Link href="/aboutus">About Us</Link></li>
            <li>Others</li>
            <li><Link href="/privacypolicy">Privacy Policy</Link></li>
            <li><Link href="/refundpolicy">Refund Policy</Link></li>
            <li><Link href="/termsandcondition">Terms And Condition</Link></li>
            <li><Link href="/grievances-redressal">Grievances Redressal</Link></li>
          </ul>
          <div className='topnav bot'>
          <Link href="https://www.instagram.com/jalva_official/" ><Image src={insta} alt='logon'/></Link>
          <Link href="https://www.youtube.com/channel/UCnfHtDZYF2lPwjSekPR17YA" ><Image src={you} alt='logoy'/></Link>
          <Link href="https://www.facebook.com/profile.php?id=61559354319" ><Image src={face} alt='logof'/></Link>
          </div>
          <p style={{'color':'#fff','textAlign':'left','paddingLeft':'20px'}}>v2.0.3</p>
        </div>
      {!flag  ?
      <Image src={install} alt="install-btn" className='install' onClick={()=>handleInstallReferer()}/>:
      <div className='topnav up'>
      <div className='in'>
      <Image src={user.profilePic} onClick={()=>router.push(`/profile/${userId}`)} height={30} width={30} alt="profile"/>
      </div>
      </div>
      }
    </div>
  )
}

export default Header




{/* <Link href="https://instagram.com/jalva_official?igshid=YzEzYTM2cWpobm8=" target='_blank'><Image src={insta} alt='logon'/></Link>
<Link href="https://youtube.com/@Jalvaofficial?si=YgfJD44tlZPpQ5qr" target='_blank'><Image src={you} alt='logoy'/></Link>
<Link href="https://www.facebook.com/profile.php?id=61553705541144" target=' */}