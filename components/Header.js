import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import logo from '../assets/logo/FilmCity.png'
import Link from 'next/link';
import vector from '../assets/image/profile.png';
import { useRouter } from 'next/router';
const Header = ({state}) => {
  const [flag,setflag]=useState(false)
  const [navbar,setNavbar]=useState(false)
  const [userId,setuserId]=useState('')
  const [subscribe,setsubscribe]=useState(null)
  const [path,setpath]=useState('')
  const router = useRouter();
  
  useEffect(()=>{
    setpath(router.pathname)
    setuserId(localStorage.getItem('id'));
    const subflag = localStorage.getItem('subscribed');
    if(subflag === null){
      setsubscribe(false)
    }else{
      setsubscribe(true)
    }
  },[])
  return (
    <div className={navbar?"header":"header active"}>
      <Link href="/"><Image src={logo} alt="logo" className="logo"/></Link>
      <div className='right-nav'>
      {!state ? <Link href="/login" className={path==="/login" ? 'active':''}>
        <p><i className="fa fa-user"></i> Login / Signup</p></Link>:
       <Link href={`/profile/${userId}`}><p><Image src={vector} className="pro" width="20" height="20" alt="userqq"/>  Account</p></Link>}
        <Link href='/search' className={path==="/search" ? 'home active':'home'}><i className='fa fa-search'></i> Search</Link>
        {subscribe? '':<Link href="/subscription" className={path==="/subscription" ? 'home active':'home'}><i className="fa fa-rocket"/>Subscription</Link>}
        <Link href="/upcoming" className={path==="/upcoming" ? 'home active':'home'}> Upcoming</Link>
        <Link href="/" className={path==="/" ? 'home active':'home'}><i className="fa fa-home"></i> Home</Link>
      </div>
      {/*for mobile devices menu bar options*/}
      <div className='mobile-primary'>
        <i className='fa fa-bars' onClick={()=>setflag(!flag)}></i>
        {!state ? <Link href="/login"><p><Image src={vector} width="20" className='pro' height="20" alt="user"/> Login / Signup</p></Link>: 
        <Link href={`/profile/${userId}`}><p><Image src={vector} width="20" className='pro' height="20" alt="user"/> Account</p></Link>}
        <div className={!flag ? 'mobile-child hide':'mobile-child'}>
        <i className='fa fa-close' onClick={()=>setflag(!flag)}/>
        <Link href="/" className="home"><i className="fa fa-home"></i>  Home</Link>
        <Link href="/search" className="home"><i className="fa fa-search"></i> Search</Link>
        {!subscribe ? <Link href="/subscription" className={path==="/subscription" ? 'home active':'home'}><i className="fa fa-rocket"/> Subscription</Link>:''}
        <Link href="/upcoming" className="home"><i className="fa fa-image"></i>  Upcoming</Link>
        </div>
      </div>      
    </div>
  )
}

export default Header