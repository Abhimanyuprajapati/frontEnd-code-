import React from 'react'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import MultipartAPI from '../../Objects/MultipartAPI';
import AsyncSelect from 'react-select/async';
import alertinstance from '../../Objects/Alert';
const AddReel = ({icon}) => {
  let navigate = useNavigate();
  const [obj,setobj]=useState({title:'',reelThumbnail:'',reelUrl:'',numLikes:'',numViews:'',dateAdded:0,contentId:'',published:false,active:false,autoExpiry:true,expireDate:0})
  const AddReel=(e)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append("formText", JSON.stringify(obj));
    formData.append('reelThumbnail',obj.reelThumbnail)
    
    //calling API for adding content
    MultipartAPI.post('/addReel',formData)
    .then(res=>{
      alertinstance(res)
      if(res.data.error==false){
        setTimeout(() => {
            navigate('/reels')
        }, 1500);
      }
    }).catch(err=>{
        console.log(err)
    })
  }

  const setdateobj=(e,type)=>{
    var value = e.target.value;
    const date = new Date(value)
    const time = date.getTime()
    if(type === 'release'){  
      setobj({...obj,dateAdded:time})    
    }else{
      setobj({...obj,expireDate:time})
    }
  }

  const loadlistgenre = async ()=> {
    const res = await MultipartAPI.get('/listContents');
    return res.data.data;
}
  const handlecontent = (e) =>{
    setobj({...obj,contentId:e._id,title:e.title})
  }
  //5f26edd47db67f7de23684ce
  return (
    <div className="content">
    <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
        <span className='leftpush' onClick={()=>{navigate("/reels")}}> Back</span>
    </div>
    <form onSubmit={AddReel}>
        <label><i className="fa fa-heading"></i> Thumbnail Reel Poster (1080 X 1920)</label>
        <input className="form-control" type="file" onChange={(e)=>setobj({ ...obj, reelThumbnail: e.target.files[0] })}/>
        <label><i className="fa fa-heading"></i> Reel Video Url</label>
        <input className="form-control" placeholder="Enter Url for the Reel"type="text" onChange={(e)=>setobj({ ...obj,reelUrl:e.target.value})}/>
        <label><i className="fa fa-heading"></i> Date</label>
        <input className="form-control" placeholder="Enter Url for the Reel"type="date" onChange={(e)=>setdateobj(e,'release')}/>
        <label><i className="fa fa-venus"></i> Select Content</label><br/>
        <AsyncSelect 
                        cacheOptions
                        defaultOptions
                        getOptionLabel={e=>e.title}
                        getOptionValue={e => e._id}
                        loadOptions={loadlistgenre}
                        onChange={handlecontent}
                        placeholder='Select Content'
        />
        <input type="checkbox"  checked={obj.published} onChange={e => setobj({...obj,published:e.target.checked})}/>
        <label> Published</label>

        <input type="checkbox"  checked={obj.active} onChange={e => setobj({...obj,active:e.target.checked})}/>
        <label> Active</label>

        <input type="checkbox"  checked={obj.autoExpiry} onChange={e => setobj({...obj,autoExpiry:e.target.checked})}/>
        <label> Auto Expiry</label><br/>
        { obj.autoExpiry ? '':
          <>
          <label><i className="fa fa-heading"></i> Expire Date</label>
          <input className="form-control" type="date" onChange={(e)=>setdateobj(e,'expire')}/>
          </>  
      }
        <button type="submit"className='btn btn-primary mt-2'> Add Reel</button>
    </form>
    </div>
  )
}

export default AddReel