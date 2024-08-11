import React,{useState,useEffect} from 'react'
import '../../css/content.css';
import sampler from '../../Objects/axiosjson';
import {useNavigate} from "react-router-dom";
import '../../css/upcomming.css';
import '../../css/content.css';
import alertinstance from '../../Objects/Alert';
import Refresh from '../../Objects/Refresh';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const static_url = process.env.REACT_APP_CDN_STATIC;
const ListReels = ({icon}) => {
  let navigate = useNavigate();
  const [query,setQuery]=useSearchParams();
  const [len,setlen]=useState(0)
  const [page,setpage]=useState(1);
  const [container, setcontainer] = useState([])
 const [handler,sethandler]=useState([])
 const [startindex,setstartindex]=useState(0)
 const [endindex,setendindex]=useState(10)
  useEffect(()=>{
    let para = query.get("tab");
    sampler.get('/listReels')
    .then(res=>{
      if(res.data.data){
        let rev = res.data.data
       if(para !== 1){
        transform(rev)
        handlePaginationHelp(rev,para)
      }else{
        transform(rev)
      }
      }
      }).catch(err=>{
        console.log(err)
      })
   },[query])

   const transform =(data)=>{
    var rem;
    var n = data.length
    rem = n % 10;
    if(rem > 0){
      n = n + (10-rem)
    }else{
      n=n-rem
    }
    setlen(n/10)
    setcontainer(data.slice(startindex,endindex))
    sethandler(data)
  }

  const handleChange=(e,value)=>{
    setpage(value)
    if(value === 1){
      const dd  = handler.slice(0,10)
      setcontainer(dd)
    }else{
      const dd1  = handler.slice(value*10 - 10 , value*10)
      setcontainer(dd1)
    }
    handlePaginationHelp(handler,value)
  }
  const handlePaginationHelp=(data,value)=>{
    setpage(value)
    if(value === 1){
      const dd  = data.slice(0,10)
      setcontainer(dd)
    }else{
      const dd1  = data.slice(value*10 - 10 , value*10)
      setcontainer(dd1)
    }
    navigate(`/reels?tab=${value}&return=true`)   
  }

   const [hover,sethover]=useState(false);
   const [reelId,setReelId]=useState('')
   const checkcontent=(id)=>{
    setReelId(id)
    sethover(!hover)
   }
   const transformdate=(e)=>{
    const date = new Date(e).toDateString();
    return `${date}`
   }
   const deleteReel=async ()=>{
    const params ={
      reelId:reelId
    }
      sampler.post('/deleteReel',params)
      .then(res=>{
        alertinstance(res)
        if(res.data.error === false){
          Refresh()
        }
      }).catch(err=>{
        console.log(err)
      })
    
   }
  return (
    <div className="content reel">
        <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Reels</span>
        </div>
            <button className='btn btn-danger'  onClick={()=>{navigate("/reels/add")}}><i className="fa fa-plus"></i> Add Reel</button>

            {/*for listing content  */}
            <div className={hover ? 'list shadow':'listnone shadow'}>
                <li onClick={()=>{navigate(`/reels/update/${reelId}`)}}>
                  <i className='fa fa-edit'/> Edit Reel
                </li>
                <li onClick={()=>deleteReel()}>
                <i className='fa fa-trash'/> Delete Reel
                </li>
            </div>

            <table className="table table-striped mt-2">
                <thead>
                    <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Title</th>
                    <th scope="col">NumViews</th>
                    <th scope="col">NumLikes</th>
                    <th scope="col">Published</th>
                    </tr>
                </thead>
                <tbody>
            {container.map((q,index)=>{
                            return(
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={ static_url+'/'+q.reelThumbnailId} height={400} width={300}/></td>
                                                <td>{q.title ? q.title:''}</td>
                                                <td>{q.numViews === null ? 0:q.numViews}</td>
                                                <td>{q.numLikes === null ? 0:q.numLikes}</td>
                                                <td>{q.published ? 'Published':'Unpublished'}</td>
                                                <td>
                                                <i className="fa fa-ellipsis-h ms-4" 
                                                onClick={() => checkcontent(q._id)}></i>
                                               </td> 
                                            </tr>
                                  )
                                        
                            })}
                </tbody>
            </table>
            <div className="numbers">
          <Stack spacing={2}>
            <Pagination count={len} page={page} onChange={handleChange}  variant="outlined" shape="rounded" />
          </Stack>
        
      </div>
        </div>
  )
}

export default ListReels