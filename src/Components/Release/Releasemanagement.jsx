import React,{useState} from 'react'
import { Listplatform } from '../../Objects/Country'
import AsyncSelect from 'react-select/async';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MultipartAPI from '../../Objects/MultipartAPI';
import Spin from '../Spinner/Spin';
import alertinstance from '../../Objects/Alert';
const Releasemanagement = ({icon}) => {
  const [appname, setappname] = useState('')
  const [releaseDate,setrelease]=useState(null)
  const [platform,setplatform]=useState([])
  const [version,setverison]=useState('')
  const [androidbuildername,setandroidbuildername]=useState('')
  const [description,setdescription]=useState('')
  const [published,setpublished]=useState(false);
  const [releaseBundle,setreleaseBundle]=useState([])
  const [searches, setSearches] = useState([])
  const [query, setQuery] = useState("")
  const [loading,setloading]=useState(false)

  const option_platform=async()=>{
    return Listplatform()
  }
  const handledevice = (e) =>{
    setplatform(e.label)
    //setdeviceFiltered(Array.isArray(e)?e.map(x=>x.label):[]);
  }
  const submitHandler=(e)=>{
    e.preventDefault()
    setloading(true)
    const data = {
      appname:appname,
      platform:platform,
      releasedate:releaseDate,
      version:version,
      androidBuildNumber:androidbuildername,
      description:description,
      features:searches,
      ismandatory:published
    }    
    const formData = new FormData();
    formData.append('formText',JSON.stringify(data));
    formData.append('releaseBundle',releaseBundle);
    MultipartAPI.post('/releaseManagement',formData)
    .then(res=>{
      setloading(false)
      alertinstance(res)
    }).catch(err=>{
      setloading(false)
      console.log(err)
    })
  }
  const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value)
  }
  const featureHandler = e => {
    // Prevent form submission on Enter key
    e.preventDefault()
    if(query !== ''){
    setSearches(searches => [...searches, {language:'en',text:query}])
    setQuery('');
    }    
  }
  const deleteRow = (index) => {
    //let name="Mano"
    //setEmps(emps.filter(emp => emp.name !== name))
    let copy_emp=[...searches]
    copy_emp.splice(index,1)
    setSearches(copy_emp)
}
  return (
    <>
    {!loading ? '':<Spin/>}
    <div className='content users'>
        <div className="alert alert-primary">  
          <i className="fa fa-bars" onClick={icon}></i>
          <span className='leftpush'>Release Management</span>
        </div>
        <p className='path p-3 mt-2'>Home / Release / Upload APK </p>
        <form onSubmit={submitHandler}>
                <label><i className="fa fa-tablet"></i> Select Platform</label><br/>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        getOptionLabel={e => e.label}
                        getOptionValue={e => e.label}
                        loadOptions={option_platform}
                        onChange={handledevice}
                        placeholder='Select platform*'
                    />
                <label><i className="fa fa-heading"></i> App Name </label>
                <input
                    //value={query1}
                    required
                    className="form-control"
                    placeholder="Enter app name*"
                    type="text"
                    onChange={(e)=>setappname(e.target.value)}
                />
                 <label><i className="fa fa-calendar-alt"></i> Date</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Select date*"
                            type="date"
                            onChange={(e)=>setrelease(e.target.value)}
                        />
                <label><i className="fa fa-heading"></i> Version</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Enter app version*"
                            type="text"
                            onChange={(e)=>setverison(e.target.value)}
                        />
                <label><i className="fa fa-heading"></i> Android Build Number</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Enter android builder name*"
                            type="text"
                            onChange={(e)=>setandroidbuildername(e.target.value)}
                        />
                <label><i className="fa fa-heading"></i> Description</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Enter description*"
                            type="text"
                            onChange={(e)=>setdescription(e.target.value)}
                        />
                <label><i className="fa fa-heading"></i> Feature</label>
                        <input
                        value={query}
                            className="form-control"
                            placeholder="Enter new feature*"
                            type="text"
                            onChange={updateQuery}
                        />
                <button onClick={featureHandler} className="btn btn-success"> &#43; </button>
                <Stack direction="row" spacing={1} className="stack">
                    {searches.map((x,index) =>{
                        return(
                            <Chip key={index} label={x.text} onDelete={()=>deleteRow(index)}/>
                        )
                    })}
                </Stack>
                  <br/>
                <input type="checkbox"  checked={published} onChange={e => setpublished(e.target.checked)}/>
                <label> Mandatory</label><br/> 

                <label><i className="fa fa-film"></i>Upload APK</label>
                        <input
                            className="form-control"
                            placeholder="Select .apk*"
                            type="file"
                            onChange={(e)=>setreleaseBundle(e.target.files[0])}
                        />   
                <button className="btn btn-success  mt-2" type="submit"> Upload </button>
        </form>
    </div>
    </>
  )
}

export default Releasemanagement