import React,{useState,useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import sampler from '../../Objects/axiosjson';
import Apikey from '../../Objects/Apikey';
import alertinstance from '../../Objects/Alert';
import Refresh from '../../Objects/Refresh';
import Spin from '../Spinner/Spin';
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

 
const Enablenotification = () => {
  const [container,setcontainer]=useState([])
  const [loading,setloading]=useState(true)
  useEffect(()=>{
    listnotification()
    return ()=>{
      setloading(true)
    }
  },[])
  const listnotification=()=>{
    sampler.get('/listNotificationType')
    .then(res=>{
      setloading(false)
      if(res.status === 200){
        setcontainer(res.data.data)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
    const handlechange=(e)=>{
        setloading(true)
        const data = {
          notificationType:e.target.value,
          status: e.target.checked
      }
      Apikey.post('/enableNotificationType',data)
      .then(res=>{
        setloading(false)
        alertinstance(res)
        if(res.data.code === 0){
          Refresh()
        }
      }).catch(err=>{
        console.log(err)
      })
    }
   
  return (
    <>
    {!loading ? '':<Spin/>}
    <table className="table mt-2 table-striped">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Notification Type</th>
                <th scope="col">Status</th>
               
                </tr>
            </thead>
            <tbody>
           
                {container.map((r,index)=>{
                            return(
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{r.notificationType}</td>
                                <td>{r.status ? 
                                <Android12Switch value={r.notificationType} defaultChecked onChange={handlechange}/>:
                                <Android12Switch value={r.notificationType}  onChange={handlechange}/>
                                }</td>           
                                </tr>
                            )})
 }
              
               
            </tbody>
    </table>
    </>
  )
}

export default Enablenotification