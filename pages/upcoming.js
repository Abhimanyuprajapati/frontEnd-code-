import React from 'react'
import { useEffect,useState } from 'react';
import Header from '../components/Header';
import { Access } from '../services/context';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';
import play from '../assets/image/play-btn.png';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../components/Footer';
import play1 from '../assets/image/playtrailer.png';
import share from '../assets/image/Invite_friend.png';
import Download from '../components/Contents/Download';
import Question from '../components/Contents/Question';
import Topmovie from '../components/Contents/Topmovie';
import { useUserAuth } from '../context/UserAuthContext';
import { useRouter } from 'next/router';
import withState from '../components/Auth/State';
//server side redenring 
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;


const Upcoming = ({data}) => {
  const router = useRouter();
  const [flag,setflag]=useState(false)
  const [container,setcontainer]=useState([])
  const [con,setcon]=useState([{genre:[]}])
  const [releaseDate,setreleaseDate]=useState('')
  const {Upcomingcontents,allContents} = useUserAuth();
useEffect(()=>{
    fetchdata()
    if(window){
      if(window.innerWidth < 600){
        setflag(true)
      }
    }
},[])

    const fetchdata=async()=>{
      const upcoming = await Upcomingcontents();
      const content = await allContents();
      setcontainer(upcoming)
      setcon(content.contents)
    }
    const epoch_to_normal=(time)=>{
      const date = new Date(time)
      var formattedDate = date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear()
      return formattedDate;
    }
  return (
    <>
    <Swiper
      className='upcomingsl'
      loop={true}
      slidesPerView={flag ? 1:3}
      centeredSlides= {true}
      pagination={{
        clickable: true,
      }}
      navigation={true} 
      modules={[Pagination,Navigation]}
      spaceBetween={5}
    >
      {container.map((x,index)=>{
        return(
          <SwiperSlide key={index} >
            {/*<Image src={play} alt="image"  width="400" height="300" className='bigplaybtn'  onClick={() => router.push(`/player/data?title=${x.title}&path=${x.mediaUrl.web}&type=upcoming&contentId=${x._id}`)}/>*/}
            <Link href="#">
            <Image src={static_url +'/' +x.resourcePath +'/'+x.landscapeNormal} alt="sldi" width="400" height="300"/>
            </Link>
            <div className='col-md-9'>
                    <h1>{x.title} <Image src={share} alt="imag" /> <span>14+</span></h1>
                    <ul>
                        {x.genre.map((x,index)=>{
                            return (
                                <li key={index}>{x}</li>
                            )
                        })}
                    </ul>
                    <p>{x.description}</p>
                    <p>Casts :{x.cast.map((x,index)=>{
                        return (
                            <span key={index}>{x}</span>
                        )
                    })}</p>
                    <Image src={play1} alt="trailer_button"/>
              </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
    
    <section className="product"> 
    <div className="container">
        <div className="product_category">
            <div className="product_category_heading">
                <h4>Popular Originals</h4>
                {/*<span> <i className='fa fa-arrow-left' onClick={() => slide(-1340)}></i><i className='fa fa-arrow-right' onClick={() => slide(+1340)}></i></span>*/}
            </div>
            <div className="product_item_list">
            {
            con.map( (x,index) => {
                return(
                        <div key={index}>
                                <Link href={'/contents/'+`${x.title}`} className="product_item">
                                    <div className="product_item_image">
                                        <Image src={static_url+'/'+x.awsStaticResourcePath +'/'+x.portraitPosterIdSmall} alt="dd" width="200" height="300"/>
                                        <div className="product_item_image_overlay">
                                            <div className="play_icon"></div>
                                        </div>
                                    </div>
                                   <p>{x.title}</p>
                                </Link>
                        </div>
                )
            })}
            </div>
         </div>
    </div>

    <br/>
    <Topmovie data={con}/>
    <br/>
    <Download/>
    </section>
    </>    
  )
}
export default withState(Upcoming);