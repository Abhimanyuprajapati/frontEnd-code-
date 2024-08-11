import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import sampler from '../../Objects/axiosjson'
import alertinstance from '../../Objects/Alert'
import Spin from '../Spinner/Spin'
const domain = process.env.REACT_APP_BASE;
const User = ({icon}) => {
let navigate = useNavigate()
const [data,setdata ]=useState([])
const [sub,setSub]=useState([])
const [userid,setuserid]=useState('')
const [package1,setpackage]=useState('')
const [inapp,setinapp]=useState([])
const [email, setemail] = useState('')
const [orders,setorders]=useState([])
const [loading,setloading]=useState(false)
 const [flag,setflag]=useState(false)
 const [subs,setsubs]=useState(false)
 const [inapp_flag,setinapp_flag]=useState(false)
 const [ban,setban]=useState(false)
 const [inv,setinv]=useState(false)
 const [message,setmessage]=useState('Something Went wrong')
 const [state,setstate] = useState({
  Email:false,
  Userid:false,
  Invoice:false,
  Name:false,
  StripeCustomerId:false,
  GpayorderId:false,
  Orderid:false,
})
const {Email,Mobile ,Userid, Invoice,Name, StripeCustomerId,GpayorderId,Orderid} = state ;

 const handle=(e)=>{
  const data  =  e.target.value;
  setinv(false)
  if(data === 'email'){
    setstate({...state, Name:false, Email:true,Mobile:false,Orderid:false,Invoice:false,GpayorderId:false,Userid:false,StripeCustomerId:false})
  }else if(data === 'mobile'){
    setstate({...state, Name:false, Email:false,Mobile:true,Orderid:false,Invoice:false,GpayorderId:false,Userid:false,StripeCustomerId:false})
  }else if(data === 'name'){
    setstate({...state, Name:true, Email:false,Mobile:false,Orderid:false,Invoice:false,GpayorderId:false,Userid:false,StripeCustomerId:false})
  }else if (data === 'orderid'){
  setstate({...state, Name:false, Email:false,Mobile:false,Orderid:true,Invoice:false,GpayorderId:false,Userid:false,StripeCustomerId:false})
  }else if (data === 'invoice'){
    setstate({...state, Name:false, Email:false,Mobile:false,Orderid:false,Invoice:true,GpayorderId:false,Userid:false,StripeCustomerId:false})
  }
  else if (data === 'gpayorderid'){
    setstate({...state, Name:false, Email:false,Mobile:false,Orderid:false,Invoice:false,GpayorderId:true, StripeCustomerId:false,Userid:false})
  }
  else if (data === 'stripecustomerid'){
    setstate({...state, Name:false, Email:false,Mobile:false,Orderid:false,Invoice:false,GpayorderId:false,Userid:false, StripeCustomerId:true})
  }
  else if (data === 'userid'){
    setstate({...state, Name:false, Email:false,Mobile:false,Orderid:false,Invoice:false,GpayorderId:false,Userid:true, StripeCustomerId:false ,})
  }
  else if(data  === 'generate_invoice'){
    setinv(true)
  }
  else {
    setstate({...state, Name:false, Email:false,Mobile:false,Orderid:false,Invoice:false,GpayorderId:false,Userid:false,StripeCustomerId:false})
  }
  
}

const handleEmail=(e )=>{
  setemail(e.target.value)
}
const Search=()=>{
  setloading(true)
  var params = {
    email:''
  }
  if(Email){
    params = {
      email:email
    }
  }
  else if(Mobile){
    params = {
      mobile: `+91-${email}`
    }
  }
  else if(Name){
    params = {
      name:email
    }
  }
  else if(Userid){
    params = {
      userid:email
    }
  }else if(Invoice){
    params = {
      invoiceNumber:email
    }
  }else if(StripeCustomerId){
    params={
      stripeCustomerId:email
    }
  }else if(GpayorderId){
    params={
      gpayorderId:email,
      gateway:'gpay'
    } 
  }else if(Orderid){
    params={
      orderId:email
    }
  }
  sampler.post('/searchUser',params)
  .then(res=>{
    setloading(false)
    if(res.data.error ===  false){
      setflag(false)
      setdata(res.data.data)
      if(res.data.data.length > 0){
        setuserid(res.data.data[0]._id)
        if(res.data.data[0].subscription_package){
          setpackage(res.data.data[0].subscription_package)
        }
        if(res.data.data[0].accounstatus === 'banned'){
          setban(true)
        }else{
          setban(false)
        }

        if(res.data.data[0].permission[0] === 'google'){
          setinapp_flag(true)
        }
      }else{
        setflag(true)
        setmessage('no records found !!')
      }
      
    }else{
      setflag(true)
      setmessage(res.data.message)
    }
  }).catch(err=>{
    if(err.response){
      if(err.response.status === 403){
        localStorage.clear()
        navigate('/login/error?message=session token expired please login again !')
      }
    }
  })
}
const date =(time)=>{
  const dd = new Date(time)
  const date1 = dd.toUTCString();
  return (
    <>
    { date1 }
    </>
  )
 
}

const UpdateSubscription=()=>{
  setsubs(true)
  const data = {
    platform:''
  }
  sampler.post('/listPackages',data)
  .then(res=>{
    
    if(res.data.error === false ){
      setSub(res.data.data)
    }
  })
  .catch(err=>{
    console.log(err)
  })
  
  sampler.post('/listAndroidInAppPackages')
  .then(res=>{
    if(res.status === 200){
      setinapp(res.data.data)
    }
  }).catch(err =>{
    console.log(err)
  })
}

 const Buysubscription=(period , pack)=>{
  
  let startTime = new Date().getTime(); // multiply with 1000 if timestamp is not in millisec
  let endTime = startTime+(period* 24*60*60*1000) // for 30 days subscriptions
  const params={
    userid:userid,
    subscription_enddate:endTime,
    subscription_startdate:startTime,
    subscription_package: !pack ?  package1 : pack
  }
  sampler.post('/updateSubscription',params)
  .then(res=>{
    
    alertinstance(res)
    if(res.status === 200 && res.data.error === false){
      Search()
      setsubs(false)
    }
  }).catch(err=>{
    if(err.response.status === 403){
      localStorage.clear()
      navigate('/login/error?message=session token expired please login again !')
    }
  })
}

const DeactivateSubscription=(userId)=>{
  const params={
    userId:userid 
   }
  sampler.post('/cancelSubscription',params)
  .then(res=>{
    alertinstance(res)
    if(res.status === 200 && res.data.error === false){
      Search()
      setsubs(false)
    }
  }).catch(err=>{
    if(err.response.status === 403){
      localStorage.clear()
      navigate('/login/error?message=session token expired please login again !')
    }
  })
}

const Banuser=()=>{
  const params = {
    userId:userid
  }
  sampler.post('/banUser',params)
  .then(res =>{
    alertinstance(res)
    if(res.status === 200 && res.data.error === false){
      Search()
      setsubs(false)
    }
    
  }).catch(err =>{
    if(err.response.status === 403){
      localStorage.clear()
      navigate('/login/error?message=session token expired please login again !')
    }
  })
}

const Activate=()=>{
  const params = {
    userId:userid
  }
  sampler.post('/activateAccount',params)
  .then(res =>{
    alertinstance(res)
    if(res.status === 200 && res.data.error === false){
      Search()
      setsubs(false)
    }
    
  }).catch(err =>{
    if(err.response.status === 403){
      localStorage.clear()
      navigate('/login/error?message=session token expired please login again !')
    }
  })
}


const Allorders=()=>{
  const params = {
    userId:userid
  }
  sampler.post('/getAllOrders',params)
  .then(res =>{
    
    alertinstance(res)
    if(res.status === 200 && res.data.error === false){
      setorders(res.data.data)
      //Search()
      setsubs(false)
      setflag(false)
    }
    
  }).catch(err =>{
    if(err.response.status === 403){
      localStorage.clear()
      navigate('/login/error?message=session token expired please login again !')
    }
  })
}

const Resetpasswordlink=()=>{
  const params = {
    email:email
  }
  
  sampler.post('/sendPasswordResetLink',params)
  .then(res=>{
    
    alertinstance(res)
  }).catch(err=>{
    if(err.response.status === 403){
      localStorage.clear()
      navigate('/login/error?message=session token expired please login again !')
    }
  })
}

  return (
    <>
    {!loading ? '':<Spin/>}
    <div className='content users'>
    <div className="alert alert-primary">  
      <i className="fa fa-bars" onClick={icon}></i>
      <span className='leftpush'>Users</span>
    </div>
    <p className='path p-3 mt-2'>Home / Users / </p>
        
    <label>Search Subscriptions </label>
        <div className='choose' style={{'display':'inlineFlex'}}>
        <div className="search" style={{'display':'inlineFlex'}}>
        {/*{!Email ? '' :<input type="text" placeholder="email address"  onChange={handleEmail} className='form-control'/>}
        {!Mobile? '' :<input type="number" placeholder="Mobile number" className='form-control'/>}
        {!Orderid ? '' :<input type="text" placeholder="order id" className='form-control'/>}
        {!Invoice ? '' :<input type="text" placeholder="invoice number" className='form-control'/>}
        {!Googleorderid ? '' : <input type="text" placeholder="google order id" className='form-control'/> }
        {!Googleinapp ? '' :<input type="text" placeholder="google in app purchase token" className='form-control'/> }*/}
        {inv ? 
        <input type="text" placeholder="Enter User Id"  onChange={(e) => setuserid(e.target.value)} value={userid} className='form-control'/>
        :
        <input type="text" placeholder="Enter Credential"  onChange={handleEmail} value={email} className='form-control'/>
}
        {inv ? <button className='btn' onClick={()=> Allorders() }><i className="fa fa-search" ></i> Fetch All Orders</button> :
        <button className='btn' onClick={()=> Search() }><i className="fa fa-search" ></i> Search</button>}
        </div>
        
        <input type="radio"  onChange={handle} value="email" name="email"/>
        <label id="email" >Email</label>
        <input type="radio"  onChange={handle} value="mobile" name="email"/>
        <label id="email" >Mobile No.</label>
        <input type="radio" onChange={handle} value="userid" name="email"/>
        <label id="email">User ID</label>
        <input type="radio" onChange={handle} value="invoice" name="email"/>
        <label id="email">Invoice Number</label>
        <input type="radio" onChange={handle} value="name" name="email"/>
        <label id="email">Name</label>
        <input type="radio" onChange={handle} value="stripecustomerid" name="email"/>
        <label id="email">Stripe Customer ID</label>
        <input type="radio" onChange={handle} value="gpayorderid" name="email"/>
        <label id="email">G PAY OrderId</label>
        <input type="radio" onChange={handle} value="orderid" name="email"/>
        <label id="email">Order Id</label>
        <input type="radio" onChange={handle} value="generate_invoice" name="email"/>
        <label id="email">Generate Invoice</label>
        </div>
        <div className='result'>
          {flag ? 
            <p className="p-2">{message}</p>
          : 
          <>
            {inv ? 
            <>
            {orders.map((x,index)=>{
              if(x.status === 'Paid and Subscribed'){
                return(
                  <div className='orders' key={index}>
                    <p><span>Count</span> <span className="child"> {index+1} </span></p>
                    <p><span>Invoice No</span> <span className="child green"> {x.receipt} </span></p>
                    <p><span>Order ID</span> <span className="child"> {x.orderId} </span></p>
                    <p><span>Status</span> <span className="child"> {x.status} </span></p>
                    <p><span>Package ID</span> <span className="child"> {x.packageId} </span></p>
                    <p><span>Amount Paid </span> <span className="child"> {x.amountPaid} </span></p>
                    <button className='btn btn-primary'><a target="_blank" rel="noopener noreferrer" href={`${domain}/invoice/voovi/subscription/${x.receipt}` }>Generate Invoice</a></button>
                  </div>
                )
              }
              })}
            </>
            :
            <>
              { data.map((x,index)=>{
                return(
                  <>
                  <p><span>User ID</span> <span className="child"> {x._id} </span></p>
                  <p><span>Permission </span><span className="child"> {x.permission} </span></p>
                  <p><span>Account Status</span> <span className="child"> {x.accounstatus} </span></p>
                  <p><span>Email Activated</span> <span className="child"> {x.emailactivated ? 'Yes' : 'No'} </span></p>
                  <p><span>Mobile Activated</span> <span className="child"> {x.Mobileactivated ? 'Yes' : 'No' } </span></p>
                  <p><span>Email</span> <span className="child"> {x.email} </span></p>
                  <p><span>Mobile</span> <span className="child"> {x.Mobile} </span></p>
                  <p><span>Name</span> <span className="child"> {x.name} </span></p>
                  <p><span>Subscription Type</span><span className="child "> {x.subscription_type} </span></p>
                  <p><span>Package</span> <span className="child"> {x.subscription_package} </span></p>
                  { x.subscription_type === 'free' ?
                  <>
                  {ban ? 
                  <button className='btn btn-primary' onClick={()=> Activate()}>Activate Account</button>
                  :
                  <>
                  <button className='btn btn-primary' onClick={()=> UpdateSubscription()}>Activate Subscription</button>

                  {inapp ? '':
                  <>
                  <button className='btn btn-primary' onClick={()=> Banuser()}>Deactivate Account</button>
                  <button className='btn btn-primary' onClick={()=> Resetpasswordlink()}>Reset Password Link</button>
                  </>}
                  
                  </>
                  }
                  </>
                  :
                  <>
                  {
                  ban ? 
                  <button className='btn btn-primary' onClick={()=> Activate()}>Activate Account</button>
                  :
                  <>
                    <p><span>Subscription Start Date</span> <span className="child green"> { date(x.subscription_startdate) } </span></p>
                    <p><span>Subscription End Date</span><span className="child red"> { date(x.subscription_enddate)} </span></p>
                    <button className='btn btn-primary' onClick={()=> DeactivateSubscription()}>Cancel Subscription</button>
                    <button className='btn btn-primary' onClick={()=> UpdateSubscription()}>Update Subscription</button>
                    {inapp ? '':
                      <>
                       <button className='btn btn-primary' onClick={()=> Banuser()}>Deactivate Account</button>
                    <button className='btn btn-primary' onClick={()=> Resetpasswordlink()}>Reset Password Link</button>
                      </>}
                   
                  </> 
                  }            
                  </>
                  }

                  {subs ?
                  <>
                  <i className='fa fa-close' onClick={()=> setsubs(false)}></i>
                  {inapp_flag ? 
                  <div className='ss'>
                    
                      {
                        inapp.map((x,index)=>{
                          return(
                            <div className='pack' key={index}>
                              <h2>{x.name}</h2>
                              <p>{x.period} Days </p>

                              <button onClick={()=> Buysubscription(x.period,x.inappproductId)}>Select </button>
                            </div>
                          )
                        })
                      }
                  </div>
                  :
                  
                  <div className='ss'>
                    
                      {
                        sub.map((x,index)=>{
                          return(
                            <div className='pack'  key={index}>
                              <h2>{x.name}</h2>
                              <p>{x.period} Days </p>

                              <button onClick={()=> Buysubscription(x.period,x._id)}>Select </button>
                            </div>
                          )
                        })
                      }
                  </div>
                  
                  }
                  </>
                  :''}

                  

                  {/*<button className='btn btn-primary'>Activate Account</button>
                  <button className='btn btn-primary'>Send Forget Password Link</button>*/}
                  
                  </>
                )
              })}
            </>
            }
          
          </>
          }
         
            
        
        </div>
        
        
        
        
    </div>
    </>
  )
}

export default User