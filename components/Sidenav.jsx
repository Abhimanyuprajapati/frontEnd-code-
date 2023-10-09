import React from 'react'
import logo from '../assets/logo/Jalva.png';
import Image from 'next/image';
import cross from '../assets/image/Vector.png';
import Link from 'next/link';
const Sidenav = (props) => {
  const close=()=>{
    document.getElementsByClassName('sidenav')[0].style.width = "0px";
  }
  const open=()=>{
    document.getElementsByClassName('sidenav')[0].style.width = "300px";
  }
  return (
    <div className='sidenav'>
        <div className='topnav'>
        <Image src={logo} alt='logo'/>
        <Image src={cross} alt="cross" onClick={close}/>
        </div>
        <Link href="#" className='hed'>Login / Register</Link>
        <ul>
            <li>All</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/upcoming">Upcoming</Link></li>
            <li><Link to="/subscription">Subscriptions</Link></li>
            <li>About</li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li>Others</li>
            <li><Link to="/privacypolicy">Privacy Policy</Link></li>
            <li><Link to="/refundpolicy">Refund Policy</Link></li>
            <li><Link to="/termsandcondition">Terms And Condition</Link></li>
        </ul>

        
    </div>
  )
}

export default Sidenav