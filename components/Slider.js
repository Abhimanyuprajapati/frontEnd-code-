import React,{useEffect,useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay , faPlus } from '@fortawesome/free-solid-svg-icons';
import back1 from '../assets/image/Rectangle 1186.png';
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
    const allPosters =[]
    const appenddata=(e)=>{
      setindex1(e.realIndex)
      setContainer(data[e.realIndex])
    }
  return (
    <div className='banner'>
    <Swiper
      className='desktop'
      loop={true}
      slidesPerView={2}
      centeredSlides= {true}
      pagination={{
        clickable: true,
      }}
      navigation={true} 
      modules={[Pagination,Navigation]}
      spaceBetween={50}
      onSlideChange={(e) => appenddata(e)}
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