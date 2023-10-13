import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import Link from 'next/link';
import Image from 'next/image';
import subscriptionArrow from '../assets/loginPage/right.png';
import withSubscribe from '../components/Auth/Subscribe';
import rs from '../assets/loginPage/rupis.png';
import { useRouter } from 'next/router';
const Subscription = () => {
  const router = useRouter()
  const { allSubscriptions} = useUserAuth();
  const [array, setarray] = useState([])
  useEffect(() => {
    pack()
  }, [])

  const pack = async () => {
    setloader(true)
    const data = await allSubscriptions()
    console.log(data)
    setarray(data)
    if (data) {
      setloader(false)
    }
  }
  const [loader, setloader] = useState(false);

// const arrayData =()=>{
//   array.map((x) =>console.log(x)
// )
// } 
// arrayData();
// const [isHovering, setIsHovering] = useState(false);
// const handleMouseOver = () => {
//   setIsHovering(true);
// };
// const handleMouseOut = () => {
//   setIsHovering(false);
// };
// {isHovering && (
  // <p style={{color:'orange'}}>( Taxes are not included in this price )</p>)}
  // onMouseOver={handleMouseOver}
  // onMouseOut={handleMouseOut}

  return (
    <div className='subscriptionPage_css'>
        <div className='subscriptionBuyPlan'>
          {array.map((x,index)=>{
            return (
              <div className='BuyPlannow' key={index}>
                <h2><span className='price'><Image src={rs} /> {x.price[0].value/100}</span> {x.period} Days</h2>
                <hr/>
                {x.benefits.map((y,index)=>{
                  return (
                    <p key={index}><Image src={subscriptionArrow} style={{'margin':'0 5px'}} alt="imd" width="10" height="10"/> {y}</p>
                )})}
                <button onClick={() => router.push(`/gateway/${x._id}`)}>Subscribe Now</button>
              </div>
            )
          })}
            
        </div>
    </div>
  )
}

export default withSubscribe(Subscription)
