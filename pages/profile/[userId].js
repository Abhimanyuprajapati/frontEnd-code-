import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { useRouter } from 'next/router'
import play from '../../assets/image/download_app_2.png';
import Image from 'next/image'
import app from '../../assets/image/download_app_1.png';
import withAuth from '../../components/Auth/Hoc'
import logoutLogo from '../../assets/loginPage/Vector 3 (Stroke).png'
import avatar from '../../assets/image/default-avatar.png'
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
  }, [router.isReady])

  const fetch = async () => {
    const res = await userData(userId)
    // console.log(res);
    if (res && res.data && res.data.code === 0) {
      setcollection(res.data.data)
      console.log(res.data.data);
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
      router.push('/')
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
    <section className='profile'>
        <div className='profileMain'>
          <div>
          {!permission ?
            <Image src={col.profilePic !== '' ? avatar : avatar} alt="identifire" height='100' width='100' id="user" className='avatarOne' /> :
            <Image src={col.profilePic !== '' ? col.profilePic : avatar} alt="identifire" height='100' width='100' id="user" className='avatarOne' />
          }
          </div>
          {/* <div className='nameimg'>

          </div> */}
          <div>
          <p className='username'> {col.name ? col.name : col.mobile}
           {!permission ? <i className='fa fa-cog' onClick={handleClick} style={{ 'paddingLeft': '10px', 'fontSize': '18px', 'cursor': 'pointer' }}></i> : ''}
           </p>
           <p className='userGmail'>{col.email}</p>
          </div>
          <div>
          {flag ?
           <p style={{ 'lineHeight': '50px' }} className='userBuyPlan'>Subscription Till- <span className="SubscriptionBuyPlan">{end}</span> <br /></p> :
           <p className='userBuyPlan'>Account Type - Free <span className="SubscriptionBuyPlan"><a href='/subscription' className='ChangeAnchorColor'>Buy Plan</a></span></p>
         }
         
          </div> 
          <hr />
         <h3 className='profileHeader'>Download Our App For Better Experience</h3>
         <div className='images'>
           <a target="_blank" href="#"><Image className='playstore' src={play} alt="ff" width="auto" height="auto" /></a>
           <a target="_blank" href="#"><Image className='playstore' src={app} alt="ff" width="auto" height="auto" /></a>
         </div>
         <div >
         <p className='LogoutOne' onClick={() => { logout(); setloader(true) }}>Logout  {" "}<Image src={logoutLogo}/></p>
         </div>
       
        </div>
    </section>
  )
}
export default withAuth(Profile)