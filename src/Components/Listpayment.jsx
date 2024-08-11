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
import React, { useEffect, useState } from 'react';
import sampler from '../Objects/axiosjson';
import Select from 'react-select';
import {
  useNavigate,
  useParams
} from "react-router-dom";
const Listpayment = ({icon}) => {
  let navigate = useNavigate();
  const [container,setcontainer]=useState([]);
  const [status,setstatus]=useState('active');
  //for status
  var data_status=[
    {
      label:'Active'
    },
    {
      label:'Inactive'
    }
  ]
  useEffect(()=>{
    handlestatus(status)
  },[])
  {/*useEffect(()=>{
    handlestatus(status)
  },[1])*/}
  const handlechangestatus=(e)=>{
    setstatus(e.label);
    handlestatus(e.label.toLowerCase())
  }
  const handlestatus =(status)=>{
    const params = {
      status: status
    }
    sampler.post('/listPaymentGateways',params)
    .then(res=>{
      setcontainer(res.data.data)
    })
  }
  
  return (
  <div className='content'>
         <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Payment Gateway</span>
                </div>
                <p className='path p-3 mt-2'>Home / Payment Gateway / </p>
         <button className='btn btn-danger mt-2'  onClick={()=>{navigate("/payment/add")}}><i className="fa fa-plus"></i> Add payment gateway</button>
    <Select className="form-control p-0 mt-2" options={data_status} defaultValue={data_status[0]} placeholder="select status" onChange={handlechangestatus}></Select>
    <table className="table mt-2">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Logo</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">PaymentModes</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
    {
      container.map((x,index) =>{
        return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{x.logo}</td>
          <td>{x.name}</td>
          <td>{x.description}</td>
          <td>{x.status}</td>
          <td>{x.paymentModes.map(r=>{
            return(
              <>
              <p>{r}</p>
              </>
            )
          })}</td>
          <td><i className='fa fa-edit' onClick={()=>{ navigate("/payment/update/"+`${x._id}`+'/'+`${x.name}`+'/'+`${status}`)} }></i> </td>
        </tr>
        )
      })
    }
      </tbody>
</table>
  </div>
  )
};

export default Listpayment;
