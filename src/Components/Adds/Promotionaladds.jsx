import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Enablenotification from './Enablenotification';
import Listshedulednotification from './Listshedulednotfication';
import Contentnotification from './Contentnotification';
const Promotionaladds = ({icon}) => {
  const [flag,setflag]=useState(true)
  const [flag1,setflag1]=useState(true)
  const search = new URLSearchParams(window.location.search)
  const opened = search.get("opened");
  const [value,setvalue]=useState('add')

  useEffect(()=>{
    handle(opened)
  },[])

  const handle=(e)=>{
    setvalue(e)
    if(e === 'enable'){
      setflag(false)
      setflag1(false)
    }else if (e === 'sheduled'){
      setflag(false)
      setflag1(true)
    }else if(e === 'null'){
      setvalue('add')
      setflag(true)
    }else{
      setflag(true)
      setvalue('add')
    }
  }
  return (
    <>
    <div className='content users'>
    <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'>Promotional Adds</span>
    </div>
    <p className='path p-3 mt-2'>Home / Promotional / Notifications</p>

    <div className='inner'>
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={(e)=>handle(e.target.value)}
      >
        <FormControlLabel value="add" control={<Radio />} label="Add/Edit Notification" />
        <FormControlLabel value="enable" control={<Radio />} label="Enable/Disable Notification" />
        <FormControlLabel value="sheduled" control={<Radio />} label="List Sheduled Notifications" />
      
      </RadioGroup>
    </FormControl>

    {flag ? 
    <Contentnotification/>
    :
    <div className='col-md-12 add'>
      {flag1 ? 
      <Listshedulednotification/>
      :
      <Enablenotification/>
      }
      
    </div>
    }
    </div>
    </div>
    </>
  )
}

export default Promotionaladds