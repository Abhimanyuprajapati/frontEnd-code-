import React, { useEffect } from 'react'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import MultipartAPI from '../../Objects/MultipartAPI';
import AsyncSelect from 'react-select/async';
import { useParams } from 'react-router-dom';
import sampler from '../../Objects/axiosjson';
import alertinstance from '../../Objects/Alert';
const UpdateReel = ({icon}) => {
  let navigate = useNavigate();
  const [content,setcontent]=useState([])
  const [obj,setobj]=useState({title:'',reelThumbnail:'',reelUrl:'',reelId:'',contentId:'',published:false,active:false,autoExpiry:true,expireDate:null})
  let {reelId} = useParams();
  useEffect(()=>{
    sampler.get('/listReels')
    .then(res=>{
      attachContent()
      fetchReel(res.data.data)
    })
  },[])

  const attachContent=()=>{
    sampler.get('/listContents')
    .then(res=>{
        setcontent(res.data.data)
    })
  }
 
  const attachContentId=(contenttId)=>{
    sampler.get('/listContents')
    .then(res=>{
        var rty = res.data.data;
        if(rty.length > 0){
          for (var i= 0;i<rty.length;i++) {
              if (rty[i]._id === contenttId ){
                  const contentTitle=rty[i].title
                  setcontent({contentId:contenttId,title:contentTitle})
              }
          }
        }
    })
  }
  const fetchReel=async (data)=>{
    //array = data
    for (var i= 0;i<data.length;i++) {
        if (data[i]._id === reelId){
          var contenttId = data[i].contentId;
            const date = await convert_epoch_to_normal(data[i].expireDate)
            setobj({...obj,reelUrl:data[i].reelUrl,
                published:data[i].published,
                active:data[i].active,
                autoExpiry:data[i].autoExpiry,
                expireDate:date ? date :0,
                contentId:data[i].contentId,
                reelId:reelId
              })
              attachContentId(contenttId)
        }
    }
  }

  const UpdateReel=(e)=>{
    e.preventDefault();
    var date1 = new Date(obj.expireDate).getTime();
    var newobj = {
      reelThumbnail:obj.reelThumbnail,
      reelUrl:obj.reelUrl,
      reelId:reelId,
      contentId:obj.contentId,
      published:obj.published,
      active:obj.active,
      autoExpiry: obj.autoExpiry, 
      expireDate: obj.autoExpiry ? 0 :date1,
      title:obj.title
    }
    const formData = new FormData()
    formData.append("formText", JSON.stringify(newobj));
    formData.append('reelThumbnail',obj.reelThumbnail)
    
    //calling API for adding content
    MultipartAPI.post('/updateReel',formData)
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
   // setobj({...obj,expireDate:0})
  }

  const setdateobj=(e)=>{
    var value = e.target.value;
    setobj({...obj,expireDate:value})
  }

  function convert_epoch_to_normal(time){
    var Time = new Date(time)
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Time)
    let up= date.split('/')
    let reldate= up[2] + '-' + up[0] + '-' +up[1]
    return reldate
    //setobj({...obj,expireDate:reldate})
  }

  const loadlistgenre = async ()=> {
    const res = await MultipartAPI.get('/listContents');
    return res.data.data;
  }
  const handlecontent = (e) =>{
    setcontent(e)
    setobj({...obj,contentId:e._id})
  }
  //5f26edd47db67f7de23684ce
  return (
    <div className="content">
    <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
        <span className='leftpush' onClick={()=>{navigate("/reels")}}> Back</span>
    </div>
    <form onSubmit={UpdateReel}>
        <label><i className="fa fa-heading"></i> Thumbnail Reel Poster</label>
        <input className="form-control" type="file" onChange={(e)=>setobj({ ...obj, reelThumbnail: e.target.files[0] })}/>
        <label><i className="fa fa-heading"></i> Reel Video Url</label>
        <input className="form-control" value={obj.reelUrl} placeholder="Enter Url for the Reel"type="text" onChange={(e)=>setobj({ ...obj,reelUrl:e.target.value})}/>
        
        <label><i className="fa fa-venus"></i> Select Content</label><br/>
        <AsyncSelect 
                        cacheOptions
                        defaultOptions
                        getOptionLabel={e=>e.title}
                        getOptionValue={e => e._id}
                        value={content}
                        defaultValue={content}
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

        {obj.autoExpiry ? '':
        <>
        <label><i className="fa fa-heading"></i> Expire Date</label>
        <input className="form-control" type="date" value={obj.expireDate} onChange={(e)=>setdateobj(e)}/>
        </>
        }
        <button type="submit"className='btn btn-primary mt-2'> Update Reel</button>
    </form>
    </div>
  )
}

export default UpdateReel