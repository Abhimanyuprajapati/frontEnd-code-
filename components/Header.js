import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import logo from '../assets/logo/Jalva.png'
import Link from 'next/link'; 
import vector from '../assets/loginPage/menu.png';
import install from '../assets/loginPage/install.png';
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
    <div className={"header active"}>
      <Image src={vector} alt="menu" className='menubar'/>
      <Link href="/"><Image src={logo} alt="logo" className="logo"/></Link>
      <Image src={install} alt="install-btn" className='install'/>
    </div>
  )
}

export default Header