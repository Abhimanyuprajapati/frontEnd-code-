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

import React, { useState} from 'react';
import '../css/category.css';
import '../css/Promotion.css';
import Select from 'react-select';
import Swal from 'sweetalert2';
import {
    useNavigate,
    Link
  } from "react-router-dom";
  import MultipartAPI from '../Objects/MultipartAPI';
import AsyncSelect from 'react-select/async';
import Spin from './Spinner/Spin';
import alertinstance from '../Objects/Alert';
const Addposterchild = ({icon}) => {
    let navigate = useNavigate();
    const [name,setpname]=useState("");
    const [pagerating,setpagerating]=useState("");
    const [type,setptype]=useState("");
    const [source,setpsource]=useState("");
    const [value,setvalue]=useState();
    const [portraitNormal,setportraitNormal]=useState('')
    const [link,setlink]=useState('')
    const [loading,setloading]=useState(false)
    var val = [
        {
            value:0,
            label:'Romance'
        },
        {
            value:1,
            label:'Action'
        },
        {   
            value:2,
            label:'Thriller'
        }, 
        {  
            value:3,
            label:'Suspense'
        },
        {
            value:4,
            label:'Murder'
        },
        {
            value:5,
          label:'Adults'
        },
        {
            value:6,
          label:'Drama'
        },
        {
            value:7,
          label:'Comedy'
        },
        {
            value:8,
          label:'Horror'
        },
        ];

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
    const handle = (e) =>{
        setvalue(Array.isArray(e)?e.map(x=>x.label):[]);
    }

  //function for Add poster
   const Addpromotion=(e)=>{
        e.preventDefault();
        setloading(!loading)
        setpname(name.charAt(0).toUpperCase()+name.slice(1));
        const formData = new FormData();
          let cont = {
              name:name,
              tag:value,
              ageRating:pagerating,
              type:type,
              source:source,
              link: link
          }
          
          //API call for Adding promotional poster
          const formText = JSON.stringify(cont)
        
          formData.append('formText',formText)
          formData.append('promoposter',portraitNormal)
          const data = formData
          MultipartAPI.put('/addPromotionalPoster',data)
              .then((res) => {
                setloading(false)
                //handle success
                if(res){
                    setloading(false)
                    alertinstance(res)
                    if(res.data.error === false){
                        navigate('/posters')
                    }
                }
               })
              .catch((err) =>{
                setloading(false)
                console.log(err)
                //handle error
                //alertinstance(err);
              });
      }

      const loadOptions = () => {
        return  MultipartAPI.get('/listContents').then(res => res.data.data )
    }
    const handleChange = value => {
        setlink(value._id)
    }

    const [checked, setChecked] = React.useState(false);

    const handleChange1 = (event) => {
      setChecked(event.target.checked);
    };
  
    const handletypes =(e)=>{
        setptype(e.label);
        if( e.label === 'Content'){
            setlink('')
            sethide(true)
        }
        else{
            setlink('https://')
            sethide(false)
        }
    } 
    const handleage=(e)=>{
        setpagerating(e.label)
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
                <span className='leftpush'> Add Posters</span></div>
    <form onSubmit={Addpromotion}>
                <label><i className="fa fa-heading"/> Poster Name</label>
                    <input
                    className="form-control"
                    placeholder="Enter title*"
                    type="text"
                    onChange={(e)=>setpname(e.target.value)}
                    />
                <label><i className="fa fa-heading"/> Select Tags</label>
                <Select isMulti className="p-0" options={val}  onChange={handle} placeholder="Select tags*"></Select>

                <label><i className="fa fa-heading"/> Select Age Rating</label>
                <Select className="p-0" options={age}  onChange={handleage} placeholder="Select age rating"></Select>
                
                <label><i className="fa fa-heading"/> Select Types </label>
                <Select className="p-0" options={types}  onChange={handletypes} placeholder="Select poster type*"></Select>

                <div className={hide ? 'display' : 'hidden'}>
               <label><i className="fa fa-portrait"/> Select Content</label>
               <AsyncSelect 
                    id="select"
                    cacheOptions
                    defaultOptions
                    getOptionLabel={e => e.title}
                    getOptionValue={e => e._id}
                    loadOptions={loadOptions}
                    onChange={handleChange}
                    placeholder="Select content type*"
                />
                </div>
               
               <label className={hide ? 'hidden' : 'display'}><i className="fa fa-film"/>Shareable Link</label>
                    {/*<FormControlLabel control={ <Switch
                        checked={checked}
                        onChange={handleChange1}
                    />} label="File (minimum size : 320 x 450 & must be .jpg, .png, .jpeg)" />*/}
                    <input
                    className={hide ? 'hidden' : 'display form-control'}
                    placeholder="Enter Shareable Link"
                    type="text"
                    onChange={(e)=>setpsource(e.target.value)}
                    />

                <label><i className="fa fa-film"/>File (size : 800 x 800 px & must be .jpg, .png, .jpeg) </label>
                <input                                
                    className={'form-control file'}
                    type="file"
                    accept="image/*"
                    placeholder="Select poster image"
                    onChange={handlefile}
                    />
               
               <button type="submit" className="btn btn-primary mt-2">Add</button>
               <Link to="/posters"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
               
    </form>
    </div>
    </>
)};


export default Addposterchild;
