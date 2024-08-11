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

import React,{useState}from 'react';
import sampler from '../Objects/axiosjson';
import Select from 'react-select';
import { useNavigate,Link } from 'react-router-dom';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
const Addpaymentchild = ({icon}) => {
  let navigate = useNavigate();
  const [name,setname]=useState('');
  const [status,setstatus]=useState('');
  const [logo,setlogo]=useState('');
  const [description,setdescription]=useState('');
  const [paymentModes,setpaymentModes]=useState([]);
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
    label:'Paypal'
  },
  {
    label:'Zaakpay'
  }
]
  //for adding payment 
  var data = [
    {
        value:0,
        label:'Credit/Debit cards'
    },
    {
        value:1,
        label:'UPI'
    },
    {
      value:2,
      label:'Net Banking'
    },
    {
      value:3,
      label:'UPI Intent'
    },
    {
      value:4,
      label:'Google In-app purchase'
    },
    {
      value:5,
      label:'Apple In-app purchase'
    },
    {
      value:6,
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
  setname(e.label)
}
const handlechange = (e) =>{
    setpaymentModes(Array.isArray(e)?e.map(x=>x.label):[]);
}
const handlechangelogo = (e) =>{
  setlogo(e.label);
}
const handlechangestatus=(e)=>{
  setstatus(e.label);
}

const obj = {
  name:name,
  status:status,
  logo:logo,
  description:description,
  paymentModes:paymentModes
}
const addpayment=(e)=>{
  e.preventDefault();
  setloading(!loading)
  sampler.post('/addPaymentGateways',obj)
  .then((res)=>{
  setloading(false)
      alertinstance(res);
      setTimeout(() => {
          navigate('/payment')
      }, 1500);
      }
  )
  .catch((err)=>{
    console.log(err)
  })
}
  return (
    <>{!loading ? '':<Spin/>}
    <div className="content">
          <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
            <span className='leftpush'> Add Payment Gateway</span>
          </div>
           <form onSubmit={addpayment}>
                        <label><i className="fa fa-heading"></i> Name</label>
                        <Select className=" p-0" options={data_name} placeholder="Select status" onChange={handlechangename}></Select>
                         <label><i className="fa fa-heading"></i> Status</label>
                         <Select className=" p-0" options={data_status} placeholder="Select status" onChange={handlechangestatus}></Select>
                         <label><i className="fa fa-heading"></i> Logo</label>
                         <Select className=" p-0" options={data_name} placeholder="Select logo" onChange={handlechangelogo}></Select>
                         <label><i className="fa fa-heading"></i> Description</label>
                        <textarea
                            name=""
                            cols="8"
                            rows="4"
                            className="form-control"
                            placeholder="Enter description"
                            type="text"
                            onChange={(e)=>setdescription(e.target.value)}
                        />
                         <label><i className="fa fa-heading"></i> Payment Modes</label>
            <Select className=" p-0" isMulti options={data} placeholder="Select payment modes" onChange={handlechange}></Select>
            <button type="submit" className='btn btn-primary mt-2'>Submit</button>
            <Link to="/payment"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
           </form>
     </div>
     </>
  )
};

export default Addpaymentchild;
