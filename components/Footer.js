import React from 'react'
import footer from '../assets/logo/FilmCity.png';
import Image from 'next/image';
import fb from '../assets/image/facebook_icon.png';
import youtube from '../assets/image/you.png';
import ins from '../assets/image/instagram.png';
import twi from '../assets/image/twii.png';
import Link from 'next/link';


const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerMain'>
        <div>
          <Image src={footer} alt='footer' className='footerlogo' />
        </div>
        <div className='footerPara'>
          <h1 style={{color: 'white' }}><Link href="/aboutus" style={{ color: 'white',textDecoration:'none'}}>About Us</Link></h1>
          <p style={{ color: '#748077'}}>
            FilmCity is a video streaming service that offers a wide variety of genres from drama, comedy, erotic and beyond. 
                Binge watch from our collection of web series, FilmCity originals and more. Enjoy unlimited video streaming at a 
                pocket friendly price all year long.
          </p>
        </div>
        <div className='icons'>
          <Link href="https://www.facebook.com/cmjfilmcityi" target="_blank" ><Image src={fb} alt="facebook" width="30" height="30" /></Link>
          <Link href="https://youtube.com/MithilaChapter" target="_blank" ><Image src={youtube} alt="youtube" width="30" height="30" /></Link>
          <Link href="https://www.instagram.com/cmjfilmcityi/" target="_blank"><Image src={ins} alt="instagram" width="30" height="30" /></Link>
          <Link href="https://twitter.com/cmjfilmcityi" target="_blank"><Image src={twi} alt="youtube" width="30" height="30" /></Link>
        </div>
      </div>

      <div className='linkpages'>
      <Link href="/privacypolicy" style={{ color: 'white',textDecoration:'none'}}>Privacy Policy</Link>
      <Link href="/contactus" style={{ color: 'white',textDecoration:'none'}}>Contact Us</Link>
      <Link href="/termsandcondition" style={{ color: 'white',textDecoration:'none'}}>Terms and Condition</Link>
      <Link href="/refundpolicy"  style={{ color: 'white',textDecoration:'none'}}>Refund Policy</Link>
      </div>

      <hr style={{ color: 'orange', fontSize: '1rem', height: '12px' }} />
      <div style={{display: 'flex',padding: '0.5rem',justifyContent: 'space-around'}}>
        <span><p style={{ color: '#ccc',textAlign:"center"}}>© 2020 All Rights Reserved to <span style={{ color: 'orange' }}>FILMCITY</span>1.0.0</p></span>
      </div>
    </div>
  )
}

export default Footer


/**
 * 
 * className="last_footer1"
 *  <ul>
      <li><Link href="/login">Login/Signup</Link></li>
      <li><Link href="/contactus">Contact Us</Link></li>
      <li><Link href="/aboutus">About Us</Link></li>
      <li><Link href="/privacypolicy">Privacy Policy</Link></li>
      <li><Link href="/watchlist">Watch List</Link></li>
      <li><Link href="/refundpolicy">Refund Policy</Link></li>
      <li><Link href="/termsandcondition">Terms and Condition</Link></li>
    </ul>
     <Image src={up} alt="drop" width="50" height="50" onClick={()=>topFunction()}/>
     {/* <span style={{'opacity':'.5','color':'#fff','fontSize':'13px','fontWeight':'normal','marginLeft':'10px'}}>-- Build-6.0.5</span></p>
 */
/*
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 
*/

