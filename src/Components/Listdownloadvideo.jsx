import React ,{useEffect,useState} from 'react';
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import { useNavigate,useParams } from 'react-router-dom';

const Listdownloadvideo  = ({icon}) => {
    
    let navigate = useNavigate();
    let {contentId} = useParams();
    let {contentName} = useParams();
    let {episodeId} = useParams();
    let {episodeName} = useParams();
    const [data , setdata] = useState([])
    const [videoId,setvideoID]=useState( !episodeId ? contentId : episodeId )
    
    useEffect(() => {
    const params = {
        videoDownloadId:videoId
    }
    
      sampler.post('/listDownloadVideos',params)
      .then(res=>{
          if(res.data.error === false){
            setdata(res.data.data)
          }
          else{
            setdata([])
          }
      })
    }, [])
    const Deletedownloadvideo=(_id)=>{
      const params = {
        downloadId: _id
      }
      sampler.post('/deleteDownlodVideos',params)
      .then(res=>{
        alertinstance(res)
        setTimeout(() => {
        window.location.reload();
      }, 1000);

      })

    }
  return (
    
    <div className='content'>
      <div className="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
        <span className='leftpush'> All downloaded videos {!contentName ? episodeName : contentName}</span>
      </div>

    <table className="table">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Path</th>
        <th scope="col">Quality</th>
        <th scope="col">Video Decoder</th>
        <th scope="col">Job Id</th>
        <th scope="col">Delete</th>
        <th scope="col">Update</th>
      </tr>
    </thead>
    <tbody>
    {data.map((x,index) =>{
      return(
         <tr key={index+1}>
            <th scope="row">{index+1}</th>
            <td>{x.path}</td>
            <td>{x.quality}</td>
            <td>{x.videoDecoder}</td>
            <td>{x.jobId}</td>
            <td><i className="fa fa-trash" onClick={()=>Deletedownloadvideo(x._id)}></i></td>
            <td><i className='fa fa-edit' onClick={()=>{navigate("/download/video/update/"+`${videoId}`+'/'+`${x._id}`+'/'+`${x.path}`)}} ></i></td>
          </tr>
        )
    })}
     
    
    </tbody>
  </table>
  </div>
  )
}

export default Listdownloadvideo 