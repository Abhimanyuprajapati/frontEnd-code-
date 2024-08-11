import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import MultipartAPI from '../../Objects/MultipartAPI';
import AsyncSelect from 'react-select/async';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Apikey from '../../Objects/Apikey';
import alertinstance from '../../Objects/Alert';
import Refresh from '../../Objects/Refresh';
import Spin from '../Spinner/Spin';
const Contentnotification = () => {
  let navigate = useNavigate()
    const [flag1,setflag1]=useState(false)
    const [contentflag,setcontentflag]=useState(false)
    const [status,setstatus]=useState(false)
    const [type,settype]=useState('')
    const [body,setBody]=useState('')
    const [poster1,setPoster1]=useState([])
    const [poster2,setPoster2]=useState([])
    const [poster3,setPoster3]=useState([])
    const [poster4,setPoster4]=useState([])
    const [stdate,setStdate]=useState(null)
    const [eddate,setEddate]=useState(null)
    const [priority,setpriority]=useState()
    const [selectedValue, setSelectedValue] = useState(null);
    const [contentId,setcontentId]=useState('')
    const [searches, setSearches] = useState([])
    const [query, setQuery] = useState("")
    const [searches1, setSearches1] = useState([])
    const [query1, setQuery1] = useState("")
    const [time,settime]=useState('00:00')
    const [loading,setloading]=useState(false)
   
    const loadOptions = () => {
        return MultipartAPI.get('/listContents').then(res => res.data.data )
    }
    

    const Listtype=[
        {
            label:'Content',
            value:'content'
          },
          {
            label:'Promotion',
            value:'promotion'
          }
    ]
  
    const Listoptions = [
      {
        label:'Now',
        value:'Now'
      },
      {
        label:'Recurring',
        value:'Recurring'
      }
    ]
    const Listrepeat=[
      {
        label:'Repeat',
        value:'Repeat'
      },
      {
        label:'Doest Not Repeat',
        value:'Doest Not Repeat'
      }
    ]
    const Listpriority=[
        {
            label:'100',
            value:'100'
          },
          {
            label:'101',
            value:'101'
          },
          {
            label:'102',
            value:'102'
          },
          {
            label:'103',
            value:'103'
          },
          {
            label:'104',
            value:'104'
          },
          {
            label:'105',
            value:'105'
          },
          {
            label:'106',
            value:'106'
          },
          {
            label:'107',
            value:'107'
          },
          {
            label:'108',
            value:'108'
          },
          {
            label:'109',
            value:'109'
          },
          {
            label:'110',
            value:'110'
          }
        ]
  
   
  
   
    const handletype=(e)=>{
        settype(e.value)
        if(e.value === 'content'){
          setcontentflag(true)
        }else{
          setcontentflag(false)
        }
    }
    const handlepriority=(e)=>
    {
        setpriority(e.value)
    }
    const handletime =(e)=>{
      if(e.value === 'Recurring'){
        setflag1(true)
      }else{
        setflag1(false)
      }
    }
  
  
 
    const handleChange=(e)=>{
        setSelectedValue(e)
        setcontentId(e._id)
    }
    const updateQuery = ({ target }) => {
        // Update query onKeyPress of input box
        setQuery(target.value)
      }
    

    const submitHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
        setSearches(searches => [...searches, query])
        setQuery('');
       
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
    

    const submitHandler1 = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
        setSearches1(searches1 => [...searches1, query1])
        setQuery1('');
       
    }
    const deleteRow1 = (index) => {
        //let name="Mano"
        //setEmps(emps.filter(emp => emp.name !== name))
        let copy_emp=[...searches1]
        copy_emp.splice(index,1)
        setSearches1(copy_emp)
    }
    var epoch1 , epoch2;
    const dateconverter=(stdate , eddate)=>{
      const x = new Date(stdate)
      const y = new Date(eddate)
      epoch1 = x.getTime()
      epoch2 = y.getTime()
    }


    const submit_handler=()=>{
      setloading(true)
      dateconverter(stdate , eddate)
      var data ;
      if(!contentflag){
        //for promotion
        data = {
          titles:searches,
          messages:searches1,
          messageBody:body,
          status:status,
          notificationType:type,
          priority:priority,
          timetoSend:'now'
        }
      }else{
        //for content (notification type)
        if(!flag1){
          //for time as now
          data = {
            titles:searches,
            messages:searches1,
            messageBody:body,
            status:status,
            contentId: contentId,
            notificationType:type,
            priority:priority,
            timetoSend:'now',
            recurring: false,
          }
        }else{
          //for time as recurring
          data = {
            titles:searches,
            messages:searches1,
            messageBody:body,
            status:status,
            contentId:!contentflag ?  '' : contentId,
            notificationType:type,
            priority:priority,
            timetoSend: time,
            recurring: true,
            startTime: epoch1,
            endTime: epoch2
        }
        }
      }
      
      
      const formText = JSON.stringify(data);
      const formData = new FormData();
      formData.append('formText',formText)
      formData.append('file0',poster1)
      formData.append('file1',poster2)
      formData.append('file2',poster3)
      formData.append('file3',poster4)
      
      
      Apikey.post('/sendNotification',formData)
      .then(res=>{
        setloading(false)
        if(res.status === 200){
          alertinstance(res)
          if(res.data.code === 0){
            Refresh()
          } 
        }
      }).catch(err=>{
        if(err.response.status === 403){
          localStorage.clear()
          navigate('/login/error?message=session token expired please login again !')
        }
      })
    }
    
    const handlestatus=(e)=>{
      setstatus(e.target.checked)
    }
  return (
    <>
    {!loading ? '':<Spin/>}
    <div className='add'>
        <label><i className="fa fa-heading"></i> Notification Type</label>
        <Select className="form-control p-0" options={Listtype} placeholder="Select Notification Type*" onChange={handletype}></Select>
        {!contentflag ? 
                '':
                <>
                <label><i className="fa fa-heading"></i> Content Id </label>
                <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={selectedValue}
                        getOptionLabel={e => e.title}
                        getOptionValue={e => e._id}
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        placeholder='Select catgeory*'
                    />
                </>
                }
        <form onSubmit={submitHandler1}>
                <label><i className="fa fa-envelope"></i> Add Messages</label>
                <input
                    value={query1}
                    required
                    className="form-control"
                    placeholder="Enter message*"
                    type="text"
                    onChange={updateQuery1}
                />
                <button className="btn btn-success  mt-2" type="submit"> &#43; </button>
                <Stack direction="row" spacing={1} className="stack">
                    {searches1.map((x,index) =>{
                        return(
                            <>
                            <Chip key={index} label={x} onDelete={()=>deleteRow1(index)}/>
                            </>
                        )
                    })}
                </Stack>
        </form>
        <form onSubmit={submitHandler}>
                <label><i className="fa fa-user"></i> Add Titles</label>
                <input
                    value={query}
                    required
                    className="form-control"
                    placeholder="Enter title*"
                    type="text"
                    onChange={updateQuery}
                />
                <button className="btn btn-success  mt-2" type="submit"> &#43; </button>
                <Stack direction="row" spacing={1} className="stack">
                    {searches.map((x,index) =>{
                        return(
                            <>
                            <Chip key={index} label={x} onDelete={()=>deleteRow(index)}/>
                            </>
                        )
                    })}
                </Stack>
        </form>

                
                <label><i className="fa fa-align-justify"></i> Body </label>
                                <textarea
                                    name=""
                                    rows="4"
                                    className="form-control"
                                    placeholder="Enter body *"
                                    type="text"
                                    onChange={(e)=>setBody(e.target.value)}
                                            />
                  <FormControlLabel control={ 
                  <Checkbox
                    checked={status}
                    onChange={handlestatus}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />} label="Status" />
                  <br/>
                
                  {!contentflag ? 
                <>
                </>
                :
                <>
                <label><i className="fa fa-comment-alt"></i> Select Notification Time</label>
                <Select className="form-control p-0" options={Listoptions} placeholder="Select Notification*" onChange={handletime}></Select>

                {flag1 ? 
                <div className='row'>
                
                <div className='col-md-6'>
                <label><i className="fa fa-calendar-alt"></i>Start Date</label>
                                <input
                                    name=""
                                    className="form-control"
                                    placeholder="Select start date*"
                                    type="date"
                                    onChange={(e)=>setStdate(e.target.value)}
                                />
                </div>
                <div className='col-md-6'>
                <label><i className="fa fa-calendar-alt"></i>End Date</label>
                                <input
                                    name=""
                                    className="form-control"
                                    placeholder="Select end date*"
                                    type="date"
                                    onChange={(e)=>setEddate(e.target.value)}
                                />        
                </div>
                <label><i className="fa fa-time"></i> Timetosend</label>
                            
                            <input
                                name=""
                                className="form-control m-0"
                                type="time"
                                onChange={(e)=>settime(e.target.value)}
                            /> 

                </div>
                :
                ''}
                </>
                }

                <label><i className="fa fa-sort-amount-down"></i> Select Notification Priority</label>
                <Select className="form-control p-0" options={Listpriority} placeholder="Select Notification*" onChange={handlepriority}></Select>
                
                {/*<label><i className="fa fa-film"></i> Select Notification Repeatation</label>
                <Select className="form-control p-0" options={Listrepeat} placeholder="Select Notification*" onChange={handleprep}></Select>*/}
              <label><i className="fa fa-film"></i> Poster 1 (1920 x 1080)</label>
                            
                            <input
                                name=""
                                className="form-control m-0"
                                placeholder="Select poster*"
                                type="file"
                                onChange={(e)=>setPoster1(e.target.files[0])}
                            />
                <label><i className="fa fa-film"></i> Poster 2 (1920 x 1080)</label>
                            
                            <input
                                name=""
                                className="form-control m-0"
                                placeholder="Select poster*"
                                type="file"
                                onChange={(e)=>setPoster2(e.target.files[0])}
                            />
                <label><i className="fa fa-film"></i> Poster 3 (1920 x 1080)</label>
                            
                            <input
                                name=""
                                className="form-control m-0"
                                placeholder="Select poster*"
                                type="file"
                                onChange={(e)=>setPoster3(e.target.files[0])}
                            />
                <label><i className="fa fa-film"></i> Poster 4 (1920 x 1080)</label>
                            
                            <input
                                name=""
                                className="form-control m-0"                                
                                type="file"
                                onChange={(e)=>setPoster4(e.target.files[0])}
                            />
                <button className='btn btn-primary' onClick={()=> submit_handler()} > submit </button>
    </div>
    </>
  )
}

export default Contentnotification