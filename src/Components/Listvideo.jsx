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
import React, { useState,useEffect} from 'react';
import sampler from '../Objects/axiosjson';
import { useNavigate,useParams,Link } from 'react-router-dom';
import alertinstance from '../Objects/Alert';

const Listvideo = ({icon}) => {
  let navigate = useNavigate();
  let {contentId} = useParams()
  let {contentName} = useParams()
  let {seasonName} = useParams()
  let {episodeId} = useParams()
  let {seasonId} = useParams()
  let {episodeName} = useParams()
  let {awsStaticResourcePath} = useParams()
  const [container,setcontainer]=useState([])
  const [name,setname]=useState('')
  
  useEffect(() => {   
    
    const params = {
      videoPlaybackId: !episodeId ? contentId : episodeId
    }
    sampler.post('/listVideos',params)
    .then(res=>{
      setcontainer(res.data.data)
    }).catch(err=>{
      console.log(err)
    })
  }, [])
  const [hover,sethover]=useState(false)
  const toggleDropdown =(x,y)=> {
      sethover(!hover);
      setvideoPlaybackId(x)
      setId(y)
     }

    
  const[Id,setId]=useState('')
  const[videoPlaybackId,setvideoPlaybackId]=useState('')
  const Delete =()=>{
    const data = {
      videoId:Id
    }
    sampler.delete('/deleteVideos&&videoId='+`${Id}`)
    .then(res=>{
      alertinstance(res)
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    })
  } 
  return (
    <div className="content">
    <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
       <span className='leftpush'> All Videos </span>
       
   </div>
   
{ !episodeName ? 
   <>
   <button className='btn btn-danger'  onClick={()=>{navigate('/videos/add/'+`${contentId}`+'/'+`${contentName}`)}}>
  <i className="fa fa-plus"></i> Add Videos</button>
  <Link to={"/content"}> <button className='btn btn-danger' style={{'marginLeft': '10px'}}>Back </button></Link>
   </>
  :
  <>
  <button className='btn btn-danger'  onClick={()=>{navigate('/videos/add/'+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+`${episodeId}`+'/'+`${episodeName}`+'/'+`${awsStaticResourcePath}`)}}>
  <i className="fa fa-plus"></i> Add Videos</button>
  <Link to={"/episodes/"+contentName+'/'+contentId+'/'+seasonName+'/'+seasonId+'/'+awsStaticResourcePath}> <button className='btn btn-danger' style={{'marginLeft': '10px'}}>Back </button></Link>
  </>
}
<p className='path p-3 mt-2'>{ !episodeName ? contentName + ' / ' : contentName +' / '+ seasonName +' / '+ episodeName + ' / ' }</p>

   <div className={hover ? 'list shadow':'listnone shadow'}>
            <li onClick={()=> Delete()}><i className='fa fa-trash'></i> Delete Video</li><br/>
            {!episodeName ? 
            <li onClick={ ()=>{ navigate('/videos/update/'+`${contentId}`+'/'+`${contentName}`+'/'+`${videoPlaybackId}`+'/'+`${Id}`) }}><i className='fa fa-edit'></i> Update Video</li>:
            <li onClick={ ()=>{ navigate('/videos/update/'+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+`${episodeId}`+'/'+`${episodeName}`+'/'+`${videoPlaybackId}`+'/'+`${Id}`+'/'+`${awsStaticResourcePath}`) }}><i className='fa fa-edit'></i> Update Video</li>
}
    </div>
   <table className="table mt-2">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Path</th>
                <th scope="col">Streaming Type</th>
                <th scope="col">Video Decoder</th>
                <th scope="col">Client</th>
                <th scope="col">OS</th>
                <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
            {container.map( (x,index) =>{
            return(
                <>
                <tr key={index+1}>
                <th scope="row">{index + 1}</th>
                <td>{x.path}</td>
                <td>{x.streamingType}</td>
                <td>{x.videoDecoder}</td>
                <td>{x.client}</td>
                <td>{x.os}</td>
                <td><i className="fa fa-ellipsis-h" onClick={() => toggleDropdown(x.videoPlaybackId,x._id)}></i></td>
                </tr>
                </>
            )
            })}
               
            </tbody>
        </table>
   </div>
  )
}

export default Listvideo