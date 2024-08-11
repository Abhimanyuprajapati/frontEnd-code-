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

import React, { useState,useEffect} from 'react';
import '../css/category.css';
import '../css/Promotion.css';
import Select from 'react-select';
import Swal from 'sweetalert2';
import {
    useNavigate,
    useParams,Link
  } from "react-router-dom";
  import MultipartAPI from '../Objects/MultipartAPI';
import alertinstance from '../Objects/Alert';
import AsyncSelect from 'react-select/async';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Instance from '../Objects/Axios';
import {Listgenre} from '../Objects/Country';
import Spin from './Spinner/Spin';
const Updateposterchild = ({icon}) => {
    let navigate = useNavigate();
    let {posterId} = useParams()
    let {posterName} = useParams()
    const [name,setpname]=useState("");
    const [pagerating,setpagerating]=useState('');
    const [type,setptype]=useState("");
    const [source,setpsource]=useState("");
    const [value,setvalue]=useState('');
    const [portraitNormal,setportraitNormal]=useState('')
    const [link,setlink]=useState('https://')
    const [content,setcontent]=useState('')
    const [loading,setloading]=useState(false)
    useEffect(()=>{
        Instance.get('/listPromotionalPoster')
        .then((res) => {
          call(res.data.data)
        })
    },[])
    const data_genre=async()=>{
        return Listgenre()
    } 
   
const call =(bucket1)=>{
const modes = []
for (var index = 0; index < bucket1.length; index++) {
    if (bucket1[index]._id === posterId) {
           setpname(bucket1[index].name)
           setpagerating({label: bucket1[index].ageRating})
           setpsource(bucket1[index].source)
           setptype({label:bucket1[index].type})
           handletypes({label:bucket1[index].type})
           if(bucket1[index].link !== 'https://'){
            setcontent({title:bucket1[index].link})
           }else{
            setcontent({title:''})
           }
          
           setlink(bucket1[index].link)
           bucket1[index].tag.map((x)=>{
            modes.push({label:x})
          })
          setvalue(modes)
     }
   }
}    
    var age =[
        {
            value:0,
            label:'7+'
        },
        {
            value:1,
            label:'13+'
        },
        {
            value:2,
            label:'18+'
        }
    ]
    const handle = (e) =>{
        setvalue(Array.isArray(e)?e.map(x=>x):[]);
    }

  //function for Add poster
   const Updatepromotion=(e)=>{
        e.preventDefault();
        setloading(!loading)
        const formData = new FormData();
        const tag = value.map(x=>x.label)
          let cont = {
              posterId:posterId,
              name:name,
              tag:tag,
              ageRating:pagerating.label,
              type:type.label,
              source:source,
              link: link
          }

          //API call for Adding promotional poster
          const formText = JSON.stringify(cont)
          formData.append('formText',formText)
          formData.append('promoposter',portraitNormal)
          const data = formData
          MultipartAPI.put('/updatePromotionalPoster',data)
              .then((res) => {
                setloading(false)
                //handle success
                alertinstance(res)
                if(res.data.error === false){
                  navigate('/posters')
              }
               })
              .catch((err) =>{
                setloading(!loading)
                //handle error
                alertinstance(err);
              });
      }
    const loadOptions = () => {
        return  MultipartAPI.get('/listContents').then(res => res.data.data )
    }
   
    const handleChange = value => {
        setlink(value._id)
        setcontent({title:value.title})
    }

    const [checked, setChecked] = React.useState(false);

    const handleChange1 = (event) => {
      setChecked(event.target.checked);
    };
    var types = [
        {
            value:0,
            label:'Youtube'
        },
        {
            value:1,
            label:'Web'
        },
        {
            value:2,
            label:'Whatsapp'
        },
        {
            value:3,
            label:'Instagram'
        },
        {
            value:4,
            label:'Facebook'
        },
        {
            value:5,
            label:'Content'
        }
    ]
    const handletypes =(e)=>{
        if( e.label === 'Content' || e === 'Content'){
            setlink('')
            sethide(true)
        }
        else{
            setlink('https://')
            sethide(false)
        }
        setptype({label:e.label});
    }
    const handleage=(e)=>{
        setpagerating({label:e.label})
    }
    const handlefile=(e)=>{
        const file = e.target.files[0];
        const  fileType = file['type'];
        const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!validImageTypes.includes(fileType)) {
            Swal.fire({
                title: 'notification',
                text: 'please select valid image',
                icon: 'error',  
            })
            setportraitNormal('')
        }else{
            setportraitNormal(e.target.files[0])
        }
        
    }
const [hide,sethide]=useState(false)
  return (
  <>
  {!loading ? '':<Spin/>}
  <div className='content'>
     <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> you are updating {posterName}</span></div>
    <form onSubmit={Updatepromotion}>
                <label><i className="fa fa-heading"/> Poster Name</label>
                    <input
                    value={name}
                    className="form-control"
                    placeholder="Enter title*"
                    type="text"
                    onChange={(e)=>setpname(e.target.value)}
                    />
                <label><i className="fa fa-heading"/> Select Tags</label>
                

                <AsyncSelect 
                isMulti
                    id="select"
                    placeholder="Select content type*"
                    cacheOptions
                    defaultOptions
                    value={value}
                    defaultValue={value}
                    getOptionLabel={e => e.label}
                    getOptionValue={e => e.label}
                    loadOptions={data_genre}
                    onChange={handle}
                    />


                <label><i className="fa fa-heading"/> Select Age Rating</label>
                <Select className="form-select p-0" options={age} onChange={handleage} value={pagerating} defaultValue={pagerating} placeholder="Select age rating*"></Select>
                
                <label><i className="fa fa-heading"/> Select Types</label>
                <Select className="form-select p-0" options={types} value={type} defaultValue={type} onChange={handletypes} placeholder="Select type*"></Select>

                <div className={hide ? 'display' : 'hidden'}>
               <label><i className="fa fa-portrait"/> Select content Type</label>
               <AsyncSelect 
                    id="select"
                    placeholder="Select content type*"
                    cacheOptions
                    defaultOptions
                    value={content}
                    defaultValue={content}
                    getOptionLabel={e => e.title}
                    getOptionValue={e => e._id}
                    loadOptions={loadOptions}
                    onChange={handleChange}
                />
                </div>

                <label className={hide ? 'hidden' : 'display'}><i className="fa fa-film"/>Shareable Link</label>
                    <input
                    className={hide ? 'hidden' : 'display form-control'}
                    placeholder="Enter Shareable Link"
                    type="text"
                    value={source}
                    onChange={(e)=>setpsource(e.target.value)}
                    />

                <label><i className="fa fa-film"/>File ( size : 800 x 800 px & must be .jpg, .png, .jpeg format) </label>
                <input                                
                    className={'form-control file'}
                    type="file"
                    accept="image/*"
                    placeholder="Select poster image"
                    onChange={handlefile}
                    />
               
               <button type="submit" className="btn btn-primary mt-2">Update Poster</button>
               <Link to="/posters"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
    </form>
    </div>
    </>
)}
export default Updateposterchild;
