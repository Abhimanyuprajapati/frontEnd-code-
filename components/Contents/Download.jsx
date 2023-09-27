import React from 'react'
import download1 from "../../assets/home/image 27.png"
import download2 from "../../assets/home/image 29.png"
import download3 from "../../assets/home/Share-the-Openclipart-QR-Code 1.png"
import mobile from "../../assets/home/Group 66456.png";
import Image from 'next/image';
const Download = () => {
  return (
    <>
    <section className="container-add">
        <div className='downloadImg'>
            <Image src={mobile} alt="mpb" className='downloadImg1'/>
        </div>
        <div className='scannerSection'>
            <h2>Download The App</h2>
            <p>Save your favourites easily and always have <br/>something to watch.</p>
            <div className='images'>
              <div>
                <a href="#"><Image src={download3} alt="image2" className='barcode'/></a>
              </div>
              <div>
                <a href="https://play.google.com/store/apps/details?id=com.filmcityi.android&pli=1" target="_blank" rel="noreferrer"><Image src={download1} alt="image2" className='AppleStore'/></a> <br /> 
                <a href="#"><Image src={download2} className='AppleStore' alt="image2"/></a>
              </div>
            </div>
        </div>
</section>
    </>
  )
}

export default Download