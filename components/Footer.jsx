import React, { useState,forwardRef } from 'react'
import Image from 'next/image'
import homeLogo from '.././assets/logo/jalwa.png'
import homeReels from '.././assets/loginPage/reel.png'
import homeUpcoming from '.././assets/loginPage/upcoming.png'
import homeMore from '.././assets/loginPage/moren.png'
import Link from 'next/link'
// import Link from 'next/link'; 
const Footer = forwardRef(({
    more
},ref) => {
  return (
    <div className='FooterMain' ref={ref}>
        <div className='FooterOption'>
            <Link href="/" className='FooterHome'>
                <div><Image src={homeLogo} alt="home" width="auto" height="auto" className='LogoFooter'/></div>
                <div>Home</div>
            </Link>
            <Link href="/subscription" className='FooterHome'>
                <div><Image src={homeReels} alt="Reels" width="auto" height="auto" className='LogoFooter'/></div>
                <div>Subscription</div>
            </Link>
            <Link href="/upcoming" className='FooterHome'>
                <div><Image src={homeUpcoming} alt="Upcoming" width="auto" height="auto" className='LogoFooter'/></div>
                <div>Upcoming</div>
            </Link>
            <Link href="#" className='FooterHome' onClick={more}>
                <div><Image src={homeMore} alt="More" width="auto" height="auto" className='LogoFooter'/></div>
                <div>More</div>
            </Link>
        </div>
    </div>
  )
});

export default Footer