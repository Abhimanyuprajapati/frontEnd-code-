import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';
import Image from 'next/image';

const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
const Topmovie = ({ data }) => {
  const [index1, setindex1] = useState(0)
  const [flag, setflag] = useState(false)
  useEffect(() => {
    if (window.innerWidth < 600) {
      setflag(true)
    }
  }, [])
  const appenddata = (e) => {
    setindex1(e.realIndex)
  }
  return (
    <div className='container topmovie'>

      <div className='row'>
        <div className='head'>
          <h2>Watch 12 Movies This Month <br />
            <span className='small'>best 12 Movies watch for free</span></h2>
          <p> {index1 + 1} /{data.length} </p>
        </div>
        <Swiper
          className='sl'
          loop={true}
          slidesPerView={flag ? 2 : 3}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          onSlideChange={(e) => appenddata(e)}
        >
          {data.map((x, index) => {
            return (
              <SwiperSlide key={index} className="movieblock">
                {/* <div className='left'> */}
                  <Link href={'/contents/' + `${x.title}`} >
                    <Image src={static_url + '/' + x.awsStaticResourcePath + '/' + x.landscapePosterIdNormal} alt="sldi" width="300" height="100" className='image' />
                  </Link>
                {/* </div> */}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default Topmovie