import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo/jalwa.png';
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
  return (
    <div className='subscriptionPage_css'>
        <div>
            <span><Image src={logo} alt="imd" width="50" height="50"/></span>
            <span>
              <p>Current Subscription</p>
              <p>Validity: 13 Jan 2021 - 14 Feb 2022</p>
            </span>
        </div>
        <div>
         {array.map((x, index) => {
                return (
                  <div>
                    <div>
                      <p>{x.name}</p>
                      <p >1 Year Plan</p>
                      <p>Validity {x.period} days</p>
                    </div>
                    <div>
                      <p>₹{x.price[0].value / 100} </p>
                      <button onClick={() => router.push(`/gateway/${x._id}`)}>Buy Now</button>
                    </div>
                  </div>
                )
         })}
        </div>
    </div>
  )
}

export default withSubscribe(Subscription)