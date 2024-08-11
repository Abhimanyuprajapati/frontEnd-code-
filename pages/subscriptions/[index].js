import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Access } from '../../services/context'
//import { purchase,purchase_new,purchase_stripe,purchase_paytm } from '../../context/Eventlogger'
import { useUserAuth } from '../../context/UserAuthContext'
import withAuth from '../../components/Auth/Hoc'
import Link from 'next/link'
const Success = () => {
  const router = useRouter();
  const {allPayments,allSubscriptions,updateOrder,confirmOrder}=useUserAuth()
  const [confirm,setconfirm]=useState({message:'',data:{subscription_enddate:''}})
  const [process,setprocess]=useState(true)
  const [loader,setloader]=useState(true)
  const [flag,setflag]=useState( false )
  const [orderId,setorderId]=useState('')
  const [userId,setuserId]=useState('')
  const[date,setdate]=useState('')
  const [amount_,setamount_]=useState('')
  const [cusMsg,setCusMsg]=useState("")

  const epoch_to_normal=(time)=>{
  const daten = new Date(time)
  setdate(daten.toLocaleDateString() )
  }
 
  useEffect(()=>{
    checkGateway(router.query.error,router.query.orderId,router.query.userId,router.query.packageId,router.query.paymentId,router.query.message,router.query.gatewayName)
  },[router.query])

  const checkGateway=async(error,orderId,userId,packageId,paymentId,message,gateway)=>{
    setuserId(userId)
    setorderId(orderId)
    let payments = await allPayments();
    let packages = await allSubscriptions()
    const finalPaymentDataElement = payments.filter(x=> x._id === paymentId)
    const finalPackageDataElement = packages.filter(x=> x._id === packageId)
    if(finalPaymentDataElement.length > 0 && finalPackageDataElement.length > 0 && userId && gateway){
     updateOrderFunc(error,orderId,userId,packageId,paymentId,message,gateway)
    }else{
      //router.push("/")
    }
  }
  
  const updateOrderFunc=async(error,orderId,userId,packageId,paymentId,message,gateway)=>{
    //for successfull payment
    let res={}
    let data={}
    let newData ={}
    setCusMsg(message)
    if(error === "false"){
      data= {
        "orderId":orderId,
        "userId":userId
      }
      newData = data;
      //purchase(orderId , paymentId
      if(gateway === "Stripe"){
        res = await confirmOrder(data)
        if(!res.data.error){
          setloader(false)
          setprocess(!process)
          setconfirm(res.data)
          epoch_to_normal(res.data.data.subscription_enddate)
          setflag(true)
        }else{
          setprocess(!process)
          setflag(false)
        }
      }else{
        //Phonepe
        data["pgPaymentId"]=paymentId
        data["gateway"]=gateway 
        res  = await updateOrder(data)
        console.log(res)
        if(res.data.error){
          setloader(false)
          setprocess(!process)
          setflag(false)
        }else if(!res.data?.error){
          res = await confirmOrder(newData)
          if(!res.data.error){
            setloader(false)
            setprocess(!process)
              setconfirm(res.data)
              epoch_to_normal(res.data.data.subscription_enddate)
              setflag(true)
              setTimeout(()=>{
               // router.replace(`/profile/${userId}`)
              },[5000])
          }else{
            setflag(false)
            setprocess(!process)
          }
        }
      }
    }else{
      data= {
        'orderId':orderId,
        'userId':userId,
        'error':message
      }
      res = await updateOrder(data)
      setloader(!loader)
      setprocess(!process)
      setflag(false)
    }
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
      <a href="mailto:contact@jalva.app"> contact@jalva.app</a>.
    <p className="mt-3" style={{'color':'red'}}>Please wait !! || Don't press the back button or close the window ...</p>
    </div>
    :
    <>
    {!flag ? 
    <div className='container success'>
    <h1>Order Failed ! {cusMsg}<br/>
    <span style={{'color':'red'}}>{orderId}</span>  </h1>
    
      Payment Unsuccessfull ! 
      If you have any questions, please email
      <a href="mailto:contact@jalva.app"> contact@jalva.app</a>.

      <p>{confirm.message}</p>
      <p>{date}</p>
    

    <p className="mt-3" style={{'color':'red'}}>Please wait ! you will be redirected. if not <Link href={`/profile/${userId}`}>click here</Link></p>
    </div>
    :
    <div className='container success'>
    <h1>Thanks for your Order! {cusMsg}<br/>
     <span style={{'color':'green'}}>{orderId}</span> </h1>
    
      Payment Successfull ! 
      If you have any questions, please email
      <a href="mailto:contact@jalva.app"> contact@jalva.app</a>.

      <p>{confirm.message}</p>
      <p>{date}</p>
    

    <p className="mt-3" style={{'color':'red'}}>Please wait ! you will be redirected. if not <a href={`/profile/${userId}`}>click here</a></p>
    </div>
    }
    </>}
    </div>
  )
}

export default withAuth(Success)