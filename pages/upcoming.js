import React from 'react'
import { useEffect,useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUserAuth } from '../context/UserAuthContext';
import { useRouter } from 'next/router';
import withState from '../components/Auth/State';
import play from '.././assets/loginPage/Vector.png'
import Watchlist from '.././assets/loginPage/icomoon-free_download2.png'
import share from '.././assets/loginPage/icomoon-free_download2 (1).png'
import bell from '.././assets/loginPage/Frame 66356.png'
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
      console.log(upcoming);
      setcon(content.contents)
    }
    const epoch_to_normal=(time)=>{
      const date = new Date(time)
      var formattedDate = date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear()
      return formattedDate;
    }
  return (
    <>
    <div className='upcoming-Page'>
    {container.map((x,index)=>{
        return(
         <div key={index} className='upcoming-Box'>
          <div className='upcomingImage'>
            <Link href="#">
              <Image src={static_url +'/' +x.resourcePath +'/'+x.landscapeNormal} alt="sldi" width="200" height="290" style={{borderRadius:'1rem'}}/>
            </Link>
          </div>
          <div className='upcomingDetail'>
              <div className='upcomingInformation'>
                  <p className='upcomingDetailPara'>{x.dateAdded}</p>
                  <h1 className='upcomingMovieName'>{x.categoryName}</h1>
                  <p className='upcomingMoviPara'>{x.description}</p>
              </div>
              <div className='upcomingInformationLogo'>
                <div className='upcomingPlayTrailer'>
                  <Image src={play} alt="play" width="auto" height="auto"/>
                  Play Trailer
                </div>
                <div className='upcomingWatchlist'>
                  <Image src={Watchlist} alt="image" width="auto" height="auto"/>
                  Watchlist
                </div>
                <div className='upcomingShare'>
                  <Image src={share} alt="image" width="auto" height="auto"/>&nbsp;
                  Share
                </div>
                <div className='upcomingBell'>
                  <Image src={bell} alt="image" width="auto" height="auto"/>
                </div>
              </div>
          </div>
          </div>
        )
      })}
    </div>
    <section className="product"> 
    <div className="container">
        <div className="product_category">
            <div className="product_category_heading">
                <h4 style={{color:'rgba(246, 173, 27, 1)'}}>All Contents</h4>
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
  
    </section>
    </>    
  )
}
export default withState(Upcoming);