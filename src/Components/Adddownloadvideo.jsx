import React,{useState,useEffect} from 'react'
import '../css/Promotion.css';
import '../css/episodes.css';
import { useNavigate , useParams} from 'react-router-dom';
import alertinstance from '../Objects/Alert';
import MultipartAPI from '../Objects/MultipartAPI'
import Select from 'react-select';
import sampler from'../Objects/axiosjson';
import Spin from './Spinner/Spin';
const Adddownloadvideo = ({icon}) => {
    let {id} = useParams();
    let {download_id} = useParams();
    let {seasonId} = useParams();
    let {episodeName} = useParams();
    const [loading,setloading]=useState(false)
    const [jobId,setjobId]=useState('')
    const [videoPlaybackId,setvideoPlaybackId]=useState('')
    const [os,setos]=useState({label:''})
    const [videoDecoder,setvideoDecoder]=useState({label:''})
    const [streamingType,setstreamingType]=useState({label:''})
    const [keyType,setkeyType]=useState({label:''})
    const [drm,setdrm]=useState({label:''})
    const [videoExists,setvideoExists]=useState(true)
    const [quality,setquality]=useState({label:''});
    const [path,setpath]=useState('')

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
            },
            {
                label:'MP4'
            }
        ]
     
        const data_drm = [
            {label:'Widivine'},
            {label:'Apple FairPlay'},
            {label:'PlayReady'},
            {
              label:'AES-128'
            }
        ]
        const data_quality = [
        {label:'SD'},
        {label:'HD'},
        {label:'FHD'}
        ]
         const data_key = [
        {label:'Static'},
        {label:'SPEKE'},
        {label:'NONE'}
        ]
        const handleos = (e) =>{
            setos({label:e.label});
        }
        const handledecoder = (e) =>{
            setvideoDecoder({label:e.label});
        }
        const handlestream=(e)=>{
            setstreamingType({label:e.label})
        }
        const handledrm=(e)=>{
            setdrm({label:e.label})
        }
        const handlekey=(e)=>{
          setkeyType({label:e.label})
        }
        const handlequality=(e)=>{
          setquality({label:e.label})
        }
    //
   
const params = {
      videoDownloadId: id
}
useEffect(()=>{
    sampler.post('/listDownloadVideos',params)
      .then(res=>{
          if(res.data.error === false){
            bind(res.data.data)
        }else{
            bind([])
        }
          
      })
  },[])
    


const bind=(d)=>{
    for (var i = 0; i <d.length; i++) {
      if (d[i]._id === download_id) {
         setos({label:d[i].os})
         setvideoDecoder({label:d[i].videoDecoder})
         setstreamingType({label:d[i].streamingType})
         setdrm({label:d[i].drmProvider})
         setkeyType({label:d[i].keyType})
         setquality({label:d[i].quality})
         setpath(d[i].path)
     }
 }
}


    const add=(e)=>{
      e.preventDefault();
      setloading(!loading)
       var data = {
        "downloadId":download_id,
        "video": {
          "videoDownloadId":id,
          "os":os.label,
          "videoDecoder":videoDecoder.label,
          "streamingType":streamingType.label,
          "keyType":keyType.label,
          "path":path,
          "drmProvider":drm.label,
          "quality":quality.label,
      }
    }
      
    sampler.post('/updateDownloadVideos',data)
      .then(res =>{
        setloading(false)
        alertinstance(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  return (
    <>{!loading ? '':<Spin/>}
    <div className='content'>
    <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
      <span className='leftpush'> you are updating { path } </span>
    </div>

    <form onSubmit={add}>
       <label>OS</label>
       <Select className="form-control p-0" options={data_os} value={os} defaultValue={os} placeholder="select os" onChange={handleos}></Select>
       <label>Data Decoder</label>
       <Select className="form-control p-0" options={data_decoder} value={videoDecoder} defaultValue={videoDecoder}placeholder="select data decoder" onChange={handledecoder}></Select>
       <label>Streaming Type </label>
       <Select className="form-control p-0" options={data_stream} value={streamingType} defaultValue={streamingType}placeholder="select streaming type" onChange={handlestream}></Select>
       <label>Drm Type </label>
       <Select className="form-control p-0" options={data_drm} value={drm} defaultValue={drm}placeholder="select drm type" onChange={handledrm}></Select>
       <label>Key Type</label>
       <Select className="form-control p-0" options={data_key} value={keyType} defaultValue={keyType}placeholder="select state" onChange={handlekey}></Select>
       <label>Quality</label>
       <Select className="form-control p-0" options={data_quality} value={quality} defaultValue={quality}placeholder="select state" onChange={handlequality}></Select>
         <label><i className="fa fa-plus"/>Path</label>
            <input
                value={path}
                className="form-control"
                placeholder="enter the path"
                type="text"
                onChange={(e)=> setpath(e.target.value)}
            />
       
       <button type="submit" className="btn btn-primary p-2 mt-2">submit</button>
    </form>
    </div>
    </>
  )
}

export default Adddownloadvideo