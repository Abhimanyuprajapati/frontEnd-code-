import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import Image from 'next/image';
import subscriptionArrow from '../assets/loginPage/right.png';
import withSubscribe from '../components/Auth/Subscribe';
import rs from '../assets/loginPage/rupis.png';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Subscription = () => {
  const router = useRouter();
  const { allSubscriptions } = useUserAuth();
  const [array, setArray] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    pack();
  }, [allSubscriptions]);

  const pack = async () => {
    setLoader(true);
    const data = await allSubscriptions();
    if (data) {
      setArray(data);
      setLoader(false);
    }
  };

  return (
    <>
      <Head>
        <meta property="al:iphone:url" content="jalva://subscription" />
        <meta property="al:iphone:app_store_id" content="6504566793" />
        <meta property="al:iphone:app_name" content="Jalva" />
        <meta property="al:ios:url" content="jalva://subscription" />
        <meta property="al:ios:app_store_id" content="6504566793" />
        <meta property="al:ios:app_name" content="Jalva" />
        <meta property="al:android:url" content="jalva://subscription" />
        <meta property="al:android:app_name" content="Jalva" />
        <meta property="al:android:package" content="com.jalva.android" />
        <meta property="al:web:url" content="https://www.jalva.app/subscription" />
      </Head>
      <div className='subscriptionPage_css'>
        <div className='subscriptionBuyPlan'>
          {loader ? (
            <p>Loading...</p>
          ) : (
            array.length > 0 && array.map((x, index) => {
              return (
                <div className='BuyPlannow' key={index}>
                  <h2>
                    <span className='price'>
                      <Image src={rs} alt="rs" /> {x.price[0].value / 100}
                    </span> 
                    {x.period} Days
                  </h2>
                  <hr/>
                  {x.benefits.map((y, benefitIndex) => {
                    return (
                      <p key={benefitIndex}>
                        <Image src={subscriptionArrow} alt="arrow" style={{ margin: '0 5px' }} width="15" height="15"/> 
                        {y}
                      </p>
                    );
                  })}
                  <button onClick={() => router.push(`/gateway/${x._id}`)}>Subscribe Now</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default withSubscribe(Subscription);