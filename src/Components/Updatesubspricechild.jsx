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
import '../css/content.css';
import {
    useNavigate,
    useParams,Link
  } from "react-router-dom";
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
const Updatesubspricechild = ({icon}) => {
    let {packageId} = useParams()
    let {priceId} = useParams()
    let {priceName} = useParams()
    let {packageName}= useParams()
    let navigate = useNavigate()
    const [packageprice, setpackageprice]=useState('');
    const [loading,setloading]=useState(false)
    //options for select country code 
    useEffect(()=>{
        listprice();
    },[])

    const listprice =()=>{
        const data = {
            packageId : packageId
        } 
        
        sampler.post('/listPriceinPackage',data)
        .then(res=>{
            bind_data(res.data.data.price)
        })
    }
    const [countryCode,setcountryCode]=useState('')
    const [value,setvalue]=useState('')
    const [prevprice,setprevprice]=useState('')
    const [country,setcountry]=useState('')
    const [currency,setcurrency]=useState('')
    const [currencyDescription,setcurrencyDescription]=useState('')
    const bind_data=(listdata)=>{
        for (var i = 0; i < listdata.length; i++) {
                if (listdata[i]._id === priceId) {
                setvalue(listdata[i].value)
                setprevprice(listdata[i].previousPrice)
                setcountryCode(listdata[i].countryCode)
                setcountry(listdata[i].country)
                setcurrency(listdata[i].currency)
                setcurrencyDescription(listdata[i].currencyDescription)
            }
        }
    }

    const addsubs=(e)=>{
        e.preventDefault();
        setloading(!loading)
        const data={
            packageId:packageId,
            priceId:priceId,
            price:{
                countryCode:countryCode,
 	 	 	    value:value,
                previousPrice:prevprice,
                country:country, 
                currency:currency
            },
        }
        sampler.post('/updatePrice',data)
        .then(res =>{
            alertinstance(res)
            setloading(false)
            setTimeout(() => {
                navigate('/subcription/prices/'+packageId+'/'+packageName)
                }, 1500);
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <>{!loading ? '':<Spin/>}
        <div className='content'>
        <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
        <span className='leftpush'>you are updating new price In {priceName}</span></div>
        <form onSubmit={addsubs}>
        {/*
        <Select className="form-control p-0"  options={data_price}  getOptionLabel={e=>e.country}  placeholder="select" onChange={handle}></Select>*/}<br/>
        <label className="mt-0">Price</label>
        <input type="text"  className='form-control'  value={value} placeholder='price' onChange={(e)=> setvalue(e.target.value)}></input>
        <label className="mt-0">Previous Price</label>
        <input type="text"  className='form-control'  value={prevprice} placeholder='price' onChange={(e)=> setprevprice(e.target.value)}></input>
        <button className="btn btn-primary mt-2" type="submit">Update</button>
        <Link to={'/subcription/prices/'+packageId+'/'+packageName}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
        </form>
        </div>
        </>
    )
    };

export default Updatesubspricechild;
