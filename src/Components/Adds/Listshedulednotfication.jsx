import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import sampler from '../../Objects/axiosjson';
import Spin from '../Spinner/Spin';
import { mdiMovieEdit } from '@mdi/js';
import Icon from "@mdi/react";
const Listshedulednotification = () => {
  const [container,setcontainer]=useState([])
  const [loading,setloading]=useState(true)
  const [hover,sethover]=useState(false);
  const navigate = useNavigate()
  useEffect(()=>{
    listnotification()
    return ()=>{
      setloading(true)
    }
  },[])
  const listnotification=()=>{
    sampler.get('/listSchduledNotifications')
    .then(res=>{
      setloading(false)
      if(Array.isArray(res.data.data)){
        setcontainer(res.data.data)
      }else{
        setcontainer([])
      }
    }).catch(err=>{
      console.log(err)
    })

  }
    function convert_epoch_to_normal(time){
      var Time = new Date(time)
      let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Time)
      let up= date.split('/')
      let reldate= up[2] + '-' + up[0] + '-' +up[1]
      return (
        <p>{reldate}</p>
      )
     }
     const [no,setno]=useState('')
     const [contentId,setcontentId]=useState('')
     const fun=(notifyid,contentid)=>{
      sethover(!hover)
      setno(notifyid)
      setcontentId(contentid)
  }
  return (
    <>
    {!loading ? '':<Spin/>}
    <div className={hover ? 'list shadow':'listnone shadow' }>
        <li onClick={()=>navigate(`/scheduled/notification/update/${no}/${contentId}`)}><Icon path={mdiMovieEdit} className="mdicon" />  <span>Update Scheduled Notification</span></li>
    </div>
    <table className="table mt-2 table-striped">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Notification Type</th>
                <th scope="col">Titles</th>
                <th scope="col">Message Body</th>
                <th scope="col">Status</th>
                <th scope="col">Time</th>
                <th scope="col">End Date</th>
                </tr>
            </thead>
            <tbody>
           
                {container.map((r,index)=>{
                            return(
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{r.notificationType}</td>      
                                <td>{r.titles.map((x,index)=>{
                                  return <p key={index}>{x}</p>
                                })}</td>
                                <td>{r.messageBody}</td>
                                <td>{r.status ? 'Active' :'Deactive'}</td>
                                <td>{r.timetoSend}</td>
                                <td>{convert_epoch_to_normal(r.endDate)}</td>
                                <td><i className='fa fa-ellipsis-h'  onClick={()=> fun(r._id,r.contentId)}></i></td>
                                </tr>
                            )})
 }
            </tbody>
    </table>
    </>
  )
}

export default Listshedulednotification