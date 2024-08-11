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

import React,{useState,useEffect}  from 'react';
import '../css/episodes.css'
import sampler from '../Objects/axiosjson';
import {
    useNavigate,
    useParams,Link
  } from "react-router-dom";
  import '../css/upcomming.css';
import alertinstance from '../Objects/Alert';
import Refresh from '../Objects/Refresh';
const static_url = process.env.REACT_APP_CDN_STATIC;
const Listepisodechild = ({icon}) => {
    let navigate = useNavigate();
    let {contentId} = useParams();
    let {contentName} = useParams();
    let {seasonName} = useParams();
    let {seasonId} = useParams();
    let {awsStaticResourcePath} = useParams();
    const [episodeId,setepisodeId] = useState('');
    const [episodeName,setepisodeName]=useState('')
    const [list, setlist] = useState([]);
    const data ={
        contentId : contentId,
        seasonId : seasonId
    }
    useEffect(()=>{
        sampler.post('/listEpisodes',data)
        .then(res=>{
            setlist(res.data.data)
          }).catch(err=>{
            console.log(err)
          })
       },[])
    //for deleting the episode
    const deleteepisode=(episodeId)=>{
        sampler.delete('/deleteEpisode?'+'contentId='+`${contentId}`+'&&'+'seasonId='+`${seasonId}`+'&&'+'episodeId='+`${episodeId}`)
        .then(res=>{
            alertinstance(res)
            if(res.data.error === false){
                Refresh()
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const [hover,sethover]=useState(false)
    const toggleDropdown =(x,y)=> {
        sethover(!hover);
        setepisodeId(x)
        setepisodeName(y)
       }

    return (
        <div className='pro content'>
        <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'>All Episodes</span>
        </div>
        
        <button className='btn btn-danger'  onClick={()=>{navigate("/episodes/addepisode/"+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+awsStaticResourcePath)}}><i className="fa fa-plus"></i> Add Episode</button>
        <Link to={`/seasons/${contentName}/${contentId}/${awsStaticResourcePath}`}> <button className='btn btn-danger' style={{'marginLeft': '5px'}}>Back </button></Link>
        
        <p className='path p-3 mt-3'>{contentName} / {seasonName} /</p>
        <div className={hover ? 'list shadow':'listnone shadow'}>
            <li onClick={()=>{navigate('/videos/'+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+`${episodeId}`+'/'+`${episodeName}`+'/'+`${awsStaticResourcePath}`)}} ><i className='fa fa-eye'></i> View Videos</li><br/>
            <li onClick={()=>{navigate('/videos/add/'+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+`${episodeId}`+'/'+`${episodeName}`+'/'+`${awsStaticResourcePath}`)}} ><i className='fa fa-plus'></i>  Add Video</li>
            <li onClick={()=>{navigate("/episodes/updateepisode/"+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+`${episodeId}`+'/'+`${episodeName}`+'/'+`${awsStaticResourcePath}`)}}><i className='fa fa-edit'></i> Update Episode</li>
            <li onClick={()=>deleteepisode(episodeId)}><i className='fa fa-trash'></i> Delete Episode</li>
            <li onClick={()=>{navigate('/download/videos/'+`${contentId}`+'/'+`${seasonId}`+'/'+`${episodeId}`+'/'+`${episodeName}`)}}><i className='fa fa-eye'></i> View Download Videos</li>
        </div>
        <table className="table mt-3">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Thumbnail</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
            {list.map( (x,index) =>{
            return(
                <>
                <tr key={index+1}>
                <th scope="row">{index + 1}</th>
                <td><img  style={{'width':'320px' , 'height':'200px'}} src={ static_url +'/'+awsStaticResourcePath+'/'+ x.landscapePosterId}/></td>
                <td>{x.name}</td>
                <td>{x.description}</td>
                <td>{x.duration}</td>
                <td><i className="fa fa-ellipsis-h" onClick={() => toggleDropdown(x._id,x.name)}></i></td>
                </tr>
                </>
            )
            })}
               
            </tbody>
        </table>


        </div>
    )
}

export default Listepisodechild
