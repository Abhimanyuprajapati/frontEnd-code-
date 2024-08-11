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
import {
    useNavigate,
    useParams,Link
  } from "react-router-dom";
import '../css/content.css';
import Select from 'react-select';
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import AsyncSelect from 'react-select/async';
import Spin from './Spinner/Spin';
const Updatesubscomponent = (props) => {
    const [name,setname]=useState('');
    const [platforms,setplatforms]=useState({label:''});
    const [period,setperiod]=useState('');
    const [loading,setloading]=useState(false)
    const [status,setstatus]=useState('')
    let {packageId}=useParams()
    let {packageName}=useParams()
    const navigate = useNavigate()
    const [ca,setca]=useState('');
    const [ct,setct]=useState('');
    const [couponf,setcouponf]=useState(false)
     //---------------------------------for managing benefits -------------------------------------//
    const [benefits, setbenefits] = useState([])
    const option_benefits=async()=>{
        //return sampler.get('/listPackageBenifits').then(res => res.data.data )
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
    useEffect(()=>{
        const beni=()=>{
            const data = {
                platform :''
            }
            sampler.post('/listPackages',data)
            .then(res=>{
                call(res.data.data)
            })
        }
        beni();
    },[])

    const call =(val)=>{
        var arr= []
        for (var i = 0; i < val.length; i++) {
            if (val[i]._id == packageId) {
                //restructuring the benefits array
                val[i].benefits.map(x=>{
                    return arr.push({
                        benifitsName:x,
                        benefitsUUID:x
                    })
                })
               setbenefits(arr)
               setname(val[i].name)
               setperiod(val[i].period)
               setplatforms({label:val[i].platforms})
               setstatus({label:val[i].status})
               setcouponf(val[i].couponEnabled)
                if(val[i].couponEnabled){
                    setct(val[i].coupon[0].couponTitle)
                    setca(val[i].coupon[0].couponAmountInPercentage)
                }
            }
         }
         
    }
    var state = [{label:'active'},{label:'inactive'}]
    var platform = [
        {
            label:'Android TV'
        },
        {
            label:'Android Phone'
        },
        {
            label:'iPhone'
        },
        {
            label:'PC/MAC'
        },
        {
            label:'Apple TV'
        },
        {
            label:'Fire TV'
        }
    ]
    const updatesubs=(e)=>{
        e.preventDefault();
        setloading(!loading)
        var arrben =[]
        benefits.map(x=>{
            return arrben.push(x.benifitsName);
        })
            const params = {
                packageId: packageId,
                benefits : arrben,
                platforms: platforms.label,
                name: name,
                period: period,
                status:status.label,
                couponEnabled:couponf,
                coupon: !couponf ? []: {couponTitle:ct,couponAmountInPercentage:ca}
            }
            sampler.post('/updatePackages',params)
            .then(res=>{
                alertinstance(res)
                setloading(false)
                if(res.data.error === false){
                    setTimeout(() => {
                        navigate('/subcription')
                    }, 1500);
                }
            }).catch(err=>{
                console.log(err)
            })
        
       
    }
   
    const handlebenifit=(e)=>{
        setbenefits(Array.isArray(e)?e:[])
    }
    
    return(
        <>{!loading ? '':<Spin/>}
        <div className='content'>
        <div class="alert alert-primary"> <i className="fa fa-bars" onClick={props.icon} ></i> <span className="leftpush">You are updating {packageName}</span> </div>
        <form onSubmit={updatesubs}>
        <label><i className="fa fa-heading"></i>Name</label>
        <AsyncSelect
                    isMulti
                        cacheOptions
                        defaultOptions
                        value={benefits} 
                        defaultValue={benefits} 
                        getOptionLabel={e => e.benifitsName}
                        getOptionValue={e => e.benifitsName}
                        loadOptions={option_benefits}
                        onChange={handlebenifit}
                        placeholder='Select Benefits*'
        />
                            <label><i className="fa fa-heading"></i>Name</label>
                            <input
                                name=""
                                value={name}
                                className="form-control"
                                placeholder="Enter package name*"
                                type="text"
                                onChange={(e)=>setname(e.target.value)}
                            />
                            <label><i className="fa fa-heading"></i>Platform</label>
                            <Select className="form-select p-0" options={platform}  value={platforms} defaultValue={platforms} onChange={(e)=>setplatforms(e) } placeholder="Select status*"></Select>
                            <label><i className="fa fa-heading"></i>Period</label>
                            <input
                                name=""
                                value={period}
                                className="form-control"
                                placeholder="Enter period*"
                                type="number"
                                onChange={(e)=>setperiod(e.target.value)}
                            />
                            <label><i className="fa fa-heading"></i>Status</label>
                            <Select className="form-select p-0" options={state}  value={status} defaultValue={status} onChange={(e)=>setstatus(e)} placeholder="Select platform*"></Select>
                            <input type="checkbox"  checked={couponf} onChange={e => setcouponf(e.target.checked)}/>
                            <label>Enable Coupon</label><br/>
                            {!couponf ? '':
                            <>
                            <label><i className="fa fa-heading"></i>Coupon Title</label>
                            <input
                                className="form-control"
                                placeholder="Enter coupon title*"
                                type="text"
                                value={ct}
                                onChange={(e)=>setct(e.target.value)}
                            />
                            <label><i className="fa fa-heading"></i>Coupon Amount In Percentage</label>
                            <input
                                className="form-control"
                                placeholder="Enter coupon amount*"
                                type="text"
                                value={ca}
                                onChange={(e)=>setca(e.target.value)}
                            /></>}
                            <button type="submit" className='btn btn-primary mt-2'>Update Package</button>
                            <Link to={'/subcription'}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
        </form>
        </div>
        </>
    )
    };

export default Updatesubscomponent;
