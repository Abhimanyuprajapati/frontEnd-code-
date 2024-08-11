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

import React, { Component, useState,useEffect} from 'react';
import '../css/category.css';
import {
    useNavigate,
    Link
  } from "react-router-dom";
import Instance from '../Objects/Axios';
import alertinstance from '../Objects/Alert';
import Select from 'react-select';
import Spin from './Spinner/Spin';
import { posterTypeOptions } from '../Objects/Country';
function Addsubcategorychild({icon}){
    let navigate = useNavigate();
    const [subtitle,setsubtitle]= useState("");
    const [subdescription,setsubdescription]=useState("");
    const [loading,setloading]=useState(false)
    const [weight,setweight]=useState(1);
    const [active,setActive]=useState(true)
    const [posterType,setposterType]=useState({value:'horizontal',label:'Horizontal'});
   
    function Addsub(e){
      e.preventDefault()
      setloading(!loading)
      let replace = subtitle.split(' ').join('_');
      let localisationKey = replace;
      let subcategory = [{
          "title":subtitle,
          "localisationKey": localisationKey,
          "description":subdescription,
          "rank":weight,
          "active":active,
          "poster_type":posterType.value
      }];
      const data = {subcategory};
        const params = JSON.stringify(data)
        Instance.post('/addSubCategory',params)
          .then((res) => {
            setloading(false)
            //handle success
              alertinstance(res);
              if(res.data.error === false)
              { 
                    setTimeout(() => {
                    navigate('/category')
                }, 1000);
              }
             
           })
          .catch((err) =>{
            //handle error
            setloading(false)
            alertinstance(err)
          });
         
  }
  const refreshPage = ()=>{
    window.location.reload();
 }
 const handletype = (e) =>{
  setposterType({value:e.value,label:e.label})
}
return(
  <>{!loading ? '':<Spin/>}
    <div class="container-fluid content">
       <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
          <span className='leftpush'> Add Sub Category</span>
        </div>
              <form onSubmit={Addsub}>
              <label><i class="fa fa-heading"/> Title</label>
              <input required name="" className="form-control" placeholder="Enter title *" type="text" onChange={(e)=>setsubtitle(e.target.value)}/>     
              <label><i class="fa fa-sort-amount-up"/> Description</label>
              <textarea required name="" className="form-control" placeholder="Enter description *" type="text" onChange={(e)=>setsubdescription(e.target.value)} rows="4" cols="50"/>      
              <input type="checkbox"  checked={active} onChange={e => setActive(e.target.checked)}/>
              <label>Active</label><br/>
              <label><i className="fa fa-calendar-alt"></i> Rank</label>
              <input className="form-control" placeholder="Enter rank*" type="number" value={weight} onChange={(e)=>setweight(e.target.value)}/>
              <label><i className="fa fa-heading"></i> Poster Type</label>
              <Select className=" p-0" options={posterTypeOptions} placeholder="Select Poster Type" onChange={handletype}></Select>
              <button className="btn btn-primary mt-2">Add Sub Category</button>
              <Link to="/category"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
              </form>
             
    </div>
  </>
  )      
}
export default Addsubcategorychild;

