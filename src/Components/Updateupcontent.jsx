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
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import '../css/content.css';
import Swal from 'sweetalert2';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {
    useNavigate,
    useParams,Link
  } from "react-router-dom";
import Instance from '../Objects/Axios';
import '../css/upcomming.css';
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import MultipartAPI from '../Objects/MultipartAPI'
import {countries,Listdevice,Listgenre} from '../Objects/Country';
import Spin from './Spinner/Spin';
const Updateupcontent = ({icon}) => {

let navigate = useNavigate();

let {upcommingId} = useParams();
let {upcommingname} = useParams();

const [title,settitle]=useState('');
const [releaseDate,setrelease]=useState('');
const [categoryName,setcategoryName]=useState({title:''});
const [categoryCode,setcategoryCode]=useState('');
const [categoryId,setcategoryId]=useState([]);
const [countryFiltered,setcountryFiltered]=useState({name:'',code:''});
const [deviceFiltered,setdeviceFiltered]=useState({label:''});
const [genre,setgenre]=useState({label:''});
const [subcategory,setsubcategory]=useState([]);
const [landscapePosterIdNormal,setlandscapePosterIdNormal] = useState('');
const [sharelink,setsharelink]=useState('');
const [description,setdescription]=useState('');
const [mobile1, setmobile1] = useState('');
const [web1, setweb1] = useState('');
const [common1, setcommon1] = useState('');
const [trailerObj,setTrailerObj]=useState({freeTrailer:'',paidTrailer:''})
//const [mediaUrl,setmedia]=useState({web:web1,mobile:mobile1,common:common1,freeTrailer:trailerObj.freeTrailer,paidTrailer:trailerObj.paidTrailer});
const [isRelease,setisRelease]=useState(false)
const [loading,setloading]=useState(false)
const data_device=async()=>{
    return Listdevice()
}


//for media URL
   var media_url = [
    {
        value:0,
        label:'mobile'
    },
    {
        value:1,
        label:'web'
    },
    {
        value:2,
        label:'common'
    }
    
];
const handle = (e) =>{
    setcountryFiltered(Array.isArray(e)?e.map(x=> x):[]);
}
const handledevice = (e) =>{
    setdeviceFiltered(Array.isArray(e)?e.map(x=>x):[]);
}
const handlegenre = (e) =>{
    setgenre(Array.isArray(e)?e.map(x=>x):[]);
}
{/*const handlemedia = (e) =>{
    setmedia(Array.isArray(e)?e.map(x=>x.value):[]);
}*/}
//async select 
const loadOptions = () => {
    return Instance.get('/listCategory').then(res => res.data.data )
}
//for managing
const handleChange = value => {
    callback(value);
}
function callback(x){
    setcategoryId(x._id);
    setcategoryName({title:x.title});
    setcategoryCode(x.code);
}
//---------------------------------for managing cast -------------------------------------//
const [searches, setSearches] = useState([])
const [query, setQuery] = useState("")
const handleClick = () => { 
    // Save search term state to React Hooks
    setSearches(searches => [...searches, query])
    setQuery('');
    // setSearches(searches => searches.concat(query))
}
const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value)
  }

  const submitHandler = e => {
    // Prevent form submission on Enter key
    e.preventDefault()
   
  }
  const deleteRow = (index) => {
    //let name="Mano"
    //setEmps(emps.filter(emp => emp.name !== name))
    let copy_emp=[...searches]
    copy_emp.splice(index,1)
    setSearches(copy_emp)
}
const formData = new FormData();
useEffect(()=>{
    sampler.get('/listUpcoming')
    .then(res=>{
        call(res.data.data)
      })
},[])

const [time, settime]=useState('');
const call =(val)=>{
    const agenre =[]
    const adevice=[]
    const acountry=[]
    for (var i = 0; i < val.length; i++) {
        if (val[i]._id === upcommingId) {
           settitle(val[i].title)
           setcategoryName({title:val[i].categoryName})
           setcategoryId(val[i].categoryId)
           setcategoryCode(val[i].categoryCode)
           setsharelink(val[i].shareLink)
           setweb1(val[i].mediaUrl.web)
           setmobile1(val[i].mediaUrl.mobile)
           setcommon1(val[i].mediaUrl.common)
           if(val[i].mediaUrl.freeTrailer){
            setTrailerObj({freeTrailer:val[i].mediaUrl.freeTrailer,paidTrailer:val[i].mediaUrl.paidTrailer})
           }
           setSearches(val[i].cast)
           setdescription(val[i].description)
           val[i].genre.map(x=>{
               agenre.push({label:x,value:x})
           })
           val[i].deviceFiltered.map(x=>{
               adevice.push({label:x,value:x})
           })
           
           callback1(val[i].countryFiltered)
           setgenre(agenre)
           setdeviceFiltered(adevice)
           convert_epoch_to_normal(val[i].releaseDate)
           setisRelease(val[i].isReleasePlanned)
           //convert_epoch_to_normal(val[i].releaseDate)
           
        }
     }
   }
   const callback1=async(data)=>{
    const ss = countries;
    const arr = [];
    for(var i=0 ; i < ss.length; i++){
        for (var j=0;j<data.length;j++){
            if(data[j] === ss[i].value){
                arr.push(ss[i])
            }
        }
    }
    setcountryFiltered(arr)
   }

   function convert_epoch_to_normal(time){
    var Time = new Date(time)
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Time)
    let up= date.split('/')
    let reldate= up[2] + '-' + up[0] + '-' +up[1]
    setrelease(reldate)
   }
   
//api call for adding upcomming content
const updateupcoming=(e)=>{
    e.preventDefault();
    setloading(!loading)
    const d = new Date(releaseDate);
    const epoch_time = d.getTime();
    const country = countryFiltered.map(x=>x.value)
    const device = deviceFiltered.map(x=>x.label)
    const gen = genre.map(x=>x.label)
    const data = {
        upcomingId:upcommingId,
        title:title,
        isReleasePlanned:isRelease,
        releaseDate:  !isRelease ? 0 : epoch_time,
        description:description,
        shareLink:sharelink,
        categoryName:categoryName.title,
        categoryCode:categoryCode,
        categoryId:categoryId,
        genre:gen,
        mediaUrl:{
            freeTrailer:trailerObj.freeTrailer,
            paidTrailer:trailerObj.paidTrailer,
            web:web1,
            mobile:mobile1,
            common:common1
        },
        cast:searches,
        countryFiltered:country,
        deviceFiltered:device       
    }
    const formText = JSON.stringify(data);
    formData.append('formText',formText)
    formData.append('landscapeNormal',landscapePosterIdNormal)
    MultipartAPI.post('/updateUpcoming',formData)
    .then(res=>{
        setloading(false)
        alertinstance(res);
        if(res.data.error==false){
            setTimeout(() => {
                navigate('/upcomming/content')
             }, 2000);
        }
    })
    .catch(err=>{
        setloading(false)
        console.log(err)
    })

}
const [date,setdate]=useState(false)
    const handlerelease=(e)=>{
        const currdate = new Date(e.target.value);
        const predate = new Date();
        if(currdate > predate){
            setrelease(e.target.value)
            setdate(false)
        }else{
            setrelease('')
            setdate(true)
        }

    }
    
    return (
        <>{!loading ? '':<Spin/>}
        <div className='content'>
              <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> you are updating {upcommingname}</span>
        </div>
            
             <form onSubmit={submitHandler}>
                    
                    <label><i className="fa fa-user"></i> Add Actors</label>
                    <input required
                        value={query}
                        className="form-control"
                        placeholder="Enter the name of the actor*"
                        type="text"
                        onChange={updateQuery}
                    />
                    <button
                        className="btn btn-danger ph-1 mt-2"
                        type="button"
                        onClick={handleClick}><i className='fa fa-plus'></i>
                    </button>
                    <Stack direction="row" spacing={1} className="stack">
                        {searches.map((x,index) =>{
                            return(
                                <>
                                <Chip label={x} onDelete={()=>deleteRow(index)}/>
                                </>
                            )
                        })}
                        </Stack>
                    
                </form>
              <form onSubmit={updateupcoming}>
                        <label><i className="fa fa-heading"></i>Title Name</label>
                        <input
                            value={title}
                            name=""
                            className="form-control"
                            placeholder="Enter title name*"
                            type="text"
                            onChange={(e)=>settitle(e.target.value)}
                        />
                        <input type="checkbox"  checked={isRelease} className="m-2" onChange={e => setisRelease(e.target.checked)}/>
                        <label> isReleasePlanned </label><br/>
                        {isRelease ? 
                        <>
                        <label><i className="fa fa-calendar-week"></i> Release Date</label>
                        <input
                            name=""
                            value={releaseDate}
                            className="form-control"
                            placeholder="Select date*"
                            type="date"
                            onChange={handlerelease}
                            
                        />
                        </>:''
                        }

                        {date ? <p style={{'color':'#ff4040'}}>Release date must be greater than current date</p> : ''}
                        <label><i className="fa fa-portrait"></i> Landscape Poster (1900 x 1080)</label>
                        <input
                            name=""
                            className="form-control"
                            type="file"
                            onChange={(e)=>setlandscapePosterIdNormal(e.target.files[0])}
                        />
                        <label><i className="fa fa-sort-amount-up"></i> Description</label>
                        <textarea
                            name=""
                            value={description}
                            className="form-control"
                            placeholder="Description of content (max-characters upto 500)*"
                            type="text"
                            rows="7"
                            maxLength={500}
                            onChange={(e)=>setdescription(e.target.value)}
                        />
                        <label><i className="fa fa-link"></i> Share Link</label>
                        <input
                            name=""
                            value={sharelink}
                            className="form-control"
                            placeholder="Share link*"
                            type="text"
                            onChange={(e)=>setsharelink(e.target.value)}
                        />
                        <label><i className="fa fa-th"></i> Select Category Name</label>
                        <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={categoryName}
                        defaultValue={categoryName}
                        getOptionLabel={e => e.title}
                        getOptionValue={e => e._id}
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        placeholder='Select catgeory title*'
                        />
                       
                        <label><i className="fa fa-tags"></i> Genre</label>
                        <Select className="form-control p-0" isMulti value={genre} options={Listgenre} placeholder="Select Genre*" onChange={handlegenre}></Select>
                        <label><i className="fa fa-users"></i>Free Trailer</label>
                        <input
                            name=""
                            value={trailerObj.freeTrailer}
                            className="form-control"
                            placeholder="Enter path for Free Trailer"
                            type="text"
                            onChange={(e)=>setTrailerObj({...trailerObj,freeTrailer:e.target.value})}
                        />
                        <label><i className="fa fa-users"></i>Paid Trailer</label>
                        <input
                            name=""
                            value={trailerObj.paidTrailer}
                            className="form-control"
                            placeholder="Enter path for Paid Trailer"
                            type="text"
                            onChange={(e)=>setTrailerObj({...trailerObj,paidTrailer:e.target.value})}
                        />
                        <label><i className="fa fa-phone"></i>Mobile</label>
                        <input
                            name=""
                            value={mobile1}
                            className="form-control"
                            placeholder="Enter path for mobile*"
                            type="text"
                            onChange={(e)=>setmobile1(e.target.value)}
                        />
                        <label><i className="fa fa-globe"></i>Web</label>
                        <input
                            name=""
                            value={web1}
                            className="form-control"
                            placeholder="Enter path for web*"
                            type="text"
                            onChange={(e)=>setweb1(e.target.value)}
                        />
                        <label><i className="fa fa-users"></i>common</label>
                        <input
                            name=""
                            value={common1}
                            className="form-control"
                            placeholder="Enter path for common*"
                            type="text"
                            onChange={(e)=>setcommon1(e.target.value)}
                        />
                        <label><i className="fa fa-globe"></i> Country Filtered</label>
                        <Select className="form-control p-0" isMulti value={countryFiltered} options={countries} placeholder="Select Country*" onChange={handle}></Select>


                        <label><i className="fa fa-laptop"></i> Device Filtered</label>
                        <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        value={deviceFiltered}
                        getOptionLabel={e => e.label}
                        getOptionValue={e => e.label}
                        loadOptions={data_device}
                        onChange={handledevice}
                        placeholder='Select device*'
                    />

                    <button className='btn btn-primary mt-3'>upload</button>
                    <Link to="/upcomming/content"> <button className='btn btn-danger mt-3' style={{'marginLeft': '10px'}}>Back </button></Link>
                    </form>
        </div>
        </>
    )
}
export default Updateupcontent;