import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { useRouter } from 'next/router';
import Image from 'next/image'
import withAuth from '../../components/Auth/Hoc'
import avatar from '../../assets/image/avatar.png';
import logo from '../../assets/logo/jalwa.png';
import bottomline from '../../assets/image/bottomline.png';
import editicon from '../../assets/image/edit.svg';
const cdn = process.env.NEXT_PUBLIC_CDN_PROFILE;
const Profile = () => {
  const { userData, logout } = useUserAuth();
  const router = useRouter();
  const { userId } = router.query;
  const [loader, setloader] = useState(false)
  const [permission, setpermission] = useState(false);
  const [flag, setflag] = useState(false)
  const [col, setcollection] = useState({})
  const [end, setend] = useState('')
  const returnstart = (end) => {
    var date2 = new Date(end)
    const map_end = date2.toLocaleDateString().split('/')
    const real_end = map_end[1] + '/' + map_end[0] + '/' + map_end[2]
    setend(real_end)
  }
  var subs = null;
  useEffect(() => {
    if (!router.isReady) return;
    setloader(true)
    fetch()
    subs = localStorage.getItem('subscribed');
  }, [router.query  ])

  const fetch = async () => {
    const res = await userData(userId)
    // console.log(res);
    if (res && res.data && res.data.code === 0) {
      setcollection(res.data.data)
      if (res.data.data.subscription_startdate && res.data.data.subscription_startdate !== 0) {
        setflag(true)
        returnstart(res.data.data.subscription_enddate)
        if (subs === null) {
          localStorage.setItem('subscribed', true)
        }
      } else {
        setflag(false)
        if (subs !== null) {
          localStorage.removeItem('subscribed')
        }
      }
      if (res.data.data.permission) {
        if (res.data.data.permission[0] === 'google' || res.data.data.permission[0] === 'facebook') {
          setpermission(true)
        }
      }
    }else{
      logout();
    }
    setloader(false)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
  <div className='profile'>
    <div className='profile-child'>
      <div className='pcup'>
      <Image src={col.profilePic} alt='avatar' width={200} height={200}/>
      <Image src={editicon} alt="a" className='editicon'/>
      <div className='pcup1'>
        <input type='text' disabled value={col.email}/>
        <input type='text' disabled value={col.name}/>
      </div>
      </div>
      <div className='Currentsubscription'>
     
              <span>
                <p className='currentSubscription1'>Current Subscription</p>
                {flag ?
                <p className='currentValidityDate'>Subscription Validity - <span className="SubscriptionBuyPlan">{end}</span> <br /></p> :
                <p className='currentValidityDate'>Account Type - Free <span className="SubscriptionBuyPlan"><a href='/subscription' className='ChangeAnchorColor'>Buy Plan</a></span></p>
                }
              </span>
      </div>
      <button className='probtn' onClick={()=>logout()}>Logout</button>
    </div>
    <Image src={bottomline} alt="btnline"/>
  </div>
  )
}
export default withAuth(Profile)