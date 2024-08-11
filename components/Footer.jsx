import React, { useState,forwardRef, useEffect } from 'react'
import Image from 'next/image'
import homeLogo from '.././assets/image/jalvalogonew.png'
import homeReels from '.././assets/loginPage/reel.png'
import homeUpcoming from '.././assets/loginPage/upcoming.png'
import homeMore from '.././assets/loginPage/moren.png'
import sub_btn from '../assets/home/subs.png';
import search from '../assets/image/search_icon.png';
import Link from 'next/link'
import { useUserAuth } from '../context/UserAuthContext'
// import Link from 'next/link'; 
const Footer = forwardRef(({
    more
},ref) => {

const {isSubscribed} = useUserAuth();
const [subscribed,setSubscribed]=useState(false)
useEffect(()=>{
    func()
},[])

const func=async()=>{
    const ch = await isSubscribed();
    setSubscribed(ch)
}
return (
    <div className='FooterMain' ref={ref}>
        <div className='FooterOption'>
            <Link href="/" className='FooterHome'>
                <div><Image src={homeLogo} alt="home" width="auto" height="auto" className='LogoFooter'/></div>
                <div>Home</div>
            </Link>
            <Link href="/upcoming" className='FooterHome'>
                <div><Image src={homeUpcoming} alt="Upcoming" width="auto" height="auto" className='LogoFooter '/></div>
                <div>Upcoming</div>
            </Link>
            {!subscribed ? 
            <Link href="/subscription" className='FooterHome'>
                <div><Image src={sub_btn} alt="Reels" width="auto" height="auto" className='LogoFooter see'/></div>
                <div>Subscription</div>
            </Link>:
            <Link href="/search" className='FooterHome'>
            <div><Image src={search} alt="Reels" width="auto" height="auto" className='LogoFooter sea'/></div>
            <div>Search</div>
            </Link>}
            <Link href="#" className='FooterHome' onClick={more}>
                <div><Image src={homeMore} alt="More" width="auto" height="auto" className='LogoFooter ext'/></div>
                <div>More</div>
            </Link>
        </div>
    </div>
  )
});

export default Footer