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

import React, { Component, useState,useEffect} from 'react';
import '../css/category.css';
import '../css/Promotion.css';
import Select from 'react-select';
import Instance from '../Objects/Axios';
import Swal from 'sweetalert2';
import { 
  useNavigate,
  useParams
} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const static_url = process.env.REACT_APP_CDN_STATIC;
const Listpromotion = ({icon}) => {
  let navigate = useNavigate();
  const [list, setList]= useState([]);
  const [len,setlen]=useState(0)
  const [page,setpage]=useState(1);
  const [container, setcontainer] = useState([])
 const [handler,sethandler]=useState([])
 const [startindex,setstartindex]=useState(0)
 const [endindex,setendindex]=useState(10)

  var val = [
        {
            value:0,
            label:'drama'
        },
        {
            value:1,
            label:'comedy'
        },
        {
            value:2,
            label:'action'
        },
        {
            value:3,
            label:'sample'
        }
      ];


  useEffect(() => {
            Manage();
  },[])
//sweet alert for adding or updating posters
const alertuser = (x)=>{
    Swal.fire({
        title: 'notification',
        text: x,
        icon: 'success',
      })       
}
//function for Listing poster
const Manage=()=>{
//API call for Listing all promotional poster
Instance.get('/listPromotionalPoster')
    .then((response) => {
      //handle success
      const rev = response.data.data.reverse()
      transform(rev)
      
     }).catch(err=>{
      if(err.response){
        if(err.response.status === 403){
          localStorage.clear()
          navigate('/login/error?message=session token expired please login again !')
        }
      }
     })
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


    //function for delete poster
    const Deletepromotion=(id)=>{
          Instance.delete('/deletePromotionalPoster?posterId='+`${id}`)
            .then((response) => {
              //handle success
              alertuser(response.data.message)
              setTimeout(() => {
                refreshPage()
              }, 1500);
             })
    }

    //for refreshing page to view new content
    const refreshPage = ()=>{
      window.location.reload();
   }
 
    //return the Module content
    return (
       
        <div className='content poster'>
              <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Posters</span>
              </div>
              <p className='path p-3 mt-2'>Home / Promotional Posters / </p>
             <button className='btn btn-danger mt-2'  onClick={()=>{navigate("/posters/add")}}><i className="fa fa-plus"></i> Add poster</button>
             <table className="table table-striped table-hover mt-2">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Thumbnail</th>
                  <th scope="col">Title</th>
                  <th scope="col">Type</th>
                  <th scope="col">Modify</th>
                </tr>
              </thead>
              <tbody>
              {container.map((x,index)=>{
                            return(
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={static_url + '/'+x.awsResourceId+'/'+x.url}/></td>
                                    <td>{x.name}</td>
                                    <td>{x.type}</td>
                                    <td> 
                                    <i className="fa fa-trash" onClick={()=>Deletepromotion(x._id)}></i>
                                    <i className='fa fa-edit' onClick={()=>{navigate("/posters/update/"+`${x._id}`+'/'+`${x.name}`)}} ></i>
                                     </td>
                                  </tr>
                            )
              })}
              </tbody>
            </table>
            <Stack spacing={2}>
            <Pagination count={len} page={page} onChange={handleChange}  variant="outlined" shape="rounded" />
          </Stack>
        </div>
       
    )
}

export default Listpromotion
