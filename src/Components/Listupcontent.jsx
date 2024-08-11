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
import {
    useNavigate,
    useParams
  } from "react-router-dom";
import alertinstance from '../Objects/Alert';
import Refresh from '../Objects/Refresh';
import { mdiFolderPlay } from '@mdi/js';
import Icon from "@mdi/react";
import { mdiMovieEdit } from '@mdi/js';
import { mdiDelete } from '@mdi/js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const static_url = process.env.REACT_APP_CDN_STATIC;
const Listupcontent = ({icon}) => {
    let navigate = useNavigate();
    //api call for listing upcomming content 
    const [len,setlen]=useState(0)
    const [page,setpage]=useState(1);
    const [container, setcontainer] = useState([])
   const [handler,sethandler]=useState([])
   const [startindex,setstartindex]=useState(0)
   const [endindex,setendindex]=useState(10)
   const [raw,setRaw]=useState([])
    useEffect(()=>{
       sampler.get('/listUpcoming')
        .then(res=>{
            const rev = res.data.data.reverse()
            transform(rev)
            setRaw(rev)
            
          }).catch(err=>{
            if(err.response.status === 403){
              localStorage.clear()
              navigate('/login/error?message=session token expired please login again !')
            }
           })
       },[])
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
      
      const handleChange=(e,value)=>{
        setpage(value)
        if(value === 1){
          const dd  = handler.slice(0,10)
          setcontainer(dd)
        }else{
          const dd1  = handler.slice(value*10 - 10 , value*10)
          setcontainer(dd1)
        }
      }
    const manage=(data)=>{
        for(var i=0;i<data.length;i++){
            convert_epoch_to_normal(data[i])
        }
    }

    const Deleteupcoming = (id) =>{
        sampler.delete('/deleteUpcoming?upcomingId='+`${id}`)
        .then(res=>{
          alertinstance(res)
          Refresh()
        })
        .catch(err=>{
            console.log(err);
        })
    }
   
    const fun=(x,y)=>{
        sethover(!hover)
        setupID(x)
        setuptitle(y)
    }
    const final_date=[]
    const [date,setdate]=useState([])
    const convert_epoch_to_normal=(obj)=>{
        var Time = new Date(obj.releaseDate)
        let str = Time.toLocaleString()
        final_date.push(obj + str)        
    }
    const [hover,sethover]=useState(false);
    const [upID,setupID]=useState('');
    const [uptitle,setuptitle]=useState('');
    const handleSearch=(e)=>{
      let key = e.target.value;
      var filData  = raw.filter(x=>{
        if(x.title.toUpperCase().includes(key.toUpperCase())){
          return x
        }
      })

      if(key.length > 0){
        transform(filData)
      }else if(key.length === 0){
        transform(raw)
      }
    }
    return (
        <div className='content'>
            <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Upcoming Content</span>
            </div>
            <p className='path p-3 mt-2'>Home / Upcoming Contents / </p>

            <button className='btn btn-danger mt-2'  onClick={()=>{navigate("/addupcomming/content")}}><i className="fa fa-plus"></i> Add Upcoming</button>
                   
            <div className='search_div'>
              <i className='fa fa-search abs'></i>
              <input type='text'
              className='form-control mt-2 mb-2 abs'
              placeholder="Search Content Name Here*"
              onChange={handleSearch}/>
            </div>
            <div className={hover ? 'list shadow':'listnone shadow' }>
                                    <li onClick={()=>{navigate("/updateupcomming/content/"+`${upID}`+'/&&name=/'+`${uptitle}`)}}>
                                    <Icon path={mdiMovieEdit} className="mdicon" />  <span>Update Content</span></li>
                                    <li onClick={()=> Deleteupcoming(`${upID}`) }><Icon path={mdiDelete} className="mdicon" />  <span>Delete Content</span></li>
            </div>
            <table class="table mt-2 table-striped">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Thumbnail</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                
                <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
           
                {container.map((r,index)=>{
                            return(
                                <>
                                <tr key={index + 1}>
                                <th scope="row">{index+1}</th>
                                <td><img style={{'width':'320px' , 'height':'200px'}} src={ static_url +'/'+r.resourcePath+'/'+r.landscapeNormal}></img></td>
                                <td>{r.title}</td>
                                <td>{r.description}</td>
                                <td>{r.categoryName}</td>              
                               
                               {/*<td><i className='fa fa-trash' onClick={()=>Deleteupcoming(r._id)}></i>  
                               <i className='fa fa-edit'onClick={()=>{navigate("/updateupcomming/content/"+`${r._id}`+'/&&name=/'+ `${r.title}`)}} ></i></td>*/}
                               <td><i className='fa fa-ellipsis-h'  onClick={()=> fun(r._id,r.title)}></i>
                               </td>
                                </tr>
                               
                                </>
                            )})
 }
              
               
            </tbody>
            </table>
            <Stack spacing={2}>
            <Pagination count={len} page={page} onChange={handleChange}  variant="outlined" shape="rounded" />
          </Stack>
        </div>
    )
}

export default Listupcontent
