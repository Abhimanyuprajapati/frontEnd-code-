import React,{useState,useEffect} from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import Link from 'next/link';
import withSubscribe from '../components/Auth/Subscribe';
import { useRouter } from 'next/router';
const Subscription = () => {
  const router = useRouter()
    const {allSubscriptions} = useUserAuth();
    const [array,setarray]=useState([])
    useEffect(()=>{
      const pack=async()=>{
        setloader(true)
        const data = await allSubscriptions()
        setarray(data)
        if(data){
          setloader(false)
        }
      }
      pack()
    },[])
    const [loader,setloader]=useState(false);

    return (
      <>
       <div className='subscriptionPage'>
        <div className='featureBoxCenter'>
          <div className='featureBox'>
            <div className='features' style={{fontSize:"1.1rem"}}>
              <h3 style={{color:"white"}}>Features</h3>
              <p style={{color:"rgba(198, 201, 210, 1)"}}>Unlimited Streaming</p>
              <p style={{color:"rgba(198, 201, 210, 1)"}}>Unlimited Downloads</p>
              <p style={{color:"rgba(198, 201, 210, 1)"}}>HD+(2k) quality videos</p>
              <p style={{color:"rgba(198, 201, 210, 1)"}}>Originals</p>
              <p style={{color:"rgba(198, 201, 210, 1)"}}>Advertisement free entertainment. </p>
            </div>
            <div className='planBuy'>
              {array.map((x,index)=>{
                return(
                  <div className='planbuyBox'>
                    <div>
                      <p className='hoverWhite'>{x.name}</p>
                      <p style={{color:"rgba(255, 255, 255, 1)"}}>1 Year Plan</p>
                      <p className='hoverValidate'>Validity {x.period} days</p>
                    </div>
                    <div className='ratePlan'>
                      <p>₹{x.price[0].value/100} </p>
                      <button onClick={() => router.push(`/gateway/${x._id}`)}>Buy Now</button>
                    </div>
                  </div>  
                )
              })}
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default withSubscribe(Subscription) 


// old code of kangan web
{/* <div className='  '>
<div className={ loader ? 'loader' : 'loader hide'}>
  <div className='spin'/>
  </div>
<h1>Flexible Plans </h1>
<p>Subscribe with one of plan and enjoy watching your favourite movies or web series.</p>
  <div className='row'>
     {  array.map((x,index) =>{
      return(
          <div className='col-md-3' key={index}>
            <div className='subheader'>
              <div className='subheader1'>
                <Image src={logo} alt="subslogo" width={100} height={100} />
              </div>
              <div className='subheader2'>
                <h2>{x.name}</h2>
                <p><span className='per'>{x.price.map((z,index)=> { return(<span key={index}> <i className="fas fa-rupee-sign"></i> {z.value/100 }</span>)})}</span>
                <span className='per1'>/ {x.period}days</span>
                </p> 
              </div>
            </div>
              {x.benefits.map((y,index)=>{
                  return(
                      <ul key={index}>
                          <li key={index}> {y.benifitsName}</li>
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
<div className='container'>
<Download/>
</div> */}