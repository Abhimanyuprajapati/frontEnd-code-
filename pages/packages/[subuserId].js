import React, { useEffect,useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Question from '../../components/Contents/Question'
import Download from '../../components/Contents/Download'
import { useUserAuth } from '../../context/UserAuthContext'
import { useRouter } from 'next/router';
import Link from 'next/link'
const Packages=()=>{
    const {allSubscriptionsprivate} = useUserAuth();
    const [array,setarray]=useState([])
    const router = useRouter();
    const {subuserId} = router.query;
    useEffect(()=>{
      if(!router.isReady) return;
      const pack=async()=>{
        const data = await allSubscriptionsprivate(subuserId)
        setarray(data)
      }
      pack()
    },[router.isReady])
    return(
        <div className='outer'>
        <Header/>
        <div className='subs'>
        <h1>Flexible Plans </h1>
        <p>The test will be performed concerning the number of users, the ramp-up period, and the loop count set up in the first step. </p>
          <div className='row'>
             {  array.map((x,index) =>{
              return(
                  <div className='col-md-3' key={index}>
                      <h2>{x.name}</h2>
                      <p><span className='per'>{x.price.map((z,index)=> { return(<span key={index}> <i className="fas fa-rupee-sign"></i> {z.value/100 }</span>)})}</span>
                      <span className='per1'>/{x.period}days</span></p> 
                      {x.benefits.map((y,index)=>{
                          return(
                              <ul key={index}>
                                  <li key={index}> {y}</li>
                              </ul>
                          )
                      })}
                      <Link href={`/gateway/${x._id}`}><button className='btn_buy'> Buy Now</button> </Link>
                  </div>
                  
              )
             })}
             
             
          </div>
          
        </div>
        <Question/>
        <Download/>
        <Footer/>
      </div>
    )
}
export default Packages;