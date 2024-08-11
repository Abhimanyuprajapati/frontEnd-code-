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

import React, {useState} from 'react';
import '../css/App.css';
import '../css/Home.css';
import '../css/content.css';
import Select from 'react-select';
import {
    useNavigate,
    useParams,
    Link
  } from "react-router-dom";
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
const Addpricepackagechild = ({icon}) => {
    let {packageId} = useParams()
    let {packageName} = useParams()
    let navigate = useNavigate()
    const[price,setprice]=useState('');
    const [loading,setloading]=useState(false)
    //options for select country code 
    var data_price = [
        {  
            countryCode:"us",
            value : 400,
            country: "United States of America",
            currency : "USD",
            previousPrice:10000,
            currencyDescription : "US Dollar"

        },
        {
            countryCode:"in",
            value :9900,
            country: "India",
            currency : "INR",
            previousPrice:12000,
            currencyDescription : "INR Rupees"
        }
    ];
    const handle = (e) =>{
     setprice(e);
    }

    const addsubs=(e)=>{
        e.preventDefault();
        setloading(!loading)
        const data = {
            packageId:packageId,
            price:price
        }
        sampler.post('/addPrice',data)
        .then(res =>{
            alertinstance(res)
            setloading(false)
            if(res.data.error === false){
                setTimeout(() => {
                    navigate('/subcription')
                }, 1500);
            }
        })
    }

    return(
        <>{!loading ? '':<Spin/>}
        <div className='content'>
        <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
            <span className='leftpush'>you are adding new price In {packageName}</span>
        </div>
       
        <form onSubmit={addsubs}>
        <label className="mt-0">Add New Price</label>
        <Select className="form-control p-0"  options={data_price}  getOptionLabel={e=>e.country}  placeholder="select" onChange={handle}></Select>
        <button className="btn btn-primary mt-2" type="submit">Add</button>
        <Link to={'/subcription/prices/'+packageId+'/'+packageName}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
        </form>
        </div>
        </>
    )
    };

export default Addpricepackagechild;
