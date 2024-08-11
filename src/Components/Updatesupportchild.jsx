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

import React, {useState} from 'react';
import '../css/App.css';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Navigate,
    useNavigate,
    useParams
  } from "react-router-dom";
import '../css/content.css';
import Select from 'react-select';
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
const Updatesupportchild = ({icon}) => {
    let {id} = useParams();
    let {name}=useParams();
    let navigate = useNavigate()
    const [comment,setcomment]=useState('');
    const [status,setstatus]=useState('');
    const [loading,setloading]=useState(false)
    var data_status = [
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
    const handlestatus=(e)=>{
        setstatus(e.label);
    }
    const Support = (e)=>{
        e.preventDefault();
        setloading(!loading)
        const data = {
            comment : comment,
            status : status,
            id : id
        }
        sampler.post('/updateSupportTicket',data)
        .then(res=>{
            setloading(false)
            alertinstance(res)
            if(res.data.error === false){
                setTimeout(() => {
                    navigate('/support')
                }, 1500);
            }
            //setTimeout(() => {
             //   navigate('/support')
            //}, 1500);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
  return (
    <>{!loading ? '':<Spin/>}
    <div className='content'>
        <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> you are updating {name} </span>
        </div>
        <form onSubmit={Support}>
        <label><i className="fa fa-heading"></i> Status</label>
        <Select className="form-control p-0" options={data_status} placeholder="select status" onChange={handlestatus}></Select>
         <label><i className="fa fa-heading"></i> Comment</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="enter comment"
                            type="text"
                            onChange={(e)=>setcomment(e.target.value)}
                        />
                        <button className='btn btn-primary mt-3' type="submit">submit</button>
        </form>
    </div>
    </>
  )
 
};

export default Updatesupportchild;
