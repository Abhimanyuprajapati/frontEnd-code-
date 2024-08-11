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
  const [container,setContainer]=useState({name:'',title:'',url:'',awsResourceId:''})
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
      spaceBetween={flag ? 0:80}
    >
      {data.map((x,index)=>{
          return(
            <SwiperSlide key={index} >
              <Link href={'/contents/'+`${x.link}`} >
              <Image src={static_url +'/' +x.awsResourceId +'/'+x.url} alt="sldi" width="1920" height="1080"/>
              </Link>
            </SwiperSlide>
          )
      })}
    </Swiper>
    </div>    
  )
}

export default Slider