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

import React,{useState,useEffect,useRef} from 'react'
import sampler from '../Objects/axiosjson';
import '../css/upcomming.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Listsupportticket = ({icon}) => {
let navigate = useNavigate();
const [container, setcontainer] = useState([])
const [handler,sethandler]=useState([])
const [len,setlen]=useState(0)
const [id,setid]=useState('');
const [name,setname]=useState('');
const [uuid,setuuid]=useState('');
const [hover,sethover]=useState(false);
const [status,setstatus]=useState({});
const [startindex,setstartindex]=useState(0)
const [endindex,setendindex]=useState(10)
const [page,setpage]=useState(1);
const [startdate,setstartdate]=useState()
const [enddate,setenddate]=useState()
//useEffect call
useEffect(()=>{
    sampler.post('/listSupportTickets')
    .then(res=>{      
      console.log(res.data.data)
      transform(res.data.data)
    }).catch(err=>{
      if(err.response.status === 403){
        localStorage.clear()
        navigate('/login/error?message=session token expired please login again !')
      }
     })
},[])

useEffect(()=>{
return filter_date()
},[enddate])

const filter_date=()=>{
  if(!enddate){
    console.log('please  select end date')
    }else{
      const dd1 = new Date(startdate)
      const dd2 = new Date(enddate)
      const f1 = dd1.toISOString()
      const f2 = dd2.toISOString()
    
      const finale = handler.filter(x=>  f1 <= x.date && x.date <= f2 )
      setcontainer(finale.slice(startindex,endindex))
      
    
    }
}

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
  sethandler(data)
  setcontainer(data.slice(startindex,endindex))
}

const expand=(name,id,uuid)=>{
    setid(id)
    setname(name)
    setuuid(uuid)
    sethover(!hover)
}

var data_status=[
    {
      label:'Open'
    },
    {
      label:'Progress'
    },
    {
      label:'Closed'
    },
    {
      label:'Reopen'
    }
  ]
const handlechangestatus=(e)=>{
    setstatus(e.label);
    const ret = handler.filter(x=> x.status === e.label)
    setcontainer(ret.splice(0,11))
    setlen(ret.length/10)
}


const handleChange=(e,value)=>{
  setpage(value)
  if(value === 1){
    const dd  = handler.slice(0,value+10)
    setcontainer(dd)
  }else{
    const dd1  = handler.slice(value*10 - 10 , value*10)
    setcontainer(dd1)
  }
}

  return(
      <>
      <div className='content'>
      <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> All Support Tickets</span>
      </div>
      <div className={hover ? 'list shadow':'listnone shadow'}>
                                    <li onClick={()=>{navigate("/support/update/"+`${id}`+"/"+`${name}`)}}> Update Support Ticket</li>
                                    <li onClick={()=>{navigate("/support/ticket/details/"+`${uuid}`+'/'+`${name}`)}}> View Ticket</li>
    </div>
    
    <label><i className="fa fa-heading"></i> Select Status</label>
    <Select className="form-control p-0" options={data_status}  placeholder="select status of ticket" onChange={handlechangestatus}></Select>
 
    <div className="row">
    <div className="col-md-6">
    <label><i className="fa fa-calendar-alt"></i> Start Date</label>
                        <input
                            name=""
                            className="form-control"
                            type="date"
                            onChange={(e)=>{ setstartdate(e.target.value)}}
                        />
       </div>
       <div className="col-md-6">
       <label><i className="fa fa-calendar-alt"></i> End Date</label>
                        <input
                            name=""
                            className="form-control"
                            type="date"
                            onChange={(e)=>{ setenddate(e.target.value)}}
                        />
      </div>
     
    </div>
  
  
      <table class="table mt-4 table-striped">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">User</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Description</th>
                <th scope='col'>Time</th>
                <th scope='col'>Status</th>
                <th scope="col">Modify</th>
                </tr>
            </thead>
      <tbody>
           
                {container.map((x,index)=>{
                    return(
                                <>
                                <tr key={index + 1}>
                                <th scope="row">{x.ticketNumber}</th>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.mobile}</td>
                                <td>{x.description}</td>              
                               <td>{x.date}</td>
                               <td>{x.status}</td>
                               <td>
                               <i className='fa fa-ellipsis-h'  onClick={()=> expand(x.name,x._id,x.uuid)}></i>
                               {/**/}
                               </td>
                                </tr>
                               
                                </>
                            
                    )
                })}
              
               
            </tbody>
      </table>
      
      <div className="numbers">
          {/*
          <p className='mt-2'>you are on the page number<span style={{color:'#0099e3'}}> {page}</span> </p>
          values.map((val) => (
          <li onClick={() => {setActiveId(val.id);setstartindex(val.startindex);setendindex(val.endindex);setpage(val.page)}} className={activeId === val.id ? "Active" : "Inactive"}>
            {val.id}
          </li>
          ))*/}
          <Stack spacing={2}>
            <Pagination count={len} page={page} onChange={handleChange}  variant="outlined" shape="rounded" />
          </Stack>
      </div>
      
      </div>
      </>
  )
};

export default Listsupportticket;
