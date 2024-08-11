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
import React,{useState,useEffect} from 'react'
import sampler from '../Objects/axiosjson';
import '../css/upcomming.css';
import { useNavigate,useParams } from 'react-router-dom';
const Supportticketdetails = ({icon}) => {
let navigate = useNavigate();
let {uuid} = useParams();
let{username}=useParams()
const [container, setcontainer] = useState({
    data:{
        name:'',
        mobile:'',
        description:''
    }
})
useEffect(()=>{
    const params = {
        uuid: uuid
    };
    sampler.post('/getSingleSupportTicket',params)
    .then(res=>{
        setcontainer(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
},[])
const [hover,sethover]=useState(false);
const OptionsCursorTrueWithMargins = {
  followCursor: false,
  shiftX: 0,
  shiftY:0
}

  return(
      <div className='content'>
      <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Support Ticket </span>
                </div>
                <p className='path p-3 mt-2'>Home / Support Tickets / Details / {username} </p>
      {
          <div className="card mt-2">
          <div className="card-body">
          <p style={{position:'absolute',padding: '0px 10px',right:'0'}}>
            <i className='fa fa-edit p-2 ms-3' onClick={()=>{navigate("/support/update/"+`${container.data._id}`+"/"+`${container.data.name}`)}}></i>
            </p>
          <h5 className="card-title"> {container.data.ticketNumber} - {container.data.issueType}</h5>
            <h5 className="card-title mt-2"><i class="fa fa-user" style={{padding :'5px 10px 0px 0px',color: '#ccc',fontSize:'20px'}}></i> {container.data.name}</h5>
            <h6 className="card-subtitle my-2"><i class="fa fa-phone-square" style={{padding :'5px 10px 0px 0px',color: '#ccc',fontSize:'20px'}}></i> {container.data.mobile}</h6>
            <h6 className="card-subtitle mb-2 mt-0"><i className="fa fa-envelope" style={{padding :'5px 10px 10px 0px',color: '#ccc',fontSize:'20px'}}></i> {container.data.email}d</h6>
            <p className='card-subtitle'>{container.data.description}</p>
            <p className='card-subtitle'>status : {container.data.status}</p>
            <p className="card-text" style={{fontSize: '13px'}}>{container.data.date}</p>
          </div>
        </div>
      }
                                 
   
    </div>
  )
};

export default Supportticketdetails;
