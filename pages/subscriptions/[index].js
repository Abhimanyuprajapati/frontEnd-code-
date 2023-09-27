import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Access } from '../../services/context'
//import { purchase,purchase_new,purchase_stripe,purchase_paytm } from '../../context/Eventlogger'
import { useUserAuth } from '../../context/UserAuthContext'
import withAuth from '../../components/Auth/Hoc'
import Link from 'next/link'
const Success = () => {
  const router = useRouter();
  const {allPayments,allSubscriptions}=useUserAuth()
  
  const [confirm,setconfirm]=useState({message:'',data:{subscription_enddate:''}})
  const [process,setprocess]=useState(true)
  const [loader,setloader]=useState(true)
  const [flag,setflag]=useState( false )
  var search,orderId,status,message,paymentId,packageId,userId;
  const [amount_,setamount_]=useState('')
  useEffect(()=>{
    const search = new URLSearchParams(window.location.search)
    orderId = search.get("orderid");
    status = search.get("status")
    message = search.get("message")
    paymentId = search.get("paymentid")
    packageId = search.get("packageid")
    userId = localStorage.getItem('id')
    checkGateway()
    updateOrder(orderId,userId,status,paymentId,message)
  },[])
  const checkGateway=()=>{
    if(allPayments.length > 0){
      const data = allPayments[0].payment.filter(x=> x._id === paymentId)
      const package_ = allSubscriptions[0].subscription.filter(x=> x._id === packageId)
      if(Array.isArray(package_)){
        const data ={
          amount:package_[0].price[0].value/100,
          currency:package_[0].price[0].currency
        }
        setamount_(data)
      }
      //purchase_new(package_)
      if(data && data[0].name === 'Stripe'){
       // purchase_stripe(data)
      }else if(data && data[0].name === 'Paytm'){
        //purchase_paytm(data)
      }
    }
  }
  
  const updateOrder=(orderId,userId,status,paymentId,message)=>{
    //for successfull payment
    if(status === 'true'){
      //purchase(orderId , paymentId)
      setflag(true)
      const data= {
        'orderId':orderId,
        'userId':userId
      }
      console.log(data)
      Access.post('/updateOrder',data)
      .then(res=>{
        setTimeout(()=>{
         confirmOrder(orderId,userId)
         },[2000])
         //null for stripe 
      })
    }
    //for failed transaction
    else{
      const data= {
        'orderId':orderId,
        'error':message
      }
      Access.post('/updateOrder',data)
      .then(res=>{
        //setTimeout(()=>{
         //confirmOrder(orderId,userId)
         //},[3000])
         //null for stripe 
      }).catch(err =>{
        if(err.response.status === 403){
          localStorage.clear()
          router.replace('/login')
        }
      })
    }
  
  }
  const confirmOrder=(orderId,userId)=>{
    const param = {
      'orderId':orderId,
      'userId':userId
    }
    Access.post('/confirmOrder',param)
    .then(res=>{
      setloader(false)
      setprocess(!process)
      if(res.status === 200 && res.data.error === false){
        //purchase_new(amount_)
        setconfirm(res.data)
        epoch_to_normal(res.data.data.subscription_enddate)
        setTimeout(()=>{
          router.replace(`/profile/${userId}`)
        },[5000])
      }
      if(res.data.error === true){
        setflag(false)
        setTimeout(()=>{
          router.replace(`/profile/${userId}`)
        },[5000])
        //purchase_new(amount_)
      }
    }).catch(err =>{
      if(err.response.status === 403){
        localStorage.clear()
        router.replace('/login')
      }
    })
  }


  const[date,setdate]=useState('')
  const epoch_to_normal=(time)=>{
    const daten = new Date(time)
    setdate(daten.toLocaleDateString() )
  }

  return (
    <div style={{'paddingTop':'100px','color':'#fff'}}>
      <div className={ loader ? 'loader' : 'loader hide'}>
      <div className='spin'/>
    </div>
    {
    process ? 
    <div className='container success'>
    <h1>Order Processing ! <br/>
    <span style={{'color':'#0099e3'}}>{orderId}</span>  </h1>
    
      Processing .... <br/>
      If you have any questions, please email
      <a href="mailto:support@filmcity.app"> support@filmcity.app</a>.
    <p className="mt-3" style={{'color':'red'}}>Please wait !! || Don't press the back button or close the window ...</p>
    </div>
    :
    <>
    {!flag ? 
    <div className='container success'>
    <h1>Order Failed ! <br/>
    <span style={{'color':'red'}}>{orderId}</span>  </h1>
    
      Payment Unsuccessfull ! 
      If you have any questions, please email
      <a href="mailto:support@filmcity.app"> support@filmcity.app</a>.

      <p>{confirm.message}</p>
      <p>{date}</p>
    

    <p className="mt-3" style={{'color':'red'}}>Please wait ! you will be redirected. if not <Link href={`/profile/${userId}`}>click here</Link></p>
    </div>
    :
    <div className='container success'>
    <h1>Thanks for your Order! <br/>
     <span style={{'color':'green'}}>{orderId}</span> </h1>
    
      Payment Successfull ! 
      If you have any questions, please email
      <a href="mailto:support@filmcity.app"> support@filmcity.app</a>.

      <p>{confirm.message}</p>
      <p>{date}</p>
    

    <p className="mt-3" style={{'color':'red'}}>Please wait ! you will be redirected. if not <a href={`/my-profile/${userId}`}>click here</a></p>
    </div>
    }
    </>}
    </div>
  )
}

export default withAuth(Success)