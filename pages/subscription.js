import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo/jalwa.png';
import subscriptionArrow from '../assets/image/Vector.png';
import withSubscribe from '../components/Auth/Subscribe';
import { useRouter } from 'next/router';
const Subscription = () => {
  const router = useRouter()
  const { allSubscriptions } = useUserAuth();
  const [array, setarray] = useState([])
  useEffect(() => {
    const pack = async () => {
      setloader(true)
      const data = await allSubscriptions()
      setarray(data)
      if (data) {
        setloader(false)
      }
    }
    pack()
  }, [])
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
        <div className='Currentsubscription'>
            <span className='subscriptionLogo'><Image src={logo} alt="imd" width="auto" height="auto"/></span>
            <span>
              <p className='currentSubscription1'>Current Subscription</p>
              <p className='currentValidityDate'>Validity: 13 Jan 2021 - 14 Feb 2022</p>
            </span>
        </div>
        <div className='subscriptionBuyPlan'>
            <div className='BuyPlannow'>
              
              <hr/>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch Everywhere</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch All</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Unlimited Downloads</p>
              <button onClick={() => router.push(`/gateway/${x._id}`)}>Subscribe Now</button>
            </div>

            <div  className='BuyPlannow'>
              
              <hr/>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch Everywhere</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch All</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Unlimited Downloads</p>
              <button onClick={() => router.push(`/gateway/${x._id}`)}>Subscribe Now</button>
            </div>
            <div  className='BuyPlannow'>
              
              <hr/>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch Everywhere</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch All</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Unlimited Downloads</p>
              <button onClick={() => router.push(`/gateway/${x._id}`)}>Subscribe Now</button>
            </div>
            <div  className='BuyPlannow'>
              
              <hr/>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch Everywhere</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Watch All</p>
              <p><Image src={subscriptionArrow} alt="imd" width="auto" height="auto"/> Unlimited Downloads</p>
              <button onClick={() => router.push(`/gateway/${x._id}`)}>Subscribe Now</button>
            </div>
        </div>
    </div>
  )
}

export default withSubscribe(Subscription)
