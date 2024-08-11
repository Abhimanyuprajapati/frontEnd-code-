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
import '../css/Promotion.css';
import '../css/episodes.css';
import { useNavigate , useParams,Link} from 'react-router-dom';
import alertinstance from '../Objects/Alert';
import Select from 'react-select';
import sampler from'../Objects/axiosjson';
import Spin from './Spinner/Spin';
const Updatevideo = ({icon}) => {
    let {contentId} = useParams()
    let {seasonId} = useParams()
    let {episodeId} = useParams()
    let {episodeName} = useParams()
    let {contentName} = useParams()
    let {seasonName} = useParams()
    let {videoplaybackId} = useParams()
    let {awsStaticResourcePath} = useParams()
    let {videoId} = useParams()
    let navigate = useNavigate();
    const [client,setclient]=useState('')
    const [os,setos]=useState({label:''})
    const [osVersion,setosVersion]=useState({label:''})
    const [ccVersion,setccVersion]=useState('')
    const [videoDecoder,setvideoDecoder]=useState({label:''})
    const [adaptive,setadaptive]=useState(true)
    const [streamingType,setstreamingType]=useState({label:''})
    // const [drm,setdrm]=useState({label:''})
    const [path,setpath]=useState('')
    const [videoExists,setvideoExists]=useState(true)
    const [offline,setoffline]=useState(false)
    const[hex,sethex]=useState([])
    const [loading,setloading]=useState(false)
    const [Key,setKey]=useState('')
    const [key,setkey]=useState(false)
    const [keyerror,setkeyerror]=useState('')
    //use effect for generating random 8 digit value 
    useEffect(()=>{
        const params = {
            videoPlaybackId: !episodeId ? contentId : episodeId
          }
        sampler.post('/listVideos',params)
        .then(res=>{
        bind_data(res.data.data);
        
        })
    },[])

    const bind_data=(d)=>{
        for (var i = 0; i <d.length; i++) {
            if (d[i]._id === videoId) {
               setos({label:d[i].os})
               setvideoDecoder({label:d[i].videoDecoder})
               setstreamingType({label:d[i].streamingType})
            //    setdrm({label:d[i].drm})
            //    if(d[i].drm === 'AES128'){
            //     setkey(true)
            //     setKey(d[i].drmProvider.key)
            //    }
               setclient({label:d[i].client})
               setpath(d[i].path)
               setosVersion({label: d[i].osMinimumVersion.map(x=> x.osVersion)})
               checkosversion(d[i].os)
               sethex(d[i].jobId)
           }
       }
      }
    
      const checkosversion=(os)=>{
            if(os === 'Android'){
                sethide(true)
                sethidec(false)
            }
            else if(os === 'CHROMECAST'){
                sethide(false)
                sethidec(true)
            }else{
                sethide(false)
                sethidec(false)
            }
      }  
    
    var regex = /[0-9A-Fa-f]{6}/g;
    const add=(e)=>{
        e.preventDefault()
        setloading(!loading)
        // if(Key.length === 32){
        //     setkeyerror('')
            const data = {
                video:{
                videoId: videoId,
                jobId:hex,
                videoPlaybackId: videoplaybackId,
                os:os.label,
                client:client.label,
                osMinimumVersion:[
                   {
                    os: os.label,
                    osVersion: osVersion.label
                    }
                ],
                videoDecoder:videoDecoder.label,
                adaptive:adaptive,
                keyType:'',
                streamingType:streamingType.label,
                path:path,
                videoExists:videoExists,
                offline:offline,
                }
                
            }
            sampler.post('/updateVideos',data)
            .then(res=>{
                alertinstance(res)
                setloading(false)
                if(res.data.error === false){
                    setTimeout(()=>{
                        !episodeId ?  navigate('/videos/'+ contentId +'/'+ contentName):   navigate('/videos/'+contentName +'/'+contentId +'/'+seasonName+'/'+seasonId + '/' + episodeId + '/' + episodeName+'/'+awsStaticResourcePath)
                    }, 1500)
                }
            }).catch(err=>{
                setloading(false)
                console.log(err)
            })
        // }else{
        //     setkeyerror('Please enter a valid key')
        //     setloading(false)
        // }
        
    }

        const data_os =[
        {
            label:'Android'
        },
        {
            label:'AndroidTV'
        },
        {
            label:'iOS-MAC'
        },
        {
            label:'APPLETV28'
        },
        {
            label:'CHROMECAST'
        },
        {
            label:'FIRETV28'
        }
        ]
        const data_client=[
            {
                label:'NATIVE'
            },
            {
                label:'WEB'
            },
            {
                label:'EDGE'
            }
        ]
        const data_decoder=[
            {
                label:'H264'
            },
            {
                label:'H265'
            },
            {
                label:'VP8'
            },
            {
                label:'VP9'
            },
            {
                label:'AV1'
            },
            {
                label:'MPEG4'
            },{
                label:'H264-HIGH'
            }
        ]
        const data_stream=[
            {
                label:'HLS'
            },
            {
                label:'DASH'
            },
            {
                label:'SmoothStreaming'
            }
        ]
        const data_adaptive=[
            {label:'true'},
            {label:'false'}
        ]
        const data_drm = [
            {label:'Widivine'},
            {label:'Apple FairPlay'},
            {label:'PlayReady'},
            {label:'AES128'}
        ]
        const data_os_version=[
            {label:'21.0'},
            {label:'23.0'}
        ]
        const data_chromecast_version=[
            {label:'Generation1'},
            {label:'Generation2'},
            {label:'Ultra'},
            {label:'ChrocastwithTV'}
        ]
        const handleos = (e) =>{
            setos({label:e.label});
            if(e.label === 'Android'){
                sethide(true)
                sethidec(false)
            }
            else if(e.label === 'CHROMECAST'){
                sethide(false)
                sethidec(true)
            }
            else{
                sethide(false)
                sethidec(false)
            }
        }
        const handleclient = (e) =>{
            setclient({label:e.label});
        }
        const handledecoder = (e) =>{
            setvideoDecoder({label:e.label});
        }
        const handlestream=(e)=>{
            setstreamingType({label:e.label})
        }
        const [hide,sethide]=useState(false)
        const [hidec,sethidec]=useState(false)
        const handleosv=(e)=>{
            setosVersion({label:e.label})
        }
        
  return (
    <>{!loading ? '':<Spin/>}
    <div className="content">
    <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
       <span className='leftpush'> you are updating video in {!episodeName ? contentName : episodeName }</span>
   </div>

   <p className='path p-3 mt-2'>  { !episodeName ? contentName +' / ' + videoId + ' -- update ' :  contentName +' / '+seasonName+' / '+episodeName +' / ' + videoId + ' -- update '}</p>
   <form onSubmit={add}>
       <label>OS</label>
       <Select className="form-control p-0" options={data_os} value={os} placeholder="Select OS*" onChange={handleos}></Select>
       <div className={hide ? 'display' : 'hidden'}>
               <label><i className="fa fa-portrait"/> Select Os Version</label>
               <Select className="form-control p-0" options={data_os_version} value={osVersion} placeholder="Select os version*" onChange={handleosv}></Select>
        </div>
        <div className={hidec ? 'display' : 'hidden'}>
               <label><i className="fa fa-portrait"/> Select Chromecast Version</label>
               <Select className="form-control p-0" options={data_chromecast_version} placeholder="Select chromecast*" onChange={handleosv}></Select>
        </div>
       <label>Client</label>
       <Select className="form-control p-0" value={client} options={data_client} placeholder="Select client*" onChange={handleclient}></Select>
       <label>Data Decoder</label>
       <Select className="form-control p-0" value={videoDecoder} options={data_decoder} placeholder="Select data decoder*" onChange={handledecoder}></Select>
       <label>Streaming Type </label>
       <Select className="form-control p-0" value={streamingType}  options={data_stream} placeholder="Select streaming type*" onChange={handlestream}></Select>
      
       <label>Job Id</label>
            <input
                value={hex}
                className="form-control"
                placeholder="Enter the job id*"
                type="text"
                onChange={(e)=> sethex(e.target.value)}
            />
        <label>Path</label>
            <input
                value={path}
                className="form-control"
                placeholder="Enter Path*"
                type="text"
                onChange={(e)=> setpath(e.target.value)}
            />
       <button type="submit" className="btn btn-primary p-2 mt-2" onClick={add}>submit</button>
       {!episodeId  ?
       <Link to={"/videos/"+contentId+'/'+contentName}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link> :
       <Link to={"/videos/"+contentName+'/'+contentId+'/'+seasonName+'/'+seasonId+'/'+episodeId+'/'+episodeName+'/'+awsStaticResourcePath}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>}
       </form>
    </div>
    </>
  )
}

export default Updatevideo



 {/* <label>Drm Type </label>
       <Select className="form-control p-0" value={drm} options={data_drm} placeholder="Select drm type*" onChange={handledrm}></Select>
       {!key ? 
       '':
       <>
       <label><i className="fa fa-plus"/>Key</label>
            <input
                value={Key}
                className="form-control"
                placeholder="Enter Key*"
                type="text"
                onChange={(e)=> setKey(e.target.value)}
            />
            {keyerror}<br/></>
       } */}