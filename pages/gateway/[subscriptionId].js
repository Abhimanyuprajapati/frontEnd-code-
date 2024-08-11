import React,{useEffect,useState,useRef} from 'react'
import { useUserAuth } from '../../context/UserAuthContext';
import { Access } from '../../services/context';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/Gateways/CheckoutForm';
import paytmlogo from '../../assets/Payment/paytm_logo.png'
import stripelogo from '../../assets/Payment/stripe_logo.png'
import Upilogo from '../../assets/Payment/upi_logo.png'
import phonepeLogo from '../../assets/Payment/phonepay.png';
import Gpay from '../../assets/Payment/gpay_logo.jpg'
import paypal from '../../assets/Payment/PayPal.png'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import withAuth from '../../components/Auth/Hoc';
const Paytm = process.env.NEXT_PUBLIC_PAYTM;
const StripeKey = process.env.NEXT_PUBLIC_SECRET_KEY_STRIPE;
const PMID = process.env.NEXT_PUBLIC_PAYTM_MID;
const options = () => {
    const stripePromise = loadStripe(StripeKey);
    const {allPayments,allSubscriptions,logout}=useUserAuth()
    const router = useRouter();
    const {subscriptionId} = router.query;
    const [userId ,setuserId]=useState('');
    const [loader,setloader]=useState(false);
    const [paymentId,setpaymentId]=useState('')
    const [payment,setpayment]=useState([])
    const [subscription,setsubscription]=useState([])
    const [flag,setflag]=useState(false)
    const [orderId,setorderId]=useState('')
    const [handle_paytm,sethandle_paytm]=useState({})

    useEffect(()=>{
      if(!router.isReady){
        return ;
      }
      else{
        var userId1 = localStorage.getItem('id');
        setuserId(userId1)
        const retrive=async()=>{
          const payment1 = await allPayments() ;
          const subscription1 = await allSubscriptions() ;
          setpayment(payment1)
          setsubscription(subscription1)
        }
        retrive()
      } 
    },[router.isReady])

    const createOrder=(id,name)=>{
        setloader(true)
        setpaymentId(id)
        const data1 =subscription.filter(x=> x._id === subscriptionId)
        const filter_price = data1[0].price
        const data = {
          amount: filter_price[0].value,
          currency: filter_price[0].currency,
          packageId:subscriptionId,
          platform:"web",
          userId:userId,
          countryCode:filter_price[0].countryCode,
          paymentGatewayId:id
        }
       // begin_checkout(filter_price[0].value , filter_price[0].currency)
        if( name === 'Stripe' ){
          //checkout_stripe(filter_price[0].value , filter_price[0].currency)
            Access.post('/createOrder',data)
            .then(res=>{
              setloader(false)
                if(res.data.error === false){
                setflag(true)
                setClientSecret(res.data.data.stripePlainPaymentIntent)
                setorderId(res.data.data.orderId)
                }else{
                  logout()
                  router.push("/login");
                }
            }).catch(err=>{
              console.log(err)
            })
        }else if( name === 'Paytm'){
          //checkout_paytm(filter_price[0].value , filter_price[0].currency)
            Access.post('/createOrder',data)
            .then(res=>{
              setloader(false)
                if(res.data.error === false){
                  setflag(true)
                  sethandle_paytm(res.data.data)
                  setorderId(res.data.data.orderId)
                  setoption(!option)
                }
            }).catch(err=>{
              console.log(err)
            })
        }else if(name === "Phonepe"){
          Access.post('/createOrder',data)
            .then(res=>{
              if(res){
                setloader(false)
                if(!res.data.error){
                  setTimeout(()=>{
                   router.push(res.data.data.redirectUrl)
                  },[1000])
                }
              }
            }).catch(err=>{
              console.log(err)
            })
        }else{
          console.log("Show ALert")
        }
} 

//for paytm creating js element 
async function handleLoadScript(mode_selected,data) {
        const orderId1 = data.orderId;
        const txntoken = data.paymtxnToken;
        const amount = data.amount
        if (typeof window !== 'undefined'){
          if(window.Paytm && window.Paytm.CheckoutJS){
            //Add callback function to CheckoutJS onLoad function
              //Config
              var config = {
                flow:"DEFAULT",
                hidePaymodeLabel: false,
                data:{
                  orderId:orderId1,
                  amount:amount,
                  token:txntoken,
                  tokenType:"TXN_TOKEN"
                },
                merchant:{
                  mid:PMID
                },
                handler: {
                  notifyMerchant: function(eventType, data) {
                    
                  }
                }
              };
        
              //Create elements instance
              var elements = window.Paytm.CheckoutJS.elements(config);
              //Create card element
              if(mode_selected === 'UPI'){
                var cardElement = elements.createElement(window.Paytm.CheckoutJS.ELEMENT_PAYMODE.UPI, {root: "#upi", style: {bodyBackgroundColor: "#fff"}});
                cardElement.invoke();
              }
              if(mode_selected === 'NB'){
                var cardElement = elements.createElement(window.Paytm.CheckoutJS.ELEMENT_PAYMODE.NB, {root: "#netbanking", style: {bodyBackgroundColor: "#fff"}});
                cardElement.invoke();
              }
              if(mode_selected === 'PAY_WITH_PAYTM'){
                var cardElement = elements.createElement(window.Paytm.CheckoutJS.ELEMENT_PAYMODE.PAY_WITH_PAYTM, {root: "#paywithpaytm", style: {bodyBackgroundColor: "#fff"}});
                cardElement.invoke();
              }
              if(mode_selected === 'SCAN_AND_PAY'){
                var cardElement = elements.createElement(window.Paytm.CheckoutJS.ELEMENT_PAYMODE.SCAN_AND_PAY, {root: "#scanandpay", style: {bodyBackgroundColor: "#fff"}});
                cardElement.invoke();
              }
              
              //Render element
              
            
          }
        }
};
      const modechange=(mode)=>{
        //setmode(name
        handleLoadScript(mode,handle_paytm)
      }
      //callback - https://laltenstaging.xyz/capture/paytm/callback
      const cancleorder=()=>{
        const data= {
          orderId:orderId,
          paymentId:paymentId,
          userId:userId,
          error:'user canceled'
        }
        Access.post('/updateOrder',data)
        .then(res=>{
          setflag(false) 
          setoption(false)//null for stripe 
        }).catch(err=>{
          console.log(err)
        })
    
      }
    const [clientSecret, setClientSecret] = useState("");
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    const [option,setoption]=useState(false)

  return (
    <div className='payment'>
        <div className={ loader ? 'loader' : 'loader hide'}>
          <div className='spin'/>
        </div>
        {
          !option ?
          flag ? 
            <div className='row p-2'>
                <p style={{'padding':'10px','display':'inlineFlex','color':'#fff'}}><i className='fa fa-arrow-left' onClick={()=>cancleorder()}/> Back</p>
                 {clientSecret && (
                    <Elements className="mt-2" options={options} stripe={stripePromise}>
                    <CheckoutForm packageId={subscriptionId} userId={userId} orderId={!orderId?'':orderId}  paymentId={paymentId}/>
                    </Elements>
                )}
            </div>
            :
            <div className='row'>                
                <Link href='/subscription'><p style={{'color':'#fff','fontSize':'20px','padding':'0px 0px','textDecoration':'none'}}><i className='fa fa-angle-left'></i> Back </p></Link>
                { payment.length > 0 && payment.map((x,index)=>{
                return(
                  <div className="inner" key={index}>
                        {x.logo === 'Stripe' || x.logo === 'Phonepe' ? //Upilogo
                        <div className='innerchild'>
                        <Image className='image' src={ x.logo === 'Stripe' ? stripelogo : x.logo === 'Gpay' ? Gpay : x.logo === 'Paytm' ? paytmlogo : x.logo ==='Paypal' ? paypal : phonepeLogo } alt="pay" width="200" height="120" onClick={()=> createOrder(x._id,x.name)}/>
                        <div className='title'>
                          <h2>{x.name}</h2>
                          <p>{x.description}</p>
                        </div> 
                        </div>:
                        ''}
                  </div>  
                )
            })}
          </div>
          :
          ''
        }
        {
          !option ? 
          ''
          :
          <>
          <p onClick={()=>cancleorder()} style={{'padding':'10px 0px','display':'inlineFlex','color':'#fff','fontSize':'22px'}}><i className='fa fa-arrow-left'/> Back</p>
          <div className='paytm_option'>
            <Image src={paytmlogo} alt="logo" with="auto" height="auto"></Image>
            <ul>
              {/*<li onClick={()=> modechange('CARD')}><i className='fa fa-credit-card'></i> CREDIT / DEBIT CARD </li>
              <div id="card"></div>*/}
              <li onClick={()=> modechange('UPI')}><i className='fa fa-mobile-alt' style={{'fontSize':'20px'}}></i> UPI </li>
              <div id="upi"></div>
              <li onClick={()=> modechange('SCAN_AND_PAY')}><i className='fa fa-qrcode'></i> SCAN AND PAY</li>
              <div id="scanandpay"></div>
              <li onClick={()=> modechange('PAY_WITH_PAYTM')}><i className='fa fa-credit-card'></i> PAY WITH PAYTM</li>
              <div id="paywithpaytm"></div>
              <li onClick={()=> modechange('NB')}><i className='fa fa-university'></i> NET BANKING</li>
              <div id="netbanking"></div>
            </ul>
            
          </div>
          </>
        }
    </div>
  )
}

export default withAuth(options);