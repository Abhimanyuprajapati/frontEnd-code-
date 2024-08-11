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
import {
    useNavigate,
  } from "react-router-dom";
import sampler from '../Objects/axiosjson';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ListInapp from './ListInapp';
const Subscriptionchild = ({icon}) => {
    let navigate = useNavigate();
    const [bucket,setbucket]=useState([]);
    const data = {
        platform :''
    }
    const [checked,setChecked]=useState(false)
    const handleChange1 = value => {
       // setlink(value._id)
       setChecked(!checked)
    }
    useEffect(()=>{
        sampler.post('/listPackages',data)
        .then(res=>{
            if(!res.data.error){
                setbucket(res.data.data)
            }  
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const [hover,sethover]=useState(false);
    const [packageId,setpackageId]=useState('')
    const [packageName,setpackageName]=useState('')
    
    const toggleDropdown =(x,y)=> {
       sethover(!hover);
       setpackageId(x)
       setpackageName(y)
    }
    const datetransform=(date)=>{
        const date1 = new Date(date);
        const dd = date1.toLocaleDateString();
        return <p>{dd}</p>
    }
    return (
        <div className="content">
            <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> {checked ? 'In-app packages' :'Subscription Packages'}</span>
            </div>
            
            
            
            <p className='path p-3 mt-2'>Home / {checked ? 'In-app Packages':'Subscription Packages'} / </p>
            
            {checked ? 
            <button className='btn btn-primary mt-2'  onClick={()=>{navigate("/Inapp/create/package")}}><i className="fa fa-plus"></i> Create Package</button>
            :
            <button className='btn btn-danger mt-2'  onClick={()=>{navigate("/subcription/add")}}><i className="fa fa-plus"></i> Add Subscription Package</button>}
            
            
            <FormControlLabel control={ <Switch
                        checked={checked}
                        onChange={handleChange1}
                    />} label="In-app Packages" />



            {checked ? <ListInapp/>:
            <>
            <div className={hover ? 'list shadow':'listnone shadow'}>
                <li onClick={()=>{navigate("/subcription/update/"+`${packageId}`+'/'+`${packageName}`)}}>
                    {/*<span className='flex1'><i className="fa fa-edit"></i></span>*/}
                    <span className='flex2'>Update Package</span>
                </li>
                <li onClick={()=>{navigate("/subcription/prices/"+`${packageId}`+'/'+`${packageName}`)}}>
                    {/*<span className='flex1'><i className="fa fa-eye"></i></span>8*/}
                    <span className='flex2'>View Prices</span>
                </li>
                {/*<li onClick={()=>{navigate("/subcription/"+`${packageId}`)}}>4. <span>update price in the subscription package</span></li>*/}
            </div>
            <table className="table table-striped mt-2">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Platform</th>
                <th scope="col">Period</th>
                <th scope="col">Date</th>
                <th scope="col">Benefits</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {bucket.map((x,index)=>{
                return(
                    <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{x.name}</td>
                    <td>{x.platforms}</td>
                    <td>{x.period}</td>
                    <td>{ datetransform(x.dateUpdated) }</td>
                    <td>{x.benefits.map((r,index)=>{
                        if(r.benifitsName){
                            return(
                                <p key={index}>{r.benifitsName}</p>
                            )
                        }else{
                            return(
                                <p key={index}>{r}</p>
                            )   
                        }   
                    })}</td>
                    <td>{x.status}</td>
                    <td><i className="fa fa-ellipsis-h ms-4" onClick={() => toggleDropdown(x._id,x.name)}></i></td>
                    </tr>
                    )})}
            </tbody>
            </table>
            </>
            }
            
        
        </div>
    )
}

export default Subscriptionchild
