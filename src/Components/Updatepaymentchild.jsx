/*                              @Author : {}
* Copyright (c) 2021, by Tush Entertainment
* Permission to use, copy, modify or distribute this software in binary or source form
* for any purpose is allowed only under explicit prior consent in writing from Tush Entertainment.
* THE SOFTWARE IS PROVIDED "AS IS" AND TUSH ENTERTAINMENT DISCLAIMS
* ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL TUSH ENTERTAINMENT
* BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
* DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
* PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
* ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
* SOFTWARE.THIS SOFTWARE IS PROTECTED BY COPYRIGHT LAWS FROM INDIA AND USA.
* ANY OR ALL PART OF THIS SOFTWARE OR SOURCES CANNOT BE USED FOR ANY TYPES OF
* PRODUCTS WHICH IS DIRECTLY AND INDIRECTLY AFFECTING THE LIFE OF HUMANS.
*/

import React,{useEffect, useState}from 'react';
import sampler from '../Objects/axiosjson';
import Select from 'react-select';
import {useNavigate, useParams,Link} from "react-router-dom";
import Swal from 'sweetalert2';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
const Updatepaymentchild = ({icon}) => {
  let navigate = useNavigate()
  let {paymentGatewayId} = useParams()
  let {paymentGatewayName}= useParams()
  let {statusnew} = useParams()
  const [name,setname]=useState({label:''});
  const [logo,setlogo]=useState({label:''});
  const [description,setdescription]=useState('');
  const [paymentModes,setpaymentModes]=useState([]);
  const [st,setst]=useState({label:statusnew})
  const [loading,setloading]=useState(false)
  //for name field
var data_name = [
  {
    label:'Paytm'
  },
  {
    label:'Phonepe'
  },
  {
    label:'Apple InApp'
  },
  {
    label:'Paytm QR Code'
  },
  {
    label:'Paytm Netbanking'
  },
  {
    label:'Paytm Cards'
  },
  {
    label:'Paytm Wallets'
  },
  {
    label:'Paytm UPI'
  },
  {
    label:'Paytm UPIPushExpress'
  },
  {
    label:'Payu Netbanking'
  },
  {
    label:'Payu Cards'
  },
  {
    label:'Razorpay'
  },
  {
    label:'Paykun'
  },
  {
    label:'Gpay'
  },
  {
    label:'UPI'
  },
  {
    label:'Instamojo'
  },
  {
    label:'Cashfree Payment'
  },
  {
    label:'Stripe'
  },
  {
    label:'Zaakpay'
  }
]
  //for adding payment 
  var data = [
    {
        value:'Credit/Debit cards',
        label:'Credit/Debit cards'
    },
    {
        value:'UPI',
        label:'UPI'
    },
    {
      value:'Net Banking',
      label:'Net Banking'
    },
    {
        value:'UPI Intent',
        label:'UPI Intent'
    },
    {
      value:'Google In-app purchase',
      label:'Google In-app purchase'
    },
    {
      value:'Apple In-app purchase',
      label:'Apple In-app purchase'
    },
    {
      value:'Wallet',
      label:'Wallet'
    }
]

//for status
var data_status=[
  {
     label:'Active'
  },
  {
    label:'Inactive'
  }
]
const handlechangename=(e)=>{
  setname({label:e.label})
}
const handlechange = (e) =>{
  setpaymentModes(Array.isArray(e)?e.map(x=>x):[])
}
const handlechangelogo = (e) =>{
  setlogo({label:e.label});
}
const handlechangestatus=(e)=>{
  setst({label:e.label});
}
useEffect(()=>{
  const params = {
    status: st.label
  }
  sampler.post('/listPaymentGateways',params)
  .then(res=>{
    call(res.data.data)
  })
},[])
const call =(val)=>{
  const modes = []
  for (var i = 0; i < val.length; i++) {
      if (val[i]._id === paymentGatewayId) {
         setname({label:val[i].name})
         setdescription(val[i].description)
         setlogo({label:val[i].logo})
         val[i].paymentModes.map(x=>{
           modes.push({label:x,value:x})
         })
         setpaymentModes(modes)
      }
   }
}
const updatepayment=(e)=>{
  e.preventDefault();
  setloading(!loading)
  const pay = paymentModes.map(x=>x.label)
  const obj = {
    name:name.label,
    status:st.label,
    logo:logo.label,
    description:description,
    paymentModes: pay,
    paymentGatewayId:paymentGatewayId
  }
  
  sampler.post('/updatePaymentGateways',obj)
  .then(res=>{
    setloading(false)
    if(res.data.error === false){
      alertinstance(res)
      setTimeout(() => {
        navigate('/payment')
      }, 1500);
    }
    else{
      alertinstance(res)
    }
   
  })
  .catch((err)=>{
    setloading(!loading)
    console.log(err)
  })
}
  return (
    <>{!loading ? '':<Spin/>}
    <div class="content">
      <div class="alert alert-primary"> <i className="fa fa-bars" onClick={icon} ></i> <span className="leftpush">you are updating {paymentGatewayName}</span> </div>
           <form onSubmit={updatepayment}>
                        <label><i className="fa fa-heading"></i> Name</label>
                        <Select className="form-control p-0" options={data_name} value={name} defaultValue={name} placeholder="select name" onChange={handlechangename}></Select>
                         <label><i className="fa fa-heading"></i> Status</label>
                         <Select className="form-control p-0" options={data_status} value={st} defaultValue={st} placeholder="select logo" onChange={handlechangestatus}></Select>
                         <label><i className="fa fa-heading"></i> Logo</label>
                         <Select className="form-control p-0" options={data_name} value={logo} defaultValue={logo} placeholder="select payment modes" onChange={handlechangelogo}></Select>
                         <label><i className="fa fa-heading"></i> Description</label>
                        <input
                            name=""
                            value={description}
                            className="form-control"
                            placeholder="enter description"
                            type="text"
                            onChange={(e)=>setdescription(e.target.value)}
                        />
                         <label><i className="fa fa-heading"></i> Payment Modes</label>
            <Select className="form-control p-0" isMulti options={data} value={paymentModes} defaultValue={paymentModes} placeholder="select payment modes" onChange={handlechange}></Select>
            <button type="submit" className='btn btn-primary mt-2'>Submit</button>
            <Link to={'/payment'}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
           </form>
    </div>
    </>
  )
};

export default Updatepaymentchild;
