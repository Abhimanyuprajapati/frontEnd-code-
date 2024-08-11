import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import sampler from '../../Objects/axiosjson';
import Apikey from '../../Objects/Apikey';
import Spin from '../Spinner/Spin';
import { Link } from 'react-router-dom';
import alertinstance from '../../Objects/Alert';
const static_url = process.env.REACT_APP_CDN_STATIC;
const Updatesheduled = ({icon}) => {
const [loading,setloading]=useState(false)
const {notifyId,contentId}=useParams();
const [searches, setSearches] = useState([])
const [query, setQuery] = useState("")
const [searches1, setSearches1] = useState([])
const [query1, setQuery1] = useState("")
const [eddate,setEddate]=useState(0)
const [posters,setposters]=useState([])
const [aws,setaws]=useState('')
const [Body,setBody]=useState('')
const [temp,settemp]=useState(null)
const [arr,setarr]=useState([])
const [old_poster,setold_poster]=useState([])
const [timetosend,settimetosend]=useState('00:00')
const [type,settype]=useState('')
const [stdate,setstdate]=useState(0)
const navigate = useNavigate();
useEffect(() => {
  sampler.get('/listSchduledNotifications')
  .then(res=>{
     call(res.data.data)
    })
}, [])
const call =(val)=>{
  for (var i = 0; i < val.length; i++) {
      if (val[i]._id === notifyId) {
        setSearches1(val[i].messages)
        setSearches(val[i].titles)
        convert_epoch_to_normal(val[i].endDate ,val[i].startDate)
        setposters(val[i].posterPath)
        setaws(val[i].awsStaticResourcePath)
        setBody(val[i].messageBody)
        settimetosend(val[i].timetoSend)
        settype(val[i].notificationType)
      }
   }
}
function convert_epoch_to_normal(time,startdate){
  var Time = new Date(time)
  let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Time)
  let up= date.split('/')
  let reldate= up[2] + '-' + up[0] + '-' +up[1]
  setEddate(reldate)
  if(startdate !== ''){
    var Time = new Date(startdate)
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(startdate)
    let up= date.split('/')
    let reldate= up[2] + '-' + up[0] + '-' +up[1]
    setstdate(reldate)
  }
 }
 function normal_to_epoch(time){
  const datestring = new Date(time)
  //var parts = datestring.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
  return datestring.getTime()
 }
const updateQuery = ({ target }) => {
  // Update query onKeyPress of input box
  setQuery(target.value)
}
const deleteRow = (index) => {
  //let name="Mano"
  //setEmps(emps.filter(emp => emp.name !== name))
  let copy_emp=[...searches]
  copy_emp.splice(index,1)
  setSearches(copy_emp)
}
const updateQuery1 = ({ target }) => {
  // Update query onKeyPress of input box
  setQuery1(target.value)
}
const deleteRow1= (index) => {
  //let name="Mano"
  //setEmps(emps.filter(emp => emp.name !== name))
  let copy_emp=[...searches1]
  copy_emp.splice(index,1)
  setSearches1(copy_emp)
}

const deleteposter=(index)=>{
  const data = posters[index];
  if(!data.includes('blob')){
    setold_poster(old_poster => [...old_poster , data])
  }else{
    let ss = [...arr];
    ss.splice(index,1)
    setarr(ss)
  }
  let copy_emp=[...posters]
  copy_emp.splice(index,1)
  setposters(copy_emp)
  //let old_poster1 = [...posters]
  //old_poster1.splice(index,1)
}
const [rr,setrr]=useState(null)
const handleposter=(e)=>{
  settemp(e.target.files[0])
}

const addposter=(e)=>{
  e.preventDefault()
  if(temp !== null){
    setarr(arr=> [...arr ,temp])
    setposters(posters => [...posters,URL.createObjectURL(temp) ])
  }
}

const handleClick = (e) => { 
  e.preventDefault()
  if(query !== '' ){
    setSearches(searches => [...searches, query])
    setQuery('');
  }
}
const handleClick1 = (e) => { 
  e.preventDefault()
  if(query1 !== '' ){
    setSearches1(searches => [...searches, query1])
    setQuery1('');
  }
}

const updatehandler=(e)=>{
  e.preventDefault();
  setloading(!loading)
  //normal_to_epoch(eddate)
  const data = {
      titles:searches,
      contentId:!contentId ? '':contentId,
      messages:searches1,
      messageBody:Body,    
      recurring: true,
      startTime:normal_to_epoch(stdate),
      endTime: normal_to_epoch(eddate),  
      removedPosters:old_poster,
      notificationType:type,
      timetoSend:timetosend,
      notificationId:notifyId
  }
  const formText = JSON.stringify(data);
  const formData = new FormData();
  formData.append('formText',formText)
  if(arr.length > 0){    
    arr.map((x,index)=>{
      formData.append(`file${index}`,x)
    })
  }
  Apikey.post('/sendNotification',formData)
  .then(res=>{
    alertinstance(res)
    setloading(false)
    if(res.data.error === false){
      navigate('/notification/promotional?opened=sheduled')
    }      
  }).catch(err=>{
    setloading(false)
    console.log(err)
  })
  }
  
  return (
    <>
    {!loading ? '':<Spin/>}
    <div className="content">
        <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
            <span className='leftpush'> Scheduled / Notification / Update / {notifyId} </span>
        </div>
        <form onSubmit={updatehandler}>
              <label><i className="fa fa-envelope"></i> Update Titles</label>
                <input
                    value={query}
                    className="form-control"
                    placeholder="Enter message*"
                    type="text"
                    onChange={updateQuery}
                />
                <button className="btn btn-success  mt-2" onClick={handleClick}> &#43; </button>
                <Stack direction="row" spacing={1} className="stack">
                    {searches.map((x,index) =>{
                        return(
                            <Chip key={index} label={x} onDelete={()=>deleteRow(index)}/>
                        )
                    })}
                </Stack>


                <label><i className="fa fa-envelope"></i> Update Messages</label>
                <input
                    value={query1}
                    className="form-control"
                    placeholder="Enter message*"
                    type="text"
                    onChange={updateQuery1}
                />
                <button className="btn btn-success  mt-2" onClick={handleClick1}> &#43; </button>
                <Stack direction="row" spacing={1} className="stack">
                    {searches1.map((x,index) =>{
                        return(
                            <Chip key={index} label={x} onDelete={()=>deleteRow1(index)}/>
                        )
                    })}
                </Stack>
                <label><i className="fa fa-calendar-alt"></i>Start Date</label>
                                <input
                                    value={stdate}
                                    className="form-control"
                                    placeholder="Select end date*"
                                    type="date"
                                    onChange={(e)=>setstdate(e.target.value)}
                                />      
                <br/>
                <label><i className="fa fa-calendar-alt"></i>End Date</label>
                                <input
                                    value={eddate}
                                    className="form-control"
                                    placeholder="Select end date*"
                                    type="date"
                                    onChange={(e)=>setEddate(e.target.value)}
                                />      
                <br/>
                <label><i className="fa fa-calendar-alt"></i>Timetosend</label>
                                <input
                                    value={timetosend}
                                    className="form-control"
                                    placeholder="Select end date*"
                                    type="time"
                                    onChange={(e)=>settimetosend(e.target.value)}
                                />      
                <br/>
                <label><i className="fa fa-calendar-alt"></i>Posters</label><br/>
                {posters.map((x,index)=>{
                  if(x.includes('blob')){
                    return(
                      <div className='show_n' key={index}>
                        <img style={{'width':'220px' , 'height':'160px','marginLeft':'10px','borderRadius':'12px'}} src={x}/>
                        <i onClick={()=>deleteposter(index)} className='fa fa-close'></i>
                      </div>
                    )
                  }
                    return(
                      <div className='show_n' key={index}>
                        <img style={{'width':'220px' , 'height':'160px','marginLeft':'10px','borderRadius':'12px'}} src={ static_url + '/'+aws+'/'+ x}/>
                        <i onClick={()=>deleteposter(index)} className='fa fa-close'></i>
                      </div>
                    )
                  
                })}
                <br/>
                <label>Landscape Image (1920 x 1080)</label>
                <input type="file" className='form-control' onChange={handleposter} accept="image/*"></input>
                <button className='btn btn-success mt-2' onClick={addposter}>Add</button>
                <br/>
                <label><i className="fa fa-align-justify"></i> Message Body </label>
                                <textarea
                                    name=""
                                    rows="4"
                                    value={Body}
                                    className="form-control"
                                    placeholder="Enter body *"
                                    type="text"
                                    onChange={(e)=>setBody(e.target.value)}
                                            /> 
                <button className='btn btn-primary mt-2'>Submit</button>
                <Link to="/notification/promotional?opened=sheduled"><button className='btn btn-danger mt-2'  style={{'marginLeft': '10px'}}>Back</button></Link>
        </form>
    </div>
    </>
  )
}

export default Updatesheduled