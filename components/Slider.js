import React,{useEffect,useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Navigation,Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';
import Image from 'next/image';
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
const Slider = ({data}) => {
  const [container,setContainer]=useState({title:'',description:'',awsStaticResourcePath:''})
  const [index1,setindex1]=useState(0)
  const [flag,setflag]=useState(false)
    useEffect(()=>{
      if(window){
        if(window.innerWidth < 600){
          setflag(true)  
        }
      }
      if(data.length >0){
        setContainer(data[0])
      }
    },[])
  
  return (
    <div className='banner'>
    <Swiper
      className='swiper'
      loop={true}
      slidesPerView={2}
      //autoplay={{delay: 2000}}
      centeredSlides= {true}
      pagination={{
        clickable: true,
      }}
      navigation={true} 
      modules={[Pagination,Navigation,Autoplay]}
      spaceBetween={50}
    >
      {data.map((x,index)=>{
        return(
          <SwiperSlide key={index} >
            <Link href={'/contents/'+`${x.title}`} >
            <Image src={static_url +'/' +x.awsStaticResourcePath +'/'+x.landscapePosterIdNormal} alt="sldi" width="200" height="150"/>
            </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
    </div>    
  )
}

export default Slider