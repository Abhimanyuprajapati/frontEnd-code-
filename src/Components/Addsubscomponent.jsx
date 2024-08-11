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
import React, {useEffect, useState} from 'react';
import '../css/App.css';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/content.css';
import Select from 'react-select';
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import { useNavigate,Link } from 'react-router-dom';
import Spin from './Spinner/Spin';
import AsyncSelect from 'react-select/async';
const Addsubscomponent = ({icon}) => {
    let navigate = useNavigate()
    const [name,setname]=useState('');
    const [platforms,setplatforms]=useState('');
    const [ca,setca]=useState('');
    const [ct,setct]=useState('');
    const [period,setperiod]=useState('');
    const [price,setprice]=useState([]);
    const [couponf,setcouponf]=useState(false)
    const [loading,setloading]=useState(false)
    //---------------------------------for managing benefits -------------------------------------//
    const [benefits, setbenefits] = useState([])

    useEffect(()=>{
        //sampler.get('/listPackageBenifits').then(res => console.log(res) )
    },[])

    const option_benefits=async()=>{
        return [
            {
            benifitsName:'Unlimited Streaming',
            benifitsUUID:'Unlimited Streaming'
            },
            {
            benifitsName:'Watch Content In HD, 4K, 2K',
            benifitsUUID:'Watch Content In HD, 4K, 2K'
            },
            {
            benifitsName:'Watch Everywhere',
            benifitsUUID:'Watch Everywhere'
            },
            {
            benifitsName:'New Release In Every Week',
            benifitsUUID:'New Release In Every Week'
            },
        ]
    }
    //options for select country code 
    var data_country = [
        {
         
            countryCode:"us",
            value : 400,
            country: "United States of America",
            currency : "USD",
            previousPrice:0,
            currencyDescription : "US Dollar"

        },
        {  
            countryCode:"in",
            value :9900,
            country: "India",
            currency : "INR",
            previousPrice:0,
            currencyDescription : "INR Rupees"
        }
    ];

    var platform = [
        {
            value:'Android TV'
        },
        {
            value:'Android Phone'
        },
        {
            value:'iPhone'
        },
        {
            value:'PC/MAC'
        },
        {
            value:'Apple TV'
        },
        {
            value:'Fire TV'
        }
    ]
    const handle = (e) =>{
        setprice(Array.isArray(e)?e:[]);
    }
    const addsubs=(e)=>{
            e.preventDefault();
            var arr=[]
            benefits.map(x=>{
                return arr.push(x.benifitsName)
            })
            setloading(!loading)
            const params = {
                name: name,
                benefits : arr,
                platforms:platforms,
                period:period,
                price:price,
                couponEnabled:couponf,
                coupon: !couponf ? []: {couponTitle:ct,couponAmountInPercentage:ca} 
            }
            sampler.put('/addPackages',params)
            .then(res=>{
                setloading(false)
                alertinstance(res)
                if(res.data.error === false){
                    setTimeout(() => {
                        navigate('/subcription')
                    }, 1500);
                }
            })
    }
    const handlebenifit=(e)=>{
        setbenefits(Array.isArray(e)?e:[])
    }

    
    return(
        <>{!loading ? '':<Spin/>}
        <div className='content'>
        <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
            <span className='leftpush'> Add Subscription Packages</span>
        </div>
        <form onSubmit={addsubs}>
        <label><i className="fa fa-heading"></i>Name</label>
        <AsyncSelect
                    isMulti
                        cacheOptions
                        defaultOptions
                        getOptionLabel={e => e.benifitsName}
                        getOptionValue={e => e.benifitsUUID}
                        loadOptions={option_benefits}
                        onChange={handlebenifit}
                        placeholder='Select Benefits*'
        />
                            <label><i className="fa fa-heading"></i>Name</label>
                            <input
                                className="form-control"
                                placeholder="Enter package name*"
                                type="text"
                                onChange={(e)=>setname(e.target.value)}
                            />
                            <label><i className="fa fa-heading"></i>Platform</label>
                            <Select className="form-select p-0" options={platform}  onChange={ (e)=> setplatforms(e.value) } getOptionLabel={e=>e.value} placeholder="Select platform*"></Select>
                            <label><i className="fa fa-heading"></i>Period</label>
                            <input
                                className="form-control"
                                placeholder="Enter period*"
                                type="number"
                                onChange={(e)=>setperiod(e.target.value)}
                            />
                            <label><i className="fa fa-heading"></i>Set Price</label>
                            <Select isMulti  className="form-select p-0"  getOptionLabel={e=>e.country} options={data_country}  onChange={handle} placeholder="Select country*"></Select>
                            
                            <input type="checkbox"  checked={couponf} onChange={e => setcouponf(e.target.checked)}/>
                            <label>Enable Coupon</label><br/>
                            {!couponf ? '':
                            <>
                            <label><i className="fa fa-heading"></i>Coupon Title</label>
                            <input
                                className="form-control"
                                placeholder="Enter coupon title*"
                                type="text"
                                onChange={(e)=>setct(e.target.value)}
                            />
                            <label><i className="fa fa-heading"></i>Coupon Amount In Percentage</label>
                            <input
                                className="form-control"
                                placeholder="Enter coupon amount*"
                                type="text"
                                onChange={(e)=>setca(e.target.value)}
                            /></>}
                            
                            <button type="submit" className='btn btn-primary mt-2'>Add package</button>
                            <Link to="/subcription"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
        </form>
        </div>
        </>
    )
    };

export default Addsubscomponent;
