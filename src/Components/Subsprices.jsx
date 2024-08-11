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

import React, {useState,useEffect} from 'react';
import '../css/App.css';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/content.css';
import Select from 'react-select';
import {
    useNavigate,
    useParams
  } from "react-router-dom";
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import AsyncSelect from 'react-select/async';
import Instance from'../Objects/Axios';
const Subsprices = ({icon}) => {
    let {packageId} =useParams()
    let {packageName}=useParams()
    const navigate = useNavigate()
    const [bucket,setbucket]=useState([])
    useEffect(()=>{
        const data = {
            packageId : packageId
        } 
        sampler.post('/listPriceinPackage',data)
        .then(res=>{
            setbucket(res.data.data.price)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    
    const deleteprice =()=>{
        sampler.delete('/deletePrice?packageId='+`${packageId}`+'&&priceId='+`${priceId}`)
        .then(res=>{
           alertinstance(res)
        }).catch(err=>{
        alertinstance(err)
        })
    }
    const[hover,sethover]=useState('')
   const[priceId,setpriceId]=useState('')
   const[priceName,setpriceName]=useState('')
    const toggleDropdown =(x,y)=> {
        sethover(!hover);
        setpriceId(x)
        setpriceName(y)
       }
   
  return (
    <>
     <div className='content'>
        <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
            <span className='leftpush'>Price of {packageName}</span>
        </div>
        <button className='btn btn-danger'  onClick={()=>{navigate("/subcription/addprice/"+`${packageId}`+'/'+`${packageName}`)}}><i className="fa fa-plus"></i> Add Price</button>
       <div className={hover ? 'list shadow':'listnone shadow'}>
            <li onClick={()=>{navigate("/subcription/addprice/"+`${packageId}`+'/'+`${packageName}`)}}>
                    <span className='flex2'>Add New Price</span>
            </li>
            <li onClick={()=>{navigate("/subcription/prices/update/"+`${packageId}`+'/'+`${packageName}`+'/'+`${priceId}`+'/'+`${priceName}`)}}> Update Price</li>
            <li onClick={ ()=> deleteprice(priceId)}> Delete Price</li>
        </div>
        <table class="table mt-2">
        <thead>
            <tr>
            <th scope="col">No</th>
            <th scope="col">Price Name</th>
            <th scope="col">Currency</th>
            <th scope="col">CurrencyDescription</th>
            <th scope="col">Value</th>
            <th scope="col">Options</th>
            </tr>
        </thead>
        <tbody>
                {bucket.map((x,index)=>{
                    return(
                        <>
                        <tr>
                        <th scope="row">{index +1}</th>
                        <td>{x.country}</td>
                        <td>{x.currency}</td>
                        <td>{x.currencyDescription}</td>
                        <td>{x.value}</td>
                        <td><i className="fa fa-ellipsis-h ms-4" onClick={() => toggleDropdown(x._id,x.country)}></i></td>
                        </tr>
                        </>
                    )
                })}
        </tbody>
        </table>
       
        </div>
    </>
  )
}

export default Subsprices